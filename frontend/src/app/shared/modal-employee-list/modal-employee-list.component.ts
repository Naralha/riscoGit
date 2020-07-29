import { Employee } from './../../core/model/employee';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SpinnerService } from './../services/spinner.service';
import { Company } from '../../core/model/company';
import { Observable, empty } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal-employee-list',
  templateUrl: './modal-employee-list.component.html',
  styleUrls: ['./modal-employee-list.component.css']
})
export class ModalEmployeeListComponent implements OnInit, OnDestroy {

  @Input() employeesList: Employee[];
  @Input() companyName: string;
  @Input() companyId: number;
  @Input() orgNodeId: number;
  @Output() employeeListReturn: Employee[];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  funcionarios$: Observable<Company[]>;

  constructor(
    public bsModalRef: BsModalRef,
    private spinnerService: SpinnerService
  ) { }

  onPassCallBack() {
    this.passEntry.emit(this.employeeListReturn);
  }

  onAddEmployeeToReturnList(e, employee: Employee) {
    this.employeeListReturn = this.employeeListReturn
      .map(item => {
        if (item.id == employee.id) {
          if (e.target.checked) {
            item.idSectorCompany = this.orgNodeId;
          } else {
            item.idSectorCompany = null;
          }
        }
        return item;
      });
  }

  onDisableEmployee(idSectorCompany: number) {
    if (idSectorCompany != null && idSectorCompany == this.orgNodeId
      || idSectorCompany == null) {
      return false;
    } else {
      return true;
    }
  }

  onEmployeeChecked(idSectorCompany: number) {
    return idSectorCompany ? true : false;
  }

  ngOnInit(): void {
    this.employeeListReturn = this.employeesList;
    this.spinnerService.hideSpinner();
  }

  @HostListener('unloaded')
  ngOnDestroy(): void { }
}
