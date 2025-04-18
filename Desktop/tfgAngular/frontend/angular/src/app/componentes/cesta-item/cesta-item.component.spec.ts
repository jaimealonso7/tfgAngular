import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CestaItemComponent } from './cesta-item.component';

describe('CestaItemComponent', () => {
  let component: CestaItemComponent;
  let fixture: ComponentFixture<CestaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CestaItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CestaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
