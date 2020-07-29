import { HomeComponent } from './modules/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'processo',
    loadChildren: () =>
      import('./modules/processo/processo.module')
        .then(m => m.ProcessoModule)
    // canActivate: [AuthGuardProcesso],
    // canActivateChild: [ProcessoGuard]
  },
  {
    path: 'organograma',
    loadChildren: () =>
      import('./modules/organograma/organograma.module')
        .then(m => m.OrganogramaModule)
    // canActivate: [AuthGuardOrganograma],
    // canActivateChild: [OrganogramaGuard]
  },
  {
    path: 'funcionarios',
    loadChildren: () =>
      import('./modules/funcionario/funcionario.module')
        .then(m => m.FuncionarioModule)
    // canActivate: [AuthGuardOrganograma],
    // canActivateChild: [OrganogramaGuard]
  },
  {
    path: 'empresas',
    loadChildren: () =>
      import('./modules/empresa/empresa.module')
        .then(m => m.EmpresaModule)
    // canActivate: [AuthGuardEmpresa],
    // canActivateChild: [EmpresaGuard]
  },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
