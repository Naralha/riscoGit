import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganogramaDetailComponent } from './organograma-detail.component';

describe('OrganogramaDetailComponent', () => {
  let component: OrganogramaDetailComponent;
  let fixture: ComponentFixture<OrganogramaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganogramaDetailComponent ]
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
