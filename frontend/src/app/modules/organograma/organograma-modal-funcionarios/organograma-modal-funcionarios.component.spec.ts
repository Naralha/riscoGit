import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganogramaModalFuncionariosComponent } from './organograma-modal-funcionarios.component';
import { BsModalRef } from 'ngx-bootstrap/modal';

describe('OrganogramaModalFuncionariosComponent', () => {
  let component: OrganogramaModalFuncionariosComponent;
  let fixture: ComponentFixture<OrganogramaModalFuncionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganogramaModalFuncionariosComponent ],
      providers: [BsModalRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganogramaModalFuncionariosComponent);
    component = fixture.componentInstance;
    component.companyName = 'XPTO';
    component.employeesList = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
