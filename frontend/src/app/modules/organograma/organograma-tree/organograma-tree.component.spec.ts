import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganogramaTreeComponent } from './organograma-tree.component';

describe('OrganogramaTreeComponent', () => {
  let component: OrganogramaTreeComponent;
  let fixture: ComponentFixture<OrganogramaTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganogramaTreeComponent ]
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
