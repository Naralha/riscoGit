import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessoComponent } from './processo.component';
import { ProcessoFormComponent } from './processo-form/processo-form.component';


const processoRoutes: Routes = [
  { path: '', component: ProcessoComponent,
      // canActivateChild: [ProcessoGuard],
      children: [
          {path: 'novo', component: ProcessoFormComponent,
        },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(processoRoutes)],
  exports: [RouterModule]
})
export class ProcessoRoutingModule { }
