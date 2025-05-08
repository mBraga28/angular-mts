import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFactoryComponent } from './product-factory.component';

describe('ProductFactoryComponent', () => {
  let component: ProductFactoryComponent;
  let fixture: ComponentFixture<ProductFactoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFactoryComponent]
    });
    fixture = TestBed.createComponent(ProductFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
