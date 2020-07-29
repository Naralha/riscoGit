import { EmpresaDetailComponent } from './empresa-detail/empresa-detail.component';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { SharedModule } from './../../shared/shared.module';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { EmpresaRoutingModule } from './empresa.routing.module';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmpresaComponent,
    EmpresaFormComponent,
    EmpresaListComponent,
    EmpresaDetailComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
})
export class EmpresaModule { }
