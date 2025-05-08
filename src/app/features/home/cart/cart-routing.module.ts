import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: CartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
