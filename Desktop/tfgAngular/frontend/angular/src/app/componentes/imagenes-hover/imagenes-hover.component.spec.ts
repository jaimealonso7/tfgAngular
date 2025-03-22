import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesHoverComponent } from './imagenes-hover.component';

describe('ImagenesHoverComponent', () => {
  let component: ImagenesHoverComponent;
  let fixture: ComponentFixture<ImagenesHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagenesHoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenesHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
