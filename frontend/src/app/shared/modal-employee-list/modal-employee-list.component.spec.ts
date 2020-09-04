import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmployeeListComponent } from './modal-employee-list.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ModalEmployeeListComponent', () => {
  let component: ModalEmployeeListComponent;
  let fixture: ComponentFixture<ModalEmployeeListComponent>;
  const employeeListReturnMock = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmployeeListComponent ],
      imports: [HttpClientTestingModule],
      providers: [BsModalRef]
    })
    .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmployeeListComponent);
    component = fixture.componentInstance;
    component.companyName = 'XPTO';
    component.employeesList = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
