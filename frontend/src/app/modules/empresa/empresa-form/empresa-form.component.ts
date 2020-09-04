import { SpinnerService } from './../../../shared/services/spinner.service';
import { EmpresaService } from '../../../core/services/empresa.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotificacaoService } from 'src/app/shared/services/notificacao.service';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css'],
  preserveWhitespaces: true,
})
export class EmpresaFormComponent implements OnInit {
  formEmpresa: FormGroup;

  constructor(
    private service: EmpresaService,
    private toastr: NotificacaoService,
    private formBuilder: FormBuilder,
    private spinner: SpinnerService,
    private notify: NotificacaoService
  ) {}

  onSubmit() {
    this.spinner.showSpinner();
    this.service.create(this.formEmpresa).subscribe(
      (success) => {
        const message = `Empresa ${success.nome} cadastrada com sucesso!`;
        this.notify.showSuccess(message, 'Sucesso!');
        console.log(success);
        this.spinner.hideSpinner();
      },
      (error) => {
        this.notify.showError(error.statusText, 'Erro!');
        console.log(error);
        this.spinner.hideSpinner();
      }
    );
  }

  ngOnInit() {
    this.formEmpresa = this.formBuilder.group({
      id: [null],
      nome: [null],
      descricao: [null],
      cnpj: [null],
    });
  }
}
