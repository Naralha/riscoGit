import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganogramaModalFuncionariosComponent } from './organograma-modal-funcionarios.component';

describe('OrganogramaModalFuncionariosComponent', () => {
  let component: OrganogramaModalFuncionariosComponent;
  let fixture: ComponentFixture<OrganogramaModalFuncionariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganogramaModalFuncionariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganogramaModalFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
