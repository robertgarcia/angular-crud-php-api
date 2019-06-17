import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Motivos } from '../models/motivo';
import { environment } from '../../../src/environments/environment';

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

}
