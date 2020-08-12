import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProcessoService } from '../../../core/services/processo.service';
import { NotificacaoService } from 'src/app/shared/services/notificacao.service';
import { Messages } from 'src/app/shared/message';
import { DualListComponent } from 'angular-dual-listbox';

@Component({
  selector: 'app-processo-form',
  templateUrl: './processo-form.component.html',
  styleUrls: ['./processo-form.component.css']
})
export class ProcessoFormComponent implements OnInit {

  formProcesso: FormGroup;

  source = [ 'Angular', 'ReactJs', 'Java', 'Python', 'JavaScript', 'C#', 'VueJs' ];
  confirmed = [];


  format = { add: 'Adicionar', remove: 'Remover', all: 'Todos', none: 'Nenhum', direction: 'left-to-right', draggable: true, locale: 'pt' };

  constructor(
    private formBuilder: FormBuilder,
    private processoService: ProcessoService,
    private notify: NotificacaoService
  ) { }

  onSubmit() {
    this.processoService.create(this.formProcesso)
      .subscribe(
        _success => {
          this.notify.showSuccess(Messages.processCreateSuccess, Messages.sucesso);
          this.formProcesso.reset;
        },
        error => {
          this.notify.showError(error.statusText, Messages.processCreateError);
        }
      )
  }

  onConfigProcessoForm() {
    this.formProcesso = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      objective: [null, Validators.required],
      limitrofeStart: [null],
      limitrofeEnd: [null],
      pathFile: [null],
      inputs: [null],
      outputs: [null],
      startDate: [null],
      endDate: [null]
    })
  }

  ngOnInit(): void {
    this.onConfigProcessoForm();
  }

}
