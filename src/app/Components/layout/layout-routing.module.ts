import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { ProductoComponent } from './Pages/producto/producto.component';
import { VentaComponent } from './Pages/venta/venta.component';
import { HistorialVentaComponent } from './Pages/historial-venta/historial-venta.component';
import { ReporteComponent } from './Pages/reporte/reporte.component';
import { ClientComponent } from './Pages/client/client.component';
import { ServiceTicketComponent } from './Pages/service-ticket/service-ticket.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashBoardComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'productos', component: ProductoComponent },
      { path: 'venta', component: VentaComponent },
      { path: 'historial_venta', component: HistorialVentaComponent },
      { path: 'reportes', component: ReporteComponent },
      { path: 'client', component: ClientComponent },
      { path: 'service_ticket', component: ServiceTicketComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
