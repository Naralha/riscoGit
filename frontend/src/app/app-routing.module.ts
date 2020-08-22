import { HomeComponent } from './modules/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';


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
    path: 'macroProcesso',
    loadChildren: () =>
      import('./modules/macro-processo/macro-processo.module')
        .then(m => m.MacroProcessoModule)
    // canActivate: [AuthGuardOrganograma],
    // canActivateChild: [OrganogramaGuard]
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
  { path: 'login', component: AuthComponent},
  { path: 'home', component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/home' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
