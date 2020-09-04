import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganogramaDetailComponent } from './organograma-detail.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrganogramaDetailComponent', () => {
  let component: OrganogramaDetailComponent;
  let fixture: ComponentFixture<OrganogramaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganogramaDetailComponent ],
      imports: [RouterTestingModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganogramaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
