import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvComponent } from './lv.component';

describe('LvComponent', () => {
  let component: LvComponent;
  let fixture: ComponentFixture<LvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
