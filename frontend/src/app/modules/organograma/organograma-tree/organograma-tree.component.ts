import { Employee } from './../../../core/model/employee';
import { Company } from './../../../core/model/company';
import { Organogram } from './../../../core/model/organogram';
import { Router } from '@angular/router';
import { NotificacaoService } from './../../../shared/services/notificacao.service';
import { SpinnerService } from './../../../shared/services/spinner.service';
import { FuncionarioService } from '../../../core/services/funcionario.service';
import { OrganogramaService } from '../../../core/services/organograma.service';
import { TreeNode } from '../../../core/model/treeNode';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  TemplateRef,
  AfterViewInit,
  ViewChild,
  Input,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Messages } from 'src/app/shared/message';
import { OrganogramaModalFuncionariosComponent } from '../organograma-modal-funcionarios/organograma-modal-funcionarios.component';
import { Funcionario } from 'src/app/core/model/Funcionario';
import { Organograma } from 'src/app/core/model/Organograma';
import { BroadcastService } from 'src/app/core/services/broadcast.service';
import { error } from 'protractor';
import { Observable } from 'rxjs';
declare var $: any;

interface OrganogramaDetails {
  id: number;
  name: string;
}

@Component({
  selector: 'app-organograma-tree',
  templateUrl: './organograma-tree.component.html',
  styleUrls: ['./organograma-tree.component.css'],
})
export class OrganogramaTreeComponent implements OnInit {
  jsonOrgData: Organograma[];
  organogramaDetails: OrganogramaDetails;
  bsModalRef: BsModalRef;
  hasOrganograma: boolean = false;
  company: Company = {
    id: 1,
    name: 'XPTO',
    description: 'XPTO Internacional',
    organograms: null,
  };

  @Input('treeData')
  treeData: TreeNode[];

  constructor(
    private organogramaService: OrganogramaService,
    private funcionarioService: FuncionarioService,
    private spinner: SpinnerService,
    private notify: NotificacaoService,
    private modalService: BsModalService,
    private router: Router,
    private broadcastService: BroadcastService
  ) {}

  openModalConfirm(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }

  onDiscardChanges() {
    this.broadcastService.showAlertPendingChanges(false);
    localStorage.removeItem('@Risco:treeData');
    window.location.reload();
  }

  onSave() {
    this.jsonOrgData = this.treeData.map((elem) => {
      const organograma: Organograma = {
        id: elem.id,
        idEmpresa: this.company.id,
        nome: elem.text,
        descricao: '',
        idPaiOrganograma: String(elem.parent) == '#' ? null : elem.parent,
        idUsuario: null,
        funcionarios: [],
      };
      return organograma;
    });
    this.organogramaService.update(this.jsonOrgData).subscribe(
      (_success) => {
        this.notify.showSuccess(Messages.orgUpdateSuccess, Messages.sucesso);
        this.broadcastService.showAlertPendingChanges(false);
        localStorage.removeItem('@Risco:treeData');
      },
      (error) => {
        this.notify.showError(error.statusText, Messages.orgUpdateError);
      }
    );
  }

  // async openEmployeeModalList(idOrgNode) {
  //   let employeesList = JSON.parse(localStorage.getItem('@Risco:employees'));

  //   if (!employeesList) {
  //     employeesList = await this.funcionarioService.getEmployeesByIdEmpresa(1);

  //     localStorage.setItem('@Risco:employees', JSON.stringify(employeesList));
  //   }

  //   const initialState = {
  //     companyName: 'XPTO',
  //     employeesList: employeesList,
  //     orgNodeId: idOrgNode,
  //   };

  //   this.bsModalRef = this.modalService.show(
  //     OrganogramaModalFuncionariosComponent,
  //     Object.assign({ initialState }, { class: 'gray modal-lg' })
  //   );

  //   this.bsModalRef.content.passEntry.subscribe((employees: Funcionario[]) => {
  //     localStorage.setItem('@Risco:employees', JSON.stringify(employees));
  //     this.treeData = this.treeData.map((node: TreeNode) => {
  //       if (node.id == idOrgNode) {
  //         return {
  //           id: node.id,
  //           text: node.text,
  //           parent: node.parent,
  //           employees: employees.reduce((result, elem) => {
  //             if (elem.organograma) {
  //               if (elem.organograma.id == idOrgNode) {
  //                 result.push(elem);
  //               }
  //             }
  //             return result;
  //           }, []),
  //         };
  //       }
  //       return node;
  //     });
  //     console.log('Após incluir/exluir funcionários >>>', this.treeData);
  //   });
  // }

