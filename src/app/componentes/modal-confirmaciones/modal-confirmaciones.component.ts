import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-confirmaciones',
  templateUrl: './modal-confirmaciones.component.html',
  styleUrls: ['./modal-confirmaciones.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule]
})
export class ModalConfirmacionesComponent   {

  @Input() mensaje: string = '';

  constructor(private modalController: ModalController) {}

  cerrarModal(confirmado: boolean) {
    this.modalController.dismiss({ confirmado }, 'confirmar');
  }
}
