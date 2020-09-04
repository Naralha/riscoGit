import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganogramaTreeComponent } from './organograma-tree.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrganogramaTreeComponent', () => {
  let component: OrganogramaTreeComponent;
  let fixture: ComponentFixture<OrganogramaTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganogramaTreeComponent ],
      imports: [ToastrModule.forRoot(), ModalModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganogramaTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
