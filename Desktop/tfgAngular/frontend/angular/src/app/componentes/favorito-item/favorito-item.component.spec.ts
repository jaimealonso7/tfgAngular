import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritoItemComponent } from './favorito-item.component';

describe('FavoritoItemComponent', () => {
  let component: FavoritoItemComponent;
  let fixture: ComponentFixture<FavoritoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritoItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
