import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-m-confirmacion',
  standalone: false,
  
  templateUrl: './m-confirmacion.component.html',
  styleUrl: './m-confirmacion.component.css'
})
export class MConfirmacionComponent {
  @Input() modalId: string = 'confirm-modal';
  @Input() message: string = '¿Está seguro de realizar esta acción?';
  @Input() showModal: boolean = false;  // Agregar esta línea
  @Output() onYes = new EventEmitter<void>();
  @Output() onNo = new EventEmitter<void>();}
