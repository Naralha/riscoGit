import { environment } from './../../../environments/environment';
import { Company } from '../../core/model/company';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly API = `${environment.API}/empresa`;

  constructor(private http: HttpClient) { }

  list() {
    type Empresa = Empresa[];
    return this.http.get<Empresa>(this.API)
      .pipe(
          tap(console.log)
      );
  }

  create(form) {
    return this.http.post(this.API, form.value)
      .pipe(
        delay(2000),
          tap(console.log)
      )
  }

  delete(empresaId) {
    return this.http.delete(this.API, empresaId)
      .pipe(
        tap(console.log)
      )
  }

  update(company: Company) {
    return this.http.put(this.API, company)
      .pipe(
        tap(console.log)
      )
  }

  findById(empresaId: number) : Observable<Company> {
     return this.http.get<any>(`${this.API}/${empresaId}`)
      .pipe(
        map(res => {
          return new Company(res.id, res.nome, res.descricao, res.organogramas);
        })
      )
  }
}
