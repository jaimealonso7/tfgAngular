import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosBuscadorComponent } from './resultados-buscador.component';

describe('ResultadosBuscadorComponent', () => {
  let component: ResultadosBuscadorComponent;
  let fixture: ComponentFixture<ResultadosBuscadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadosBuscadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
