import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { FuncionarioListComponent } from './funcionario-list/funcionario-list.component';
import { FuncionarioRoutingModule } from './funcionario.routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    FuncionarioComponent,
    FuncionarioListComponent,
    FuncionarioFormComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FuncionarioRoutingModule,
  ],
  entryComponents: [FuncionarioListComponent],
  providers: [],
})

export class FuncionarioModule { }
