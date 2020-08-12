import { DadosCompartilhadosService } from './../../../core/services/dados-compartilhados.service';
import { SpinnerService } from './../../../shared/services/spinner.service';
import { Company } from '../../../core/model/company';
import { tap, take, catchError } from 'rxjs/operators';
import { NotificacaoService } from 'src/app/shared/services/notificacao.service';
import { Subscription, Observable, empty } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organograma-form',
  templateUrl: './organograma-form.component.html',
  styleUrls: ['./organograma-form.component.css']
})
export class OrganogramaFormComponent implements OnInit {

  company = {} as Company;
  employees$: Observable<Company[]>;
  formOrganograma: FormGroup;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private notify: NotificacaoService,
    private service: DadosCompartilhadosService
  ) { }

  onListaFuncionarios () {
    this.spinner.showSpinner();
      this.employees$ = this.service.getFuncionariosByIdEmpresa(this.company.id)
        .pipe(
          tap(() => {
            take(1)
            this.spinner.hideSpinner();
            return;
          }),
          catchError(error => {
            this.spinner.hideSpinner();
            console.log(error)
            this.notify.showError("Ocorreu um erro ao tentar obter a lista de funcionários!", error.statusText)
            // this.handleError();
            return empty();
          })
        );
  }

  onSubmit() {

  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.company.name = params['nome'];
        this.company.id = params['id'];
        this.onListaFuncionarios();
      }
    );

    this.formOrganograma = this.formBuilder.group({
      orgPai: ['Selecione...'],
      nome: [null],
      descricao: [null],
      centroDeCusto: ['Selecione...'],
      funcionarios: [null],
    })
  }
}
