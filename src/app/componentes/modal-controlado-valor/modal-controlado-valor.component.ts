import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-controlado-valor',
  templateUrl: './modal-controlado-valor.component.html',
  styleUrls: ['./modal-controlado-valor.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule]
})
export class ModalControladoValorComponent  implements OnInit {

  monto:number = 0;

  constructor(private modalController:ModalController) { }

  ngOnInit() {}

  cancelar() {
    this.modalController.dismiss(null, 'cancelar')
  }

  confirmar() {
    if (this.monto || this.monto === 0) {
      const obj = { monto: this.monto };
      this.modalController.dismiss(obj, 'confirmar');
    } else {
      console.error("Ingrese un monto válido");
    }
  }
}
