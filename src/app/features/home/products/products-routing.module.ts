import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { DetailsProductComponent } from './product-details/products-details.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path:':id', component: DetailsProductComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
