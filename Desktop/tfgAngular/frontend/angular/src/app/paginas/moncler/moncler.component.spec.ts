import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonclerComponent } from './moncler.component';

describe('MonclerComponent', () => {
  let component: MonclerComponent;
  let fixture: ComponentFixture<MonclerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonclerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonclerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
