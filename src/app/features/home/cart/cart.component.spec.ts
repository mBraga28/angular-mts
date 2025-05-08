import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoComponent } from './cart.component';

describe('CarrinhoComponent', () => {
  let component: CarrinhoComponent;
  let fixture: ComponentFixture<CarrinhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarrinhoComponent]
    });
    fixture = TestBed.createComponent(CarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
