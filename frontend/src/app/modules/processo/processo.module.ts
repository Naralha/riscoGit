import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessoComponent } from './processo.component';
import { ProcessoFormComponent } from './processo-form/processo-form.component';
import { ProcessoRoutingModule } from './processo-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularDualListBoxModule } from 'angular-dual-listbox';

@NgModule({
  declarations: [
    ProcessoComponent,
    ProcessoFormComponent],
  imports: [
    CommonModule,
    ProcessoRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AngularDualListBoxModule
  ]
})
export class ProcessoModule { }
