import { OrganogramaDetailComponent } from './organograma-detail/organograma-detail.component';
import { OrganogramaTreeComponent } from './organograma-tree/organograma-tree.component';
import { OrganogramaFormComponent } from './organograma-form/organograma-form.component';
import { OrganogramaComponent } from './organograma.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const organogramaRoutes: Routes = [
  { path: '', component: OrganogramaComponent,
      // canActivateChild: [OrganogramaGuard],
      children: [
          {path: 'novo', component: OrganogramaFormComponent},
          {path: 'tree', component: OrganogramaTreeComponent,
            children: [
              {path: 'detail', component: OrganogramaDetailComponent}
            ]
        },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(organogramaRoutes)],
  exports: [RouterModule]
})
export class OrganogramaRoutingModule { }
