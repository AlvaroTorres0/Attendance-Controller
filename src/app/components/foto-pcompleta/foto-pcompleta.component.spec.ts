import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoPcompletaComponent } from './foto-pcompleta.component';

describe('FotoPcompletaComponent', () => {
  let component: FotoPcompletaComponent;
  let fixture: ComponentFixture<FotoPcompletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoPcompletaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotoPcompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
