
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { ModalControladoValorComponent } from 'src/app/componentes/modal-controlado-valor/modal-controlado-valor.component';
import { Destino } from '../modelo/destino';

@Injectable({
  providedIn: 'root',
})
export class ModalMontoService {

  constructor(private modalController: ModalController) {
  }
  
  async abrirModal(destino: Destino, montoActual: string) {
    const modal = await this.modalController.create({
      component: ModalControladoValorComponent,
      componentProps: {
        destinoObjeto: destino,
        montoActual: montoActual || '',
      },
    });
  
    await modal.present();
  
    return modal.onWillDismiss().then(result => {
      return { data: result?.data, role: result?.role };
    });
  }
}
