import { Component } from '@angular/core';
import { SalesService } from 'src/app/core/services/sales.service';
import { ISales } from 'src/app/core/interfaces/sales';
import { IOrder } from 'src/app/core/interfaces/order';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent {
  salesStats?: ISales;      // Agregated sales statistics
  salesList: IOrder[] = [];  // Individual sales list

  // Index of the expanded row, -1 means no row is expanded
  expandedIndex: Number = -1;

  constructor(
              private salesService: SalesService,
              private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.salesService.getStatistics().subscribe({
      next: data => this.salesStats = data,
      error: err => console.error(err)
    });
    this.orderService.getFilteredOrders().subscribe({
      next: data => this.salesList = data,
      error: err => console.error(err)
    });
  }

   // Toggle the expanded row
   toggleRow(index: number, event: MouseEvent): void {
    // Prevent toggling when clicking on checkboxes or buttons
    if ((event.target as HTMLElement).closest('input[type="checkbox"]') ||
        (event.target as HTMLElement).closest('button')) {
      return;
    }

    if (this.expandedIndex === index) {
      // If clicking on the already expanded row, collapse it
      this.expandedIndex = -1;
    } else {
      // Otherwise, expand the clicked row
      this.expandedIndex = index;
    }
  }

  // Get the total price of the order
  // This function calculates the total price of an order by summing up the price of each item multiplied by its quantity
  getOrderTotal(order: IOrder): number {
    return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
