import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, SearchbarInputEventDetail } from '@ionic/angular';
import { OTMService } from 'src/app/data/otm.service';
import { IonSearchbarCustomEvent } from '@ionic/core';
import { Destino } from 'src/app/modelo/destino';
import { addIcons } from 'ionicons';
import { heartOutline, heartSharp, airplaneOutline, cameraOutline, trashOutline} from 'ionicons/icons'
import { ListaFavoritosService } from 'src/app/data/lista-favoritos.service';
import { ModalMontoService } from 'src/app/data-model/modal-monto.service';
import { ModalConfirmacionService } from 'src/app/data-model/modal-cofirmacion.service';
import { Camera, Photo, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InicioPage implements OnInit {

  destinos: Destino[] = []
  
  montos: Map<Destino, string> = new Map();
  foto:Photo|null = null

  constructor(
    private servicio: OTMService,
    public listaFavoritosService: ListaFavoritosService,
    private modalMontoService: ModalMontoService,
    private modalConfirmacionService: ModalConfirmacionService,
    private modalController: ModalController
  ) {
    addIcons({
      heartOutline,
      heartSharp,
      airplaneOutline,
      cameraOutline,
      trashOutline,
    });
  }

  ngOnInit() {
    this.listaFavoritosService.cargarImagenesDesdeLocalStorage();
  }

  async handleInput($event: IonSearchbarCustomEvent<SearchbarInputEventDetail>) {
    const termino:string = ""+$event.detail.value
    if (!termino) {
      this.destinos = [];
      return;
    }
    this.destinos = await this.servicio.getDestinos(termino)
  }

  esDestinoFavorito(destino: Destino): boolean {
    return this.listaFavoritosService.destinosDeseados.includes(destino);
  }

  async toggleDestinoDeseado(destino: Destino) {
    try {
      if (this.esDestinoFavorito(destino)) {
        await this.listaFavoritosService.eliminarDestinoDeseado(destino);
      } else {
        await this.listaFavoritosService.agregarDestinoDeseado(destino);
      }
      this.listaFavoritosService.guardarDatosEnLocalStorage();
    } catch (error) {
      console.error('Error al manipular destinos deseados:', error);
    }
  }

  
  async abrirModal(destino: Destino, montoActual: string | undefined) {
    await this.modalMontoService.abrirModal(destino, montoActual || '').then(({ data, role }) => {
      if (role === 'confirmar' && data) {
        this.montos.set(destino, data.monto);
        this.listaFavoritosService.guardarDatosEnLocalStorage();
        console.log(`El valor del vuelo ida y vuelta para el destino ${destino.nombre} es: ${data.monto}`);
      } else {
        console.log('Se canceló el modal');
      }
    });
  }

  async confirmarEliminarDestino(destino: Destino) {
    const confirmado = await this.modalConfirmacionService.abrirModalConfirmacion();
  
    if (confirmado) {
      this.montos.delete(destino); 
      await this.listaFavoritosService.eliminarDestinoDeseado(destino);
    }
  }

  async capturarFoto(destino: Destino) {
    try {
      const foto = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        saveToGallery: true,
        correctOrientation: true
      });
  
      if (foto && foto.webPath) {
        this.listaFavoritosService.actualizarImagen(destino, foto.webPath);
      }
    } catch (error) {
      if (error === 'User cancelled photos app') {
        console.log('El usuario canceló la captura de fotos.');
      } else {
        console.error('Error al capturar foto:', error);
      }
    }
  }
}
