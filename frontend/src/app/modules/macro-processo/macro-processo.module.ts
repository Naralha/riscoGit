import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MacroProcessoComponent } from './macro-processo.component';
import { MacroProcessoListComponent } from './macro-processo-list/macro-processo-list.component';
import { MacroProcessoRoutingModule } from './macro-processo-routing.module';



@NgModule({
  declarations: [MacroProcessoComponent, MacroProcessoListComponent],
  imports: [
    CommonModule, MacroProcessoRoutingModule
  ]
})
export class MacroProcessoModule { }
