import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MacroProcessoService {

  private readonly API = `${environment.API}/macroProcesso`;

  constructor(private http: HttpClient) {}

}
