import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  rutaApi = "https://lit-river-61248.herokuapp.com/grafica";

  constructor(private httpClient: HttpClient) { }

  consulta() {
    return this.httpClient.get(this.rutaApi);
  }
}
