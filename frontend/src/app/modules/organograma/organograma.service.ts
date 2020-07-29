import { TreeNode } from '../../core/model/treeNode';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { map, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganogramaService {

  private readonly API = `${environment.API}/organograma`;

  constructor(private http: HttpClient) { }


  getOrganogramaByEmpresa(idEmpresa): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(`${this.API}/montarArvore/${idEmpresa}`)
      .pipe(
         map(res => {
            return res
         })
      )
  }

  createNode(form) {
    return this.http.post(this.API, form.value)
    .pipe(
      delay(2000),
        tap()
    )
  }

  update(treeData) {
    return this.http.put(`${this.API}`, treeData);
  }

  getNextSequence() : Promise<any> {
    return this.http.get(`${this.API}/sequence`).toPromise();
  }
}
