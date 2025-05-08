import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { HeaderComponent } from 'src/app/features/home/header/header.component';
import { SearchBarComponent } from 'src/app/shared/search-bar/search-bar.component';
import { HomeComponent } from './home.component';
import { SectionHomeComponent } from './section-home/section-home.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from 'src/app/features/home/footer/footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    SectionHomeComponent,
    HeaderComponent,
    FooterComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
