import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProcessoService } from '../../../core/services/processo.service';
import { NotificacaoService } from 'src/app/shared/services/notificacao.service';
import { Messages } from 'src/app/shared/message';
import { OrganogramaService } from 'src/app/core/services/organograma.service';
import { Observable } from 'rxjs';
import { Organogram } from 'src/app/core/model/organogram';

@Component({
  selector: 'app-processo-form',
  templateUrl: './processo-form.component.html',
  styleUrls: ['./processo-form.component.css'],
})
export class ProcessoFormComponent implements OnInit {
  formProcesso: FormGroup;
  source$: Observable<Organogram[]>;
  source: string[] = [];
  confirmed = [];
  showForm: boolean = false;

  format = {
    add: 'Adicionar',
    remove: 'Remover',
    all: 'Todos',
    none: 'Nenhum',
    direction: 'left-to-right',
    draggable: true,
    locale: 'pt',
  };

  // @ViewChild('processoForm') set processoForm(_show: any) {
  //   const elements: ElementRef[] = this.el.nativeElement.querySelectorAll(
  //     '.btn-primary',
  //   );
  //   elements.forEach(() => {
  //     this.renderer.addClass(
  //       this.el.nativeElement.querySelector('.btn-primary'),
  //       'btn-warning'
  //     );
  //     this.renderer.removeClass(
  //       this.el.nativeElement.querySelector('.btn-primary'),
  //       'btn-primary'
  //     );
  //   });
  // }

  constructor(
    private formBuilder: FormBuilder,
    private processoService: ProcessoService,
    private organogramaService: OrganogramaService,
    private notify: NotificacaoService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  onSubmit() {
    console.log(this.formProcesso);
    this.processoService.create(this.formProcesso).subscribe(
      (_success) => {
        this.notify.showSuccess(
          Messages.processCreateSuccess,
          Messages.sucesso
        );
        this.formProcesso.reset;
      },
      (error) => {
        this.notify.showError(error.statusText, Messages.processCreateError);
      }
    );
  }

  onConfigProcessoForm() {
    this.formProcesso = this.formBuilder.group({
      id: [null],
      process: [null, Validators.required],
      macroprocess: [null, Validators.required],
      objective: [null, Validators.required],
      outputs: [null],
      internalClients: [this.confirmed, Validators.required],
      inputs: [null],
      externalClientes: [null, Validators.required],
      limitrofeStart: [null],
      limitrofeEnd: [null],
      internalCompliance: [null],
      externalCompliance: [null],
      pathFile: [null],
      startDate: [null],
      endDate: [null],
    });
  }

  ngOnInit(): void {
    this.onConfigProcessoForm();
    this.organogramaService.getOrganogramaList(1).subscribe(
      (response) => {
        if (response.length === 0) {
          this.notify.showInfo(
            'Realize o cadastro do Organograama',
            'Sua empresa não possui organograma cadastrado'
          );
        } else {
          this.source = response;
          this.showForm = true;
        }
      },
      (error) =>
        this.notify.showError(error, 'Erro ao obter os dados do formulário.')
    );
  }

  onChangeButtonsStyles(): void {}
}
