import { Messages } from './../../shared/message';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../core/model/company';
import { OrganogramaService } from '../../core/services/organograma.service';
import { SpinnerService } from './../../shared/services/spinner.service';
import { NotificacaoService } from 'src/app/shared/services/notificacao.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-organograma',
  templateUrl: './organograma.component.html',
  styleUrls: ['./organograma.component.css']
})
export class OrganogramaComponent implements OnInit {

  company: Company = {
    id: 1,
    name: 'XPTO',
    description: 'XPTO Internacional',
    organograms: null
  }
  orgNode: FormGroup;
  topoOrg: string;
  descOrg: string;
  subscription: Subscription;
  funcionarios$: Observable<Company[]>;

  constructor(
    private spinner: SpinnerService,
    private organogramaService: OrganogramaService,
    private route: ActivatedRoute,
    private formOrg: FormBuilder,
    private notify: NotificacaoService,
    private router: Router
  ) { }

  onCreateOrganograma() {
    this.spinner.showSpinner();
    this.organogramaService.createNode(this.orgNode)
      .subscribe(
        success => {
          this.notify.showSuccess(Messages.orgRegisterSuccess, Messages.sucesso);
          this.router.navigate(['/tree']);
        },
        error => {
          this.notify.showError(error.statusText, Messages.orgRegisterError);
        }
      )
  }

  ngOnInit() {
    //Caso exista parâmetros na rota, significa que esta vindo do componente empresa, e será
    //criado um novo organograma.
    this.subscription = this.route.queryParams.subscribe(
      (params: any) => {
        if(params.hasOwnProperty('idEmpresa')) {
          this.orgNode = this.formOrg.group({
            empresa: [
              {
                id: params['idEmpresa'],
                nome: params['nomeEmpresa'],
                descricao: params['descEmpresa']
              }
            ],
            nome: [params['topoOrg']],
            descricao: [params['descOrg']],
            idPaiOrganograma: [null]
          })
          this.onCreateOrganograma();
        }
      }
    );
  }
}
