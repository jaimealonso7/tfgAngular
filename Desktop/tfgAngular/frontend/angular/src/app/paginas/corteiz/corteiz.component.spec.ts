import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteizComponent } from './corteiz.component';

describe('CorteizComponent', () => {
  let component: CorteizComponent;
  let fixture: ComponentFixture<CorteizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorteizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorteizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
