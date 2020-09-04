import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { ModalEmployeeListComponent } from './modal-employee-list/modal-employee-list.component';
import { CustomListboxComponent } from './custom-listbox/custom-listbox.component';

@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    ModalEmployeeListComponent,
    CustomListboxComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
  ],
  exports: [
    FormDebugComponent,
    CampoControlErroComponent,
    ModalEmployeeListComponent,
    CustomListboxComponent
  ]
})
export class SharedModule { }
