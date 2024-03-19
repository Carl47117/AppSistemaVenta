import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Venta } from '../../../../Interfaces/venta';
import { DetalleVenta } from '../../../../Interfaces/detalle-venta';

@Component({
  selector: 'app-modal-service-ticket',
  templateUrl: './modal-service-ticket.component.html',
  styleUrl: './modal-service-ticket.component.css',
})
export class ModalServiceTicketComponent implements OnInit {
  fechaRegistro: string = '';
  numeroDocumento: string = '';
  tipoPago: string = '';
  total: string = '';
  detalleVenta: DetalleVenta[] = [];
  columnasTabla: string[] = ['producto', 'cantidad', 'precio', 'total'];

  constructor(@Inject(MAT_DIALOG_DATA) public _serviceTicket: Venta) {
    this.fechaRegistro = _serviceTicket.fechaRegistro!;
    this.numeroDocumento = _serviceTicket.numeroDocumento!;
    this.tipoPago = _serviceTicket.tipoPago;
    this.total = _serviceTicket.totalTexto;
    //this.detalleVenta = _venta.detalleVenta;
  }

  ngOnInit(): void {}
}
