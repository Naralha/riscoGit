import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioFormComponent } from './funcionario-form.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FuncionarioFormComponent', () => {
  let component: FuncionarioFormComponent;
  let fixture: ComponentFixture<FuncionarioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionarioFormComponent ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
