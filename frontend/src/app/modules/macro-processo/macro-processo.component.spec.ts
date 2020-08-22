import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroProcessoComponent } from './macro-processo.component';

describe('MacroProcessoComponent', () => {
  let component: MacroProcessoComponent;
  let fixture: ComponentFixture<MacroProcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroProcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
