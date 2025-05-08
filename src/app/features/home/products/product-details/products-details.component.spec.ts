import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProductComponent } from './products-details.component';

describe('DetalhesProdutoComponent', () => {
  let component: DetailsProductComponent;
  let fixture: ComponentFixture<DetailsProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsProductComponent]
    });
    fixture = TestBed.createComponent(DetailsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
