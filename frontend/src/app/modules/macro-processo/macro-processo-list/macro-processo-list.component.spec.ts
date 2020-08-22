import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroProcessoListComponent } from './macro-processo-list.component';

describe('MacroProcessoListComponent', () => {
  let component: MacroProcessoListComponent;
  let fixture: ComponentFixture<MacroProcessoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroProcessoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroProcessoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
