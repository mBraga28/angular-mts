import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  isProductsMenuOpen = false;
  isCategoriesMenuOpen = false;
  isOrdersMenuOpen = false;
  isSalesMenuOpen = false;
  resizeListener: any;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.isOpen$.subscribe(open => this.isSidebarOpen = open);

    // FClose the sidebar if the screen is smaller than 850px
    if (window.innerWidth < 850) {
      this.sidebarService.set(false);
    }

    // Listener to close the sidebar on resize
    this.resizeListener = () => {
      if (window.innerWidth < 850) {
        this.sidebarService.set(false);
      } else {
        this.sidebarService.set(true);
      }
    };
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }

  onMenuItemClick() {
    if (window.innerWidth < 850) {
      this.sidebarService.set(false);
    }
  }

  toggleProductsMenu() {
    this.isProductsMenuOpen = !this.isProductsMenuOpen;
  }

  toggleCategoriesMenu() {
    this.isCategoriesMenuOpen = !this.isCategoriesMenuOpen;
  }

  toggleOrdersMenu() {
    this.isOrdersMenuOpen = !this.isOrdersMenuOpen;
  }

  toggleSalesMenu() {
    this.isSalesMenuOpen = !this.isSalesMenuOpen;
  }
}
