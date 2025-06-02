import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersaceComponent } from './versace.component';

describe('VersaceComponent', () => {
  let component: VersaceComponent;
  let fixture: ComponentFixture<VersaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
