import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { ResponseApi } from '../Interfaces/response-api';
import { Venta } from '../Interfaces/venta';
import { ClientInfo } from '../Interfaces/client-info';
import { VehicleInfo } from '../Interfaces/VehicleInfo';
@Injectable({
  providedIn: 'root',
})
export class ClientInfoService {
  private urlApi: string = enviroment.endpoint + 'ClientInfo/';

  constructor(private http: HttpClient) {}

  registrar(request: ClientInfo): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Registrar`, request);
  }

  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Lista`);
  }
  guardar(request: ClientInfo): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Guardar`, request);
  }
  editar(request: ClientInfo): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}Editar`, request);
  }

  eliminar(request: ClientInfo): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Eliminar`, request);
  }

  listVehicle(request: ClientInfo): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}ListVehicle`, request);
  }
  editVehicle(request: VehicleInfo): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}EditVehicle`, request);
  }
  createVehicle(request: VehicleInfo): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}CreateVehicle`, request);
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
