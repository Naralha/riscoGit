import { EmpresaDetalheResolver } from './empresa-detail/empresa-detalhe.resolver';
import { EmpresaDetailComponent } from './empresa-detail/empresa-detail.component';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { EmpresaComponent } from './empresa.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

const empresaRoutes: Routes = [
    { path: '', component: EmpresaComponent,
        // canActivateChild: [EmpresaGuard],
        children: [
            {path: 'cadastro', component: EmpresaFormComponent},
            {path: 'lista', component: EmpresaListComponent},
            {path: 'lista/:id', component: EmpresaDetailComponent,
                resolve: { company : EmpresaDetalheResolver }
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(empresaRoutes)],
    exports: [RouterModule]
})
export class EmpresaRoutingModule {
}
