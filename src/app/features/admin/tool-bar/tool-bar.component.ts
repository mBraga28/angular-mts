import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  isSidebarOpen = false;
  isAppsDropdownOpen = false;
  isNotificationsDropdownOpen = false;
  isUserDropdownOpen = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    // Adicionar evento de clique fora do dropdown
    // document.addEventListener('click', this.closeAllDropdowns.bind(this));
    this.sidebarService.isOpen$.subscribe(open => this.isSidebarOpen = open);
    document.addEventListener('click', (event: MouseEvent) => {
      // Verificar se o clique foi fora dos botões de toggle
      const target = event.target as HTMLElement;
      if (!target.closest('button[type="button"]')) {
        this.closeAllDropdowns();
      }
    });
  }

  toggleSidebar() {
    // this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarService.toggle();
  }

  toggleAppsDropdown(event: Event) {
    event.stopPropagation();
    this.isAppsDropdownOpen = !this.isAppsDropdownOpen;
    // Fechar outros dropdowns quando este for aberto
    if (this.isAppsDropdownOpen) {
      this.isNotificationsDropdownOpen = false;
      this.isUserDropdownOpen = false;
    }
  }

  toggleNotificationsDropdown(event: Event) {
    event.stopPropagation();
    this.isNotificationsDropdownOpen = !this.isNotificationsDropdownOpen;
    // Fechar outros dropdowns quando este for aberto
    if (this.isNotificationsDropdownOpen) {
      this.isAppsDropdownOpen = false;
      this.isUserDropdownOpen = false;
    }
  }

  toggleUserDropdown(event: Event) {
    event.stopPropagation();
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
    // Fechar outros dropdowns quando este for aberto
    if (this.isUserDropdownOpen) {
      this.isAppsDropdownOpen = false;
      this.isNotificationsDropdownOpen = false;
    }
  }

  // Método para fechar todos os dropdowns quando clicar fora deles
  // Este método pode ser chamado através de um evento (click) no documento
  closeAllDropdowns() {
    this.isAppsDropdownOpen = false;
    this.isNotificationsDropdownOpen = false;
    this.isUserDropdownOpen = false;
  }
}
