import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { IOrder } from 'src/app/core/interfaces/order';
import { IProduct } from 'src/app/core/interfaces/products';

@Component({
  selector: 'app-order-factory',
  templateUrl: './order-factory.component.html',
  styleUrls: ['./order-factory.component.css']
})
export class OrderFactoryComponent implements OnInit {
  selectedStatus: string = '';
  selectedPeriod: string = '';
  orders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  products: IProduct[] = [];
  statuses = ['WAITING_PAYMENT', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELED'];

  statusLabels: { [key: string]: string } = {
    WAITING_PAYMENT: 'Waiting Payment',
    PAID: 'Paid',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELED: 'Canceled'
  };

  modalOrder: IOrder | null = null;
  modalStatus: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      this.filterOrders();
    });
  }

  filterOrders() {
    this.filteredOrders = this.orders
      .filter(order => !this.selectedStatus || order.status === this.selectedStatus)
      .filter(order => this.filterByPeriod(order));
  }

  filterByPeriod(order: IOrder): boolean {
    if (!this.selectedPeriod) return true;
    const orderDate = new Date(order.moment);
    const now = new Date();

    switch (this.selectedPeriod) {
      case 'this week': {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0,0,0,0);
        return orderDate >= startOfWeek;
      }
      case 'this month': {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return orderDate >= startOfMonth;
      }
      case 'last 3 months': {
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        return orderDate >= threeMonthsAgo;
      }
      case 'last 6 months': {
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        return orderDate >= sixMonthsAgo;
      }
      case 'this year': {
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        return orderDate >= startOfYear;
      }
      default:
        return true;
    }
  }

  getOrderTotal(order: IOrder): number {
    return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  updateStatus(order: IOrder, newStatus: string) {
    this.orderService.updateOrderStatus(order.id, newStatus).subscribe(() => {
      order.status = newStatus;
      if (order.status === 'CANCELED') {
        order.items.forEach(item => {
          const product = this.products.find(p => p.id === item.productId);
          if (product) {
            product.stock += item.quantity;
          }
        }
        );
        this.orderService.updateProductStock( order.id ,order.items.map(item => item.quantity).reduce((total, quantity) => total + quantity, 0)).subscribe(() => {
          this.loadOrders();
        }
        );
      }
    });
  }

  openStatusModal(order: IOrder) {
    this.modalOrder = order;
    this.modalStatus = order.status;
  }

  closeStatusModal() {
    this.modalOrder = null;
  }

  confirmStatusUpdate() {
    if (this.modalOrder && this.modalStatus) {
      this.updateStatus(this.modalOrder, this.modalStatus);
      this.closeStatusModal();
    }
  }
}
