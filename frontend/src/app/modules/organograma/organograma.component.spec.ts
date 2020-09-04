import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganogramaComponent } from './organograma.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrganogramaComponent', () => {
  let component: OrganogramaComponent;
  let fixture: ComponentFixture<OrganogramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganogramaComponent ],
      imports: [RouterTestingModule, ToastrModule.forRoot(), HttpClientTestingModule],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
