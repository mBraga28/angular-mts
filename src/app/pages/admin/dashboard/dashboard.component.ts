import { Component } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { SalesService } from 'src/app/core/services/sales.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  totalProducts = 0;
  totalCategories = 0;
  totalOrders = 0;
  totalSales = 0;

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private ordersService: OrderService,
    private salesService: SalesService
  ) {}

  ngOnInit(): void {
    this.productsService.getAll().subscribe(products => this.totalProducts = products.length);
    this.categoryService.getAll().subscribe(categories => this.totalCategories = categories.length);
    this.ordersService.getOrders().subscribe(orders => this.totalOrders = orders.length);
    this.salesService.getStatistics().subscribe(sales => this.totalSales = sales.totalSales);
  }
}
