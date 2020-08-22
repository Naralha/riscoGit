import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MacroProcessoComponent } from './macro-processo.component';
import { MacroProcessoListComponent } from './macro-processo-list/macro-processo-list.component';


const routes: Routes = [
  {
    path: '', component: MacroProcessoComponent,
    children: [
      {
        path: 'listarMacroProcesso', component: MacroProcessoListComponent
      }
    ]
  }
]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MacroProcessoRoutingModule { }
