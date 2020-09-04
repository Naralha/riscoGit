import { Messages } from './../../shared/message';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../core/model/company';
import { OrganogramaService } from '../../core/services/organograma.service';
import { SpinnerService } from './../../shared/services/spinner.service';
import { NotificacaoService } from 'src/app/shared/services/notificacao.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { BroadcastService } from 'src/app/core/services/broadcast.service';
import { TreeNode } from 'src/app/core/model/treeNode';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-organograma',
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s', style({ opacity: 1 })),
      ]),
    ]),
  ],
  templateUrl: './organograma.component.html',
  styleUrls: ['./organograma.component.css'],
})
export class OrganogramaComponent implements OnInit, OnDestroy {
  company: Company = {
    id: 1,
    name: 'XPTO',
    description: 'XPTO Internacional',
    organograms: null,
  };
  treeData: TreeNode[];
  orgNode: FormGroup;
  topoOrg: string;
  descOrg: string;
  subscription: Subscription;
  funcionarios$: Observable<Company[]>;
  showAlertPendingChanges: boolean = false;

  constructor(
    private spinner: SpinnerService,
    private organogramaService: OrganogramaService,
    private route: ActivatedRoute,
    private formOrg: FormBuilder,
    private notify: NotificacaoService,
    private router: Router,
    private broadcastService: BroadcastService
  ) {
    this.subscription = broadcastService.instance$.subscribe(
      (show: boolean) => {
        this.showAlertPendingChanges = show;
      }
    );

    const pendingChanges = localStorage.getItem('@Risco:treeData');
    if (pendingChanges) this.showAlertPendingChanges = true;
  }

  onCreateOrganograma() {
    this.spinner.showSpinner();
    this.organogramaService.createNode(this.orgNode).subscribe(
      (_success) => {
        this.notify.showSuccess(Messages.orgRegisterSuccess, Messages.sucesso);
        this.router.navigate(['/tree']);
      },
      (error) => {
        this.notify.showError(error.statusText, Messages.orgRegisterError);
      }
    );
  }

  ngOnInit() {
    // Caso exista parâmetros na rota, significa que esta vindo do componente empresa, e será
    // criado um novo organograma.
    this.subscription = this.route.queryParams.subscribe((params: any) => {
      if (params.hasOwnProperty('idEmpresa')) {
        this.orgNode = this.formOrg.group({
          empresa: [
            {
              id: params['idEmpresa'],
              nome: params['nomeEmpresa'],
              descricao: params['descEmpresa'],
            },
          ],
          nome: [params['topoOrg']],
          descricao: [params['descOrg']],
          idPaiOrganograma: [null],
        });
        this.onCreateOrganograma();
      }
    });

    this.organogramaService
      .getOrganogramaByEmpresa(this.company.id)
      .subscribe((data) => {
        this.treeData = data;
      });
  }

  ngOnDestroy() {}
}
