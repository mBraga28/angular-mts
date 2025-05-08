import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { ProductFactoryComponent } from 'src/app/features/admin/product-factory/product-factory.component';
import { CategoryFactoryComponent } from 'src/app/features/admin/category-factory/category-factory.component';
import { OrderFactoryComponent } from 'src/app/features/admin/order-factory/order-factory.component';
import { SalesListComponent } from 'src/app/features/admin/sales-list/sales-list.component';

const routesAdmin: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'products/products-list',
        component: ProductFactoryComponent
      },
      {
        path: 'categories/categories-list',
        component: CategoryFactoryComponent
      },
      {
        path: 'orders/orders-list',
        component: OrderFactoryComponent
      },
      {
        path: 'sales/sales-list',
        component: SalesListComponent
      }
    ]
  }
];

@NgModule({

  imports: [CommonModule, RouterModule.forChild(routesAdmin)],
  exports: [RouterModule],
  declarations: []
})
export class AdminRoutingModule { }
