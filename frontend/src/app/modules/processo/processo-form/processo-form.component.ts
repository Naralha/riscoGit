import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProcessoService } from '../processo.service';
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

  source = [
    {
      "key": 1,
      "station": "Antonito",
      "state": "CO"
    },
    {
      "key": 2,
      "station": "Big Horn",
      "state": "NM"
    },
    {
      "key": 3,
      "station": "Sublette",
      "state": "NM"
    },
    {
      "key": 4,
      "station": "Toltec",
      "state": "NM"
    },
    {
      "key": 5,
      "station": "Osier",
      "state": "CO"
    },
    {
      "key": 6,
      "station": "Chama",
      "state": "NM"
    },
    {
      "key": 7,
      "station": "Monero",
      "state": "NM"
    },
    {
      "key": 8,
      "station": "Lumberton",
      "state": "NM"
    },
    {
      "key": 9,
      "station": "Duice",
      "state": "NM"
    },
    {
      "key": 10,
      "station": "Navajo",
      "state": "NM"
    },
    {
      "key": 11,
      "station": "Juanita",
      "state": "CO"
    },
    {
      "key": 12,
      "station": "Pagosa Jct",
      "state": "CO"
    },
    {
      "key": 13,
      "station": "Carracha",
      "state": "CO"
    },
    {
      "key": 14,
      "station": "Arboles",
      "state": "CO"
    },
    {
      "key": 15,
      "station": "Solidad",
      "state": "CO"
    },
    {
      "key": 16,
      "station": "Tiffany",
      "state": "CO"
    },
    {
      "key": 17,
      "station": "La Boca",
      "state": "CO"
    },
    {
      "key": 18,
      "station": "Ignacio",
      "state": "CO"
    },
    {
      "key": 19,
      "station": "Oxford",
      "state": "CO"
    },
    {
      "key": 20,
      "station": "Florida",
      "state": "CO"
    },
    {
      "key": 21,
      "station": "Bocea",
      "state": "CO"
    },
    {
      "key": 22,
      "station": "Carbon Jct",
      "state": "CO"
    },
    {
      "key": 23,
      "station": "Durango",
      "state": "CO"
    },
    {
      "key": 24,
      "station": "Home Ranch",
      "state": "CO"
    },
    {
      "key": 25,
      "station": "Trimble Springs",
      "state": "CO"
    },
    {
      "key": 26,
      "station": "Hermosa",
      "state": "CO"
    },
    {
      "key": 27,
      "station": "Rockwood",
      "state": "CO"
    },
    {
      "key": 28,
      "station": "Tacoma",
      "state": "CO"
    },
    {
      "key": 29,
      "station": "Needleton",
      "state": "CO"
    },
    {
      "key": 30,
      "station": "Elk Park",
      "state": "CO"
    },
    {
      "key": 31,
      "station": "Silverton",
      "state": "CO"
    },
    {
      "key": 32,
      "station": "Eureka",
      "state": "CO"
    },
    {
      "key": 33,
      "stationLabel(e){return e.station+\", \"+e.state}": "21w321"
    }
  ];

  format = { add: 'Tilføje', remove: 'Fjerne', all: 'Alle', none: 'Intet',
  direction: DualListComponent.LTR, draggable: true, locale: 'da' };

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
