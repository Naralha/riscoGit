import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NotificacaoService } from '../services/notificacao.service';

@Component({
  selector: 'input-value-box',
  templateUrl: './input-value-box.component.html',
  styleUrls: ['./input-value-box.component.css'],
})
export class InputValueBoxComponent implements OnInit {
  @Input()
  placeHolderName: string;

  @Input()
  valueBoxId: string;

  @Input()
  selectOptionValues: string[] = [];

  @Output()
  valueInserted = new EventEmitter<string>();

  ngModelValue: string;

  listValues: string[] = [];

  constructor(private notify: NotificacaoService) {}

  onAddValue(value: string) {
    if (value !== '0') {
      const alreadInserted = this.listValues.includes(value);
      if (alreadInserted) {
        this.notify.showInfo('Valor informado já existe na lista!', '');
      } else {
        this.listValues.push(value);
        this.ngModelValue = '';
        this.valueInserted.emit(value);
      }
    }
  }

  onClearValues() {
    this.listValues = [];
    this.ngModelValue = '';
  }

  ngOnInit(): void {}
}
