import { Injectable } from '@angular/core';
import { ResultadoWSSugerencias } from '../ws/destinosWS';
import { ResultadoWSDetalles } from '../ws/destinosWS';
import { Destino } from '../modelo/destino';

@Injectable({
  providedIn: 'root'
})
export class OTMService {

  apiKey = "5ae2e3f221c38a28845f05b6348ecacce4852a76cbab117df59a7eb2"
  baseUrl = "https://api.opentripmap.com/0.1/en/"

  constructor() { }

  async getDestinos(termino: string): Promise<Destino[]> {
    if (!termino) {
      return [];
    }
    const dbDestResult = await this.buscarLugar(termino);
  
    const destinosPromises = dbDestResult.features.map(async (lugar) => {
      const detallesImagen = await this.imagenLugar(lugar.properties.xid);
      const nombre = lugar.properties.name;
      const direccion = this.formatDireccion(detallesImagen.address);
      const imagen = detallesImagen.preview.source;
      const monto = ''; 
  
      return new Destino(nombre, direccion, imagen, monto);
    });
  
    return Promise.all(destinosPromises);
  }

  async buscarLugar(termino: string):Promise<ResultadoWSSugerencias> {
    const url = `${this.baseUrl}places/autosuggest?name=${termino}&radius=19067632&lon=-36.7959329&lat=-73.0969008&rate=3&limit=5&apikey=${this.apiKey}`
    const resultado = await fetch(url)
    const data = await resultado.json()
    return data 
  }

  async imagenLugar(id:string): Promise<ResultadoWSDetalles> {
    const url = `${this.baseUrl}places/xid/${id}?apikey=${this.apiKey}` 
    const respuesta = await fetch(url)
    const data:ResultadoWSDetalles = await respuesta.json()
    return data
  }

  private formatDireccion(address: any): string {
    if (address && address.country) {
      return address.country;
    } else {
      return '';
    }
  }
}
