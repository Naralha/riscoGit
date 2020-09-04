import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaDetailComponent } from './empresa-detail.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractMockObservableService } from 'src/app/core/util/AbstractMockObservableService';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmpresaDetailComponent', () => {
  let component: EmpresaDetailComponent;
  let fixture: ComponentFixture<EmpresaDetailComponent>;

  const fakeActivatedRoute = {
    snapshot: {
      data: {}
    }
  } as ActivatedRoute;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ EmpresaDetailComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
