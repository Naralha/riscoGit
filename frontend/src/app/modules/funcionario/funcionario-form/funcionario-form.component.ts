import { FuncionarioService } from '../../../core/services/funcionario.service';
import { SpinnerService } from './../../../shared/services/spinner.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificacaoService } from 'src/app/shared/services/notificacao.service';
import { Component, OnInit, Input } from '@angular/core';
import { EmpresaService } from 'src/app/core/services/empresa.service';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {

  formFuncionario: FormGroup;
  empresasDisponiveis: [];

  constructor(
    private service: FuncionarioService,
    private toastr: NotificacaoService,
    private formBuilder: FormBuilder,
    private spinner: SpinnerService,
    private notify: NotificacaoService,
    private empresaService: EmpresaService
  ) { }

  onSubmit() {
    this.spinner.showSpinner();
     this.service.create(this.formFuncionario)
       .subscribe(
         success => {
           let message = `Funcionário(a) ${success.nome} cadastrado com sucesso!`;
           this.notify.showSuccess(message, "Sucesso!");
           console.log(success)
           this.spinner.hideSpinner();
         },
         error => {
           this.notify.showError(error.statusText, "Erro!");
           console.log(error)
           this.spinner.hideSpinner();
         }
       )
   }

  onInitEmpresasDisponiveis(empresas) {
    this.empresasDisponiveis = empresas;
    this.spinner.hideSpinner();
  }

  ngOnInit(): void {

    this.spinner.showSpinner();
    this.empresaService.list().subscribe(
      res => this.onInitEmpresasDisponiveis(res)
    );


    this.formFuncionario = this.formBuilder.group({
      id: [null],
      nome: [null],
      descricao: [null],
      email: [null],
      idEmpresa: ["Selecione..."]
    })
  }
}
