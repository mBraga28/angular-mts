import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISales } from '../interfaces/sales';
import { environment } from 'src/environments/environment.production';
import { OrderService } from './order.service';

@Injectable({ providedIn: 'root' })
export class SalesService {

  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient,
              private orderService: OrderService
  ) {}

  getStatistics() {
    return this.http.get<ISales>(`${this.apiUrl}/orders/sales-statistics`);
  }

  getStatisticsFromOrders(): Observable<ISales> {
    return this.orderService.getOrders().pipe(
      map(orders => {
        const totalSales = orders.length;
        const totalRevenue = orders.reduce(
          (sum, order) =>
            sum +
            order.items.reduce(
              (itemSum, item) => itemSum + item.price * item.quantity,
              0
            ),
          0
        );
        const productSales: { [productId: string]: number } = {};
        orders.forEach(order => {
          order.items.forEach(item => {
            productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity;
          });
        });
        const productIdSales: { [id: string]: number } = Object.entries(productSales)
          .sort(([, a], [, b]) => b - a)
          .reduce((acc: { [id: string]: number }, [id, sales]) => {
            acc[id] = sales;
            return acc;
          }, {});
        return { totalSales, totalRevenue, productSales, productIdSales };
      })
    );
  }

  // listAll(): Observable<ISales[]> {
  //   return this.http.get<ISales[]>(this.apiUrl);
  // }

  // findById(id: number): Observable<ISales> {
  //   return this.http.get<ISales>(`${this.apiUrl}/${id}`);
  // }

  // cancelSale(id: number): Observable<ISales> {
  //   return this.http.put<ISales>(`${this.apiUrl}/${id}/cancel`, {});
  // }
}
