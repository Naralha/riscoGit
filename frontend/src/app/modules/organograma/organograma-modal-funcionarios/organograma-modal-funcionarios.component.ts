import { Employee } from '../../../core/model/employee';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { Company } from '../../../core/model/company';
import { Observable, empty } from 'rxjs';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { Funcionario } from 'src/app/core/model/Funcionario';
import { Organograma } from 'src/app/core/model/Organograma';

@Component({
  selector: 'app-organograma-modal-funcionarios',
  templateUrl: './organograma-modal-funcionarios.component.html',
  styleUrls: ['./organograma-modal-funcionarios.component.css'],
})
export class OrganogramaModalFuncionariosComponent implements OnInit {
  @Input() employeesList: Funcionario[];
  @Input() companyName: string;
  @Input() companyId: number;
  @Input() orgNodeId: number;
  @Output() employeeListReturn: Funcionario[];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  funcionarios$: Observable<Company[]>;

  constructor(
    public bsModalRef: BsModalRef,
    private spinnerService: SpinnerService
  ) {}

  onPassCallBack() {
    console.log(this.employeeListReturn);
    this.passEntry.emit(this.employeeListReturn);
  }

  onAddEmployeeToReturnList(e, employee: Funcionario) {
    this.employeeListReturn = this.employeeListReturn.map((item) => {
      if (item.id == employee.id) {
        if (e.target.checked) {
          if(item.organograma) {
            item.organograma.id = this.orgNodeId;
          } else {
            item.organograma = new Organograma();
            item.organograma.id = this.orgNodeId;
          }
        } else {
          item.organograma.id = null;
        }
      }
      return item;
    });
  }

  onDisableEmployee(idSectorCompany: number) {
    if (
      (idSectorCompany != null && idSectorCompany == this.orgNodeId) ||
      idSectorCompany == null
    ) {
      return false;
    } else {
      return true;
    }
  }

  onEmployeeChecked(idSectorCompany: number) {
    return idSectorCompany ? true : false;
  }

  ngOnInit(): void {
    console.log(this.employeesList);
    this.employeeListReturn = this.employeesList;
  }
}
