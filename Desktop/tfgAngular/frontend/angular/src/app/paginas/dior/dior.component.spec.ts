import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiorComponent } from './dior.component';

describe('DiorComponent', () => {
  let component: DiorComponent;
  let fixture: ComponentFixture<DiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
