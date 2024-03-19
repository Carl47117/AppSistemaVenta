import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { ResponseApi } from '../Interfaces/response-api';
import { Venta } from '../Interfaces/venta';
import { ServiceTicket } from '../Interfaces/service-ticket';
import { ContactInfo } from '../Interfaces/contact-info';
@Injectable({
  providedIn: 'root',
})
export class ServiceTicketService {
  private urlApi: string = enviroment.endpoint + 'ServiceTicket/';

  constructor(private http: HttpClient) {}

  registrar(request: ServiceTicket): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Registrar`, request);
  }
  /*
  historial(
    buscarPor: string,
    numeroVenta: string,
    fechaInicio: string,
    fechaFin: string
  ): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(
      `${this.urlApi}Historial?buscarPor=${buscarPor}&numeroVenta=${numeroVenta}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&`
    );
  }

  reporte(fechaInicio: string, fechaFin: string): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(
      `${this.urlApi}Reporte?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&`
    );
  }*/
}
