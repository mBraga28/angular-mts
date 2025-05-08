import { NgModule } from '@angular/core';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren:() => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'admin', loadChildren:() => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  // { path: "**", component: NotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true // <-- adicione esta linha para debug
    })
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