  async onRenameNode(data) {
    //Procura o elemento na árvore.
    const node = this.treeData.find((element) => element.id == data.node.id);
    //Caso não exista, significa que é um novo nó.
    if (!node) {
      //busca a próxima sequence no banco de dados.
      const sequence = await this.organogramaService.getNextSequence();
      //Cria o novo objeto nó
      const newNode: TreeNode = {
        id: sequence,
        text: data.text,
        parent: data.node.parent,
        employees: [],
      };
      this.treeData.push(newNode);
    } else {
      const newName = data.text;
      this.treeData = this.treeData.map((item) => {
        item.text = item.id == node.id ? newName : item.text;
        return item;
      });
      console.log('Após o rename: ', this.treeData);
    }
    localStorage.setItem('@Risco:treeData', JSON.stringify(this.treeData));
    this.broadcastService.showAlertPendingChanges(true);
  }

  onDeleteNode(data) {
    //Verifica se existe nó filho. Caso exista, exclui todos os filhos.
    if (data.node.children_d) {
      this.treeData = this.treeData.reduce((result, node) => {
        if (!data.node.children_d.includes(String(node.id), 0)) {
          result.push(node);
        }
        return result;
      }, []);
    }
    //this.onUnlinkEmployeesFromNode(data.node);
    const index = this.treeData.findIndex((node) =>
      node.id == data.node.id ? node.id : ''
    );
    this.treeData.splice(index, 1);
    console.log('Após o delete: ', this.treeData);
    localStorage.setItem('@Risco:treeData', JSON.stringify(this.treeData));
    this.broadcastService.showAlertPendingChanges(true);
  }

  // onUnlinkEmployeesFromNode(treeNode: TreeNode): void {
  //   //Desvincula funcionários do nó na lista do localStorage caso haja.
  //   let funcionarios: Funcionario[] = JSON.parse(
  //     localStorage.getItem('@Risco:employees')
  //   );

  //   if (funcionarios) {
  //     funcionarios = funcionarios.map((funcionario) => {
  //       if (funcionario.organograma.id === treeNode.id) {
  //         funcionario.organograma = new Organograma();
  //         return funcionario;
  //       } else {
  //         return funcionario;
  //       }
  //     });
  //     localStorage.setItem('@Risco:employees', JSON.stringify(funcionarios));
  //   }
  // }

  onCreateTree() {
    $('#organogramaTree')
      .jstree({
        core: {
          strings: { 'Loading ...': 'Carregando...' },
          check_callback: true,
          themes: {
            name: 'proton',
            responsive: true,
          },
          data: this.treeData,
        },
        types: {
          default: {
            valid_children: ['default', 'file'],
          },
        },
        plugins: [
          'themes',
          'contextmenu',
          'dnd',
          'state',
          'types',
          'changed',
          'unique',
        ],
        contextmenu: {
          items: ($node) => {
            let tree = $('#organogramaTree').jstree(true);
            return {
              Create: {
                separator_before: false,
                separator_after: false,
                icon: 'plus-square',
                label: 'Novo setor',
                action: () => {
                  $node = tree.create_node($node);
                  tree.edit($node);
                },
              },
              Rename: {
                separator_before: false,
                separator_after: false,
                icon: 'edit',
                label: 'Renomear setor',
                action: () => {
                  tree.edit($node);
                },
              },
              Delete: {
                separator_before: false,
                separator_after: false,
                icon: 'delete',
                label: 'Remover',
                _disabled: () => {
                  return $node.parent == '#' ? true : false;
                },
                action: () => {
                  tree.delete_node($node);
                },
              },
              AddFuncionario: {
                separator_before: false,
                separator_after: false,
                label: 'Incluir funcionário',
                _disabled: true,
                action: () => {},
              },
            };
          },
        },
      })
      .on('rename_node.jstree', (e, data) => {
        this.onRenameNode(data);
      })
      .on('delete_node.jstree', (e, data) => {
        this.onDeleteNode(data);
      })
      .on('changed.jstree', (e, data) => {
        const idNode = data.selected[0];
        if (idNode) {
          this.organogramaDetails = { id: data.node.id, name: data.node.text };
        }
      });
  }

  ngOnInit(): void {
    console.log(this.treeData)
    const treeDataStorage = localStorage.getItem('@Risco:treeData');
    if(treeDataStorage) {
      this.treeData = JSON.parse(treeDataStorage);
    }
    this.onCreateTree();
  }
}
