import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProcessoFormComponent } from './processo-form.component';
import { FormBuilder } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

describe('ProcessoFormComponent', () => {
  let component: ProcessoFormComponent;
  let fixture: ComponentFixture<ProcessoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessoFormComponent ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
