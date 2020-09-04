import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaListComponent } from './empresa-list.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { EmpresaService } from 'src/app/core/services/empresa.service';

import { AbstractMockObservableService } from 'src/app/core/util/AbstractMockObservableService';
import { ToastrService, ToastrModule } from 'ngx-toastr';

class MockService extends AbstractMockObservableService {
  doStuff() {
    return this;
  }
}

describe('EmpresaListComponent', () => {
  let component: EmpresaListComponent;
  let fixture: ComponentFixture<EmpresaListComponent>;
  let mockService;

  beforeEach(async(() => {
    mockService = new MockService();
    TestBed.configureTestingModule({
      declarations: [ EmpresaListComponent ],
      imports: [ToastrModule.forRoot()],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
