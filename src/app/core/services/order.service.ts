import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.production';
import { IOrder } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.API_URL; // Get the API URL from environment.ts

  constructor(private http: HttpClient) {} // Inject HttpClient

  createOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(`${this.apiUrl}/orders`, order);
  }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.apiUrl}/orders`);
  }

  getOrderById(orderId: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.apiUrl}/${orderId}`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<IOrder> {
    return this.http.put<IOrder>(`${this.apiUrl}/orders/${orderId}/status`, {
      id: orderId,
      status: status
    });
  }

  updateProductStock(productId: number, quantity: number): Observable<IOrder> {
    return this.http.put<IOrder>(`${this.apiUrl}/orders/${productId}/stock`, {
      id: productId,
      quantity: quantity
    });
  }

  getFilteredOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.apiUrl}/orders/filtered`);
  }
}
