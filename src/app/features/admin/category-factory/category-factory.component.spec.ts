import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFactoryComponent } from './category-factory.component';

describe('CategoryFactoryComponent', () => {
  let component: CategoryFactoryComponent;
  let fixture: ComponentFixture<CategoryFactoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryFactoryComponent]
    });
    fixture = TestBed.createComponent(CategoryFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
