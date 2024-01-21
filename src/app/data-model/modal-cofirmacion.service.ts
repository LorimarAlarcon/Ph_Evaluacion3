import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { ModalConfirmacionesComponent } from '../componentes/modal-confirmaciones/modal-confirmaciones.component';


@Injectable({
  providedIn: 'root',
})
export class ModalConfirmacionService {
  constructor(private modalController: ModalController) {}

  async abrirModalConfirmacion(): Promise<boolean> {
    const modal = await this.modalController.create({
      component: ModalConfirmacionesComponent,
      componentProps: {
        mensaje: '¿Estás seguro de que deseas eliminar este destino de favoritos?',
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    return data?.confirmado || false;
  }
}

