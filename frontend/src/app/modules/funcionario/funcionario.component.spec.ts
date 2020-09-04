import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioComponent } from './funcionario.component';
import { HttpClientModule } from '@angular/common/http';

describe('FuncionarioComponent', () => {
  let component: FuncionarioComponent;
  let fixture: ComponentFixture<FuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionarioComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
