import { NgModule } from '@angular/core';
import { ContactComponent } from './contact.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: ContactComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
