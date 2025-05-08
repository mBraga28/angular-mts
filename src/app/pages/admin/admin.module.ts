import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from 'src/app/shared/side-bar/side-bar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ToolBarComponent } from 'src/app/features/admin/tool-bar/tool-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFactoryComponent } from 'src/app/features/admin/product-factory/product-factory.component';
import { CategoryFactoryComponent } from 'src/app/features/admin/category-factory/category-factory.component';
import { OrderFactoryComponent } from 'src/app/features/admin/order-factory/order-factory.component';
import { SalesListComponent } from '../../features/admin/sales-list/sales-list.component';



@NgModule({
  declarations: [
    AdminComponent,
    ToolBarComponent,
    SideBarComponent,
    DashboardComponent,
    ProductFactoryComponent,
    CategoryFactoryComponent,
    OrderFactoryComponent,
    SalesListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
