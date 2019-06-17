import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Motivos } from '../models/motivo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MotivosService {

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<Motivos[]>(`${environment.apiUrl}motivo/get.php`);
  }

  save(motivo: Motivos){
    return this.http.post(`${environment.apiUrl}motivo/save.php`, JSON.stringify({ "id": motivo.motivo, "desc": motivo.desc, "tipo": motivo.tipo, "estado": motivo.estado }));
  }

}
