import { TreeNode } from '../model/treeNode';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { map, delay, tap, catchError } from 'rxjs/operators';
import { Organogram } from '../model/organogram';
import { FormGroup } from '@angular/forms';
import { Organograma } from '../model/Organograma';

interface OrganogramaResponse {
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrganogramaService {
  private readonly API = `${environment.API}/organograma`;

  constructor(private http: HttpClient) {}

  getOrganogramaByEmpresa(idEmpresa: number): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(`${this.API}/montarArvore/${idEmpresa}`);
  }

  getOrganogramaList(idEmpresa: number): Observable<string[]> {
    return this.http
      .get<OrganogramaResponse[]>(`${this.API}/${idEmpresa}`)
      .pipe(
        map((response) => {
          let organogramaNames: string[];
          organogramaNames = response.map((organograma) => {
            return organograma.nome;
          });
          return organogramaNames;
        }),
        catchError(this.handleError<string[]>('getOrganogramaList', []))
      );
  }

  createNode(form: FormGroup) {
    return this.http.post(this.API, form.value).pipe(delay(2000), tap());
  }

  update(treeData: Organograma[]) {
    return this.http.put(`${this.API}`, treeData);
  }

  getNextSequence(): Promise<any> {
    return this.http.get(`${this.API}/sequence`).toPromise();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`organogramaService: ${message}`);
  }
}
