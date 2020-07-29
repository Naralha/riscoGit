import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosCompartilhadosService {

  private readonly API = environment.API;
  private readonly API_FUNCIONARIO = `${this.API}/funcionario`;
  private readonly API_ORGANOGRAMA = `${this.API}/organograma`;
  private readonly API_EMPRESA = `${this.API}/empresa`;

  constructor(private http: HttpClient) { }

  //Lista de funcionários da empresa
  getFuncionariosByIdEmpresa(idEmpresa) {
    return this.http.get<any>(`${this.API_FUNCIONARIO}/${idEmpresa}`)
      .pipe(tap());
  }

  getEmpresas() {
    return this.http.get<any>(`${this.API_EMPRESA}`)
      .pipe(
        delay(2000),
          tap(console.log)
      );
  }

  createOrganograma() {

  }
}
