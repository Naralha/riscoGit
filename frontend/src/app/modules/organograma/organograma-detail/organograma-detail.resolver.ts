import { NotificacaoService } from 'src/app/shared/services/notificacao.service';
import { SpinnerService } from './../../../shared/services/spinner.service';
import { tap, take, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Funcionario } from 'src/app/core/model/Funcionario';
import { FuncionarioService } from 'src/app/core/services/funcionario.service';

@Injectable({
  providedIn: 'root'
})
export class OrganogramaDetalheResolver implements Resolve<Funcionario[]> {
  constructor(
    private funcionarioService: FuncionarioService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    console.log('OrganogramaDetalheResolver');
    let id = route.params['id'];
    return this.funcionarioService.getEmployeesByIdEmpresa(id);
  }
}
