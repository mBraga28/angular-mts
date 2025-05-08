import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { DetailsProductComponent } from './product-details/products-details.component';
import { FormsModule } from '@angular/forms';
import { ProductFilterComponent } from './product-filter/product-filter.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductFilterComponent,
    DetailsProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule
  ],
  exports: [
    ProductFilterComponent
  ]
})
export class ProductsModule { }
