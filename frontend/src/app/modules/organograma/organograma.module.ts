import { OrganogramaFormComponent } from './organograma-form/organograma-form.component';
import { OrganogramaRoutingModule } from './organograma-routing.module';
import { OrganogramaComponent } from './organograma.component';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrganogramaTreeComponent } from './organograma-tree/organograma-tree.component';
import { OrganogramaDetailComponent } from './organograma-detail/organograma-detail.component';
import { OrganogramaModalFuncionariosComponent } from './organograma-modal-funcionarios/organograma-modal-funcionarios.component';

@NgModule({
  declarations: [
    OrganogramaComponent,
    OrganogramaFormComponent,
    OrganogramaTreeComponent,
    OrganogramaDetailComponent,
    OrganogramaModalFuncionariosComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    OrganogramaRoutingModule,
    SharedModule,
  ],
  providers: [],
})
export class OrganogramaModule { }
