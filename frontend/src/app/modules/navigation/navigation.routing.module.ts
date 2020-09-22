import { HomeComponent } from '../home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'processo',
    loadChildren: () =>
      import('../processo/processo.module')
        .then(m => m.ProcessoModule)
    // canActivate: [AuthGuardProcesso],
    // canActivateChild: [ProcessoGuard]
  },
  {
    path: 'macroProcesso',
    loadChildren: () =>
      import('../macro-processo/macro-processo.module')
        .then(m => m.MacroProcessoModule)
    // canActivate: [AuthGuardOrganograma],
    // canActivateChild: [OrganogramaGuard]
  },
  {
    path: 'organograma',
    loadChildren: () =>
      import('../organograma/organograma.module')
        .then(m => m.OrganogramaModule)
    // canActivate: [AuthGuardOrganograma],
    // canActivateChild: [OrganogramaGuard]
  },
  {
    path: 'funcionarios',
    loadChildren: () =>
      import('../funcionario/funcionario.module')
        .then(m => m.FuncionarioModule)
    // canActivate: [AuthGuardOrganograma],
    // canActivateChild: [OrganogramaGuard]
  },
  {
    path: 'empresas',
    loadChildren: () =>
      import('../empresa/empresa.module')
        .then(m => m.EmpresaModule)
    // canActivate: [AuthGuardEmpresa],
    // canActivateChild: [EmpresaGuard]
  },
  { path: 'home', component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/home' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
