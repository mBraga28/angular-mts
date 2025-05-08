import { NgModule } from '@angular/core';
import { NotFoundComponent } from '../not-found/not-found.component';
import { HomeComponent } from './home.component';
import { SectionHomeComponent } from './section-home/section-home.component';
import { RouterModule, Routes } from '@angular/router';

const routesHome: Routes = [
  {path: '', component: HomeComponent, children: [
    { path: '', component: SectionHomeComponent },
    { path: 'products', loadChildren: () => import('../../features/home/products/products.module').then(m => m.ProductsModule) },
    { path: 'cart', loadChildren: () => import('../../features/home/cart/cart.module').then(m => m.CartModule) },
    { path: 'contact', loadChildren: () => import('../../features/home/contact/contact.module').then(m => m.ContactModule) },
  ] }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesHome)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
