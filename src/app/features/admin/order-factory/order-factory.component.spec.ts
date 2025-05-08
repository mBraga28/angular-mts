import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFactoryComponent } from './order-factory.component';

describe('OrderFactoryComponent', () => {
  let component: OrderFactoryComponent;
  let fixture: ComponentFixture<OrderFactoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderFactoryComponent]
    });
    fixture = TestBed.createComponent(OrderFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
