import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionEdificioComponent } from './seleccion-edificio.component';

describe('SeleccionEdificioComponent', () => {
  let component: SeleccionEdificioComponent;
  let fixture: ComponentFixture<SeleccionEdificioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionEdificioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
