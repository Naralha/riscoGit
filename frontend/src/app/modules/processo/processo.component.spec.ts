import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoComponent } from './processo.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProcessoComponent', () => {
  let component: ProcessoComponent;
  let fixture: ComponentFixture<ProcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessoComponent ],
      imports: [RouterTestingModule],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessoComponent);
    component = fixture.componentInstance;
    component.showNewProcessButton = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
