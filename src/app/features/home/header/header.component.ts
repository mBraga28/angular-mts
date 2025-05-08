import { Component, HostListener } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from 'src/app/shared/search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    public cartService: CartService
  ) {}

  isSmallScreen = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.isSmallScreen = (event.target as Window).innerWidth <= 430;
  }
}
