import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { IProductCart } from 'src/app/core/interfaces/products';
import { OrderService } from 'src/app/core/services/order.service';
import { IOrder } from 'src/app/core/interfaces/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  itensCart: IProductCart[] = [];
  total = 0;
  itens: any;

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itensCart = this.cartService.getCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    for (const item of this.itensCart) {
        this.total += item.price * Math.max(0, item.quantity);
    }
  }

  increaseQuantity(productId: number): void {
    if (this.itensCart.length === 0) {
      return;
    }

    const item = this.itensCart.find(item => item.id === productId);
    if (item !== undefined) {
        item.quantity += 1;
        this.cartService.updateProductInCart(item);
        this.calculateTotal();
    }
  }

  removeProductCart(productId: number) {
    if (this.itensCart.length === 0) {
      return;
    }

    const item = this.itensCart.find(item => item.id === productId);
    if (item !== undefined) {
      const quantity = item.quantity;
      if (quantity > 1) {
        item.quantity -= 1;
        this.cartService.updateProductInCart(item);
        this.calculateTotal();
      } else {
        this.itensCart = this.itensCart.filter(item => item.id !== productId);
        this.cartService.removeProductCart(productId);
        this.cartService.cleanCart();
        this.calculateTotal();
      }
    }
  }
  cleanProductCart(productId: number) {
    if (this.itensCart.length === 0) {
      return;
    }

    const index = this.itensCart.findIndex(item => item.id === productId);
    if (index !== -1) {
      this.itensCart.splice(index, 1);
      this.cartService.removeIdProductCart(productId);
      this.calculateTotal();
    }
  }

  clearCart() {
    this.cartService.cleanCart();
    this.itensCart = this.cartService.getCart();
  }


  buy() {
    const orderItems = this.itensCart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const order: IOrder = {
      id: this.generateOrderId(),
      items: orderItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      })),
      moment: new Date(),
      status: "WAITING_PAYMENT"
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        alert("Congratulations, your purchase was successful!");
        this.cartService.cleanCart();
        this.router.navigate([""]);
      },
      error: (error) => {
        console.error("Error creating order:", error);
        alert("An error occurred while processing your purchase. Please try again later.");
      }
    });
  }
  generateOrderId(): number {
    return Math.floor(Math.random() * 1000);
  }

  findProductInCart(productId: number): IProductCart | undefined {
    const itensCart = this.cartService.itens;

    for (const item of itensCart) {
      if (item.id === productId) {
        return item;
      }
    }

    return undefined;
  }

}
