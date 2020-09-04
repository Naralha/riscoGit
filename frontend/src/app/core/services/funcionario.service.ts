import { Employee } from '../model/employee';
import { delay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface IFuncionario {
  id: number;
  nome: string;
  email: string;
  descricao: string;
  idEmpresa: number;
  idUser: number;
  idOrganograma: number;
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly API = `${environment.API}/funcionario`;

  constructor(private http: HttpClient) {}

  create(form) {
    return this.http.post(this.API, form.value)
    .pipe(
      delay(2000),
        tap(console.log)
    )
  }

  //Lista de funcionários da empresa
  getEmployeesByIdEmpresa(idEmpresa) : Promise<IFuncionario[]> {
    return this.http.get<IFuncionario[]>(`${this.API}/${idEmpresa}`).toPromise();
  }
}
