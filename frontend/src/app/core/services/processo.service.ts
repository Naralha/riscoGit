import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Organogram } from '../model/organogram';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  private readonly API = `${environment.API}/processo`;

  constructor(private http: HttpClient) { }

  create(form) {
    return this.http.post(this.API, form.value)
      .pipe(
        map(res => res)
      )
  }
}
