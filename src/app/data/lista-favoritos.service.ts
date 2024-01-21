import { Injectable } from '@angular/core';
import { Destino } from '../modelo/destino';
import { BehaviorSubject } from 'rxjs';
import '@ionic/pwa-elements';

@Injectable({
  providedIn: 'root'
})
export class ListaFavoritosService {
  
  destinosDeseados: Destino[] = [];
  destinosSubject: BehaviorSubject<Destino[]> = new BehaviorSubject<Destino[]>([]);
  montos: Map<string, string> = new Map();

  constructor() {
    this.cargarDatosDesdeLocalStorage();
  }

  async agregarDestinoDeseado(destino: Destino) {
    if (!this.destinosDeseados.includes(destino)) {
      this.destinosDeseados.push(destino);
      await this.guardarDatosEnLocalStorage();
    }
  }

  async eliminarDestinoDeseado(destino: Destino) {
    const index = this.destinosDeseados.indexOf(destino);
    if (index !== -1) {
      this.destinosDeseados.splice(index, 1);
      await this.guardarDatosEnLocalStorage();
    }
  }

  async guardarDatosEnLocalStorage(): Promise<void> {
    localStorage.setItem('destinosDeseados', JSON.stringify(this.destinosDeseados));
    localStorage.setItem('montos', JSON.stringify(Array.from(this.montos.entries())));
  }

  private cargarDatosDesdeLocalStorage(): void {
    const destinosGuardados = localStorage.getItem('destinosDeseados');
    if (destinosGuardados !== null) {
      this.destinosDeseados = JSON.parse(destinosGuardados) as Destino[];
    }
  
    const montosGuardados = JSON.parse(localStorage.getItem('montos') || '{}');
    this.montos = new Map<string, string>();
    Object.entries(montosGuardados).forEach(([key, value]) => {
      if (typeof key === 'string' && typeof value === 'string') {
        this.montos.set(key, value);
      }
    });
  }


  async actualizarImagen(destino: Destino, nuevaImagen: string): Promise<void> {
    const index = this.destinosDeseados.findIndex((d) => d === destino);
  
    if (index !== -1 && destino.nombre && nuevaImagen) {
      this.destinosDeseados[index].imagen = nuevaImagen;
      const imagenesGuardadas = JSON.parse(localStorage.getItem('imagenes') || '{}');
      imagenesGuardadas[destino.nombre] = nuevaImagen;
      localStorage.setItem('imagenes', JSON.stringify(imagenesGuardadas));
  
      this.destinosSubject.next([...this.destinosDeseados]);
    }
  }

  cargarImagenesDesdeLocalStorage(): void {
    const imagenesGuardadas = JSON.parse(localStorage.getItem('imagenes') || '{}') as Record<string, string>;
  
    Object.entries(imagenesGuardadas).forEach(([nombre, imagen]) => {
      const destino = this.destinosDeseados.find((d) => d.nombre === nombre);
      if (destino && imagen) {
        destino.imagen = imagen;
      }
    });
  }
}