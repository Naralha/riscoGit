import { Employee } from './../../../core/model/employee';
import { Company } from './../../../core/model/company';
import { Organogram } from './../../../core/model/organogram';
import { Router } from '@angular/router';
import { NotificacaoService } from './../../../shared/services/notificacao.service';
import { SpinnerService } from './../../../shared/services/spinner.service';
import { FuncionarioService } from './../../funcionario/funcionario.service';
import { OrganogramaService } from './../organograma.service';
import { TreeNode } from '../../../core/model/treeNode';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Messages } from 'src/app/shared/message';
import { OrganogramaModalFuncionariosComponent } from '../organograma-modal-funcionarios/organograma-modal-funcionarios.component';
declare var $: any;

@Component({
  selector: 'app-organograma-tree',
  templateUrl: './organograma-tree.component.html',
  styleUrls: ['./organograma-tree.component.css']
})
export class OrganogramaTreeComponent implements OnInit {

  jsonTreeData: TreeNode[];
  jsonOrgData: Organogram[];
  bsModalRef: BsModalRef;
  company: Company = {
    id: 1,
    name: 'XPTO',
    description: 'XPTO Internacional',
    organograms: null
  }

  @Output()
  pendingChanges = new EventEmitter();

  constructor(
    private organogramaService: OrganogramaService,
    private funcionarioService: FuncionarioService,
    private spinner: SpinnerService,
    private notify: NotificacaoService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  onSave() {
    //Serialização
    this.jsonOrgData = this.jsonTreeData
      .map(elem => {
        const org: Organogram = {
          id: elem.id,
          company: this.company,
          name: elem.text,
          description: null,
          parentId: String(elem.parent) == "#" ? null : elem.parent,
          idUser: null,
          employees: elem.employees
        }
        return org;
      })
    this.organogramaService.update(this.jsonOrgData)
      .subscribe(
        success => {
          this.notify.showSuccess(Messages.orgUpdateSuccess, Messages.sucesso);
          localStorage.removeItem('employees');
        },
        error => {
          this.notify.showError(error.statusText, Messages.orgUpdateError);
        }
      )
  }

  async openEmployeeModalList(idOrgNode) {
    let employeesList: any;
    //Carrega a lista de funcionários no LocalStorage.
    //(Necessário pois os dados serão modificados por dois componentes.)
    employeesList = JSON.parse(localStorage.getItem('employees'));

    //Caso não tenha funcionários no LocalStorage busca no banco e guarda no localStorage.
    if (employeesList == null) {
      employeesList = await this.funcionarioService.getEmployeesByIdEmpresa(1);
      //Deserialização
      employeesList = employeesList.map(elem => {
        return {
          id: elem.id,
          name: elem.nome,
          email: elem.email,
          description: elem.descricao,
          idCompany: elem.idEmpresa,
          idUser: elem.idUser,
          idSectorCompany: elem.organograma != null ? elem.organograma.id : null
        }
      });
    }

    console.log("aqui antes >>", employeesList)

    //Guarda a lista de funcionários no localStorage após a deserialização.
    localStorage.setItem("employees", JSON.stringify(employeesList));

    //Parâmetros que serão passados para a Modal.
    const initialState = {
      companyName: 'XPTO',
      employeesList: employeesList,
      orgNodeId: idOrgNode
    };

    //Chama a Modal passando os parâmetros.
    this.bsModalRef = this.modalService.show(
      OrganogramaModalFuncionariosComponent,
      Object.assign({ initialState }, { class: 'gray modal-lg' })
    );

    //Inscrição do evento de retorno do modal com os funcionários selecionados.
    //Atualiza os funcionarios no localStorage e inclui no Organograma.
    this.bsModalRef.content.passEntry.subscribe((employees: Employee[]) => {
      localStorage.setItem("employees", JSON.stringify(employees));
      this.jsonTreeData = this.jsonTreeData.map((node: TreeNode) => {
        if (node.id == idOrgNode) {
          return {
            id: node.id,
            text: node.text,
            parent: node.parent,
            employees: employees.reduce((result, elem) => {
              if (elem.idSectorCompany == idOrgNode) {
                result.push(elem);
              }
              return result;
            }, [])
          }
        }
        return node;
      });
      console.log("Após incluir/exluir funcionários >>>", this.jsonTreeData)
    })
  }

  async onRenameNode(data) {
    //Procura o elemento na árvore.
    const node = this.jsonTreeData.find(element => element.id == data.node.id);
    //Caso não exista, significa que é um novo nó.
    if (node == undefined) {
      //busca a próxima sequence no banco de dados por chamada síncrona.
      const sequence = await this.organogramaService.getNextSequence();
      //Cria o novo objeto nó
      const newNode: TreeNode = {
        id: sequence,
        text: data.text,
        parent: data.node.parent,
        employees: []
      };
      this.jsonTreeData.push(newNode);
      console.log(this.jsonTreeData)
    } else {
      const newName = data.text;
      this.jsonTreeData = this.jsonTreeData.map(item => {
        item.text = item.id == node.id ? newName : item.text;
        return item;
      });
      console.log("Após o rename: ", this.jsonTreeData);
    }
  }

  onDeleteNode(data) {
    //Verifica se existe nó filho. Caso exista, exclui todos os filhos.
    if (!data.node.children_d) {
      this.jsonTreeData = this.jsonTreeData.reduce((result, node) => {
        if (!data.node.children_d.includes(String(node.id), 0)) {
          result.push(node);
        } else {
          //Desvincula os funcionários do nó filho
          this.onUnlinkEmployeesFromNode(node);
        }
        return result;
      }, []);
    }
    //Exclui o nó principal e desvincula os funcionários.
    this.onUnlinkEmployeesFromNode(data.node);
    const index = this.jsonTreeData.findIndex((node) => node.id == data.node.id ? node.id : "");
    this.jsonTreeData.splice(index, 1);
    console.log("Após o delete: ", this.jsonTreeData);
  }

  onUnlinkEmployeesFromNode(node: TreeNode): void {
    //Obtém a lista de funcionários do localStorage.
    let employees: Employee[] = JSON.parse(localStorage.getItem("employees"));
    //Desvincula os funcionários do nó
    employees = employees.map((employee: Employee) => {
      if (employee.idSectorCompany == node.id) {
        employee.idSectorCompany = null;
      }
      return employee;
    });
    //Atualiza os funcionários no localStorage
    localStorage.setItem("employees", JSON.stringify(employees));
  }

  onLinkEmployeesOnNode() {

  }

  onCreateTree() {
    $('#organogramaTree')
      .jstree({
        core: {
          'strings' : { 'Loading ...' : 'Carregando...' },
          "check_callback": true,
          'themes': {
            'name': 'proton',
            'responsive': true
          },
          'data': this.jsonTreeData
        },
        "types": {
          "default": {
            "valid_children": ["default", "file"]
          }
        },
        "plugins": ["themes", "contextmenu", "dnd",
          "state", "types", "changed", "unique"],
        "contextmenu": {
          "items": ($node) => {
            let tree = $('#organogramaTree').jstree(true);
            return {
              "Create": {
                "separator_before": false,
                "separator_after": false,
                "icon": "plus-square",
                "label": "Novo setor",
                "action": () => {
                  this.pendingChanges.emit(true);
                  $node = tree.create_node($node);
                  tree.edit($node);
                }
              },
              "Rename": {
                "separator_before": false,
                "separator_after": false,
                "icon": "edit",
                "label": "Renomear setor",
                "action": () => {
                  this.pendingChanges.emit(true);
                  tree.edit($node);
                }
              },
              "Delete": {
                "separator_before": false,
                "separator_after": false,
                "icon": "delete",
                "label": "Remover",
                "_disabled": () => {
                  return $node.parent == "#" ? true : false;
                },
                "action": () => {
                  this.pendingChanges.emit(true);
                  tree.delete_node($node);
                }
              },
              "AddFuncionario": {
                "separator_before": false,
                "separator_after": false,
                "label": "Incluir funcionário",
                "action": () => {
                  this.pendingChanges.emit(true);
                  this.openEmployeeModalList($node.id);
                }
              }
            }
          }
        }
      }).on('rename_node.jstree', (e, data) => {
        this.onRenameNode(data);
      }).on("delete_node.jstree", (e, data) => {
        this.onDeleteNode(data);
      }).on("changed.jstree", (e, data) => {
        let idNode = data.selected[0];
        if (idNode != undefined) {
          this.router.navigate(['organograma/tree/detail'], { queryParams: { id: data.node.id, name: data.node.text } });
        }
      });
  };

  ngOnInit(): void {
    this.organogramaService.getOrganogramaByEmpresa(this.company.id).subscribe(
      (data) => {
        this.jsonTreeData = data;
        this.onCreateTree();
      },
    );
  }
}

