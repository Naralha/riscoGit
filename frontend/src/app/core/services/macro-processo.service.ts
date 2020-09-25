import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MacroProcessoService {

  private readonly API = `${environment.API}/macroProcesso`;

  constructor(private http: HttpClient) {

  }

  listByCompanyId(companyId: number): Observable<[]> {
    return this.http.get<[]>(`${this.API}/${companyId}`);
  }
}
