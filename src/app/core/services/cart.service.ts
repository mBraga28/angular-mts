import { Injectable } from '@angular/core';
import { IProductCart } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itens: IProductCart[] = [];

  constructor() { }

  getCart() {
    this.itens =  JSON.parse(localStorage.getItem("cart") || "[]");
    return this.itens;
  }
  addToCart(product: IProductCart) {
    const existingProduct = this.findProductInCartService(product.id);

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      this.itens.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(this.itens));
  }

  removeProductCart(productId: number) {
    const product = this.findProductInCartService(productId);

    if (product) {
      if (product.quantity > 1) {
        product.quantity -= 1;
        this.updateProductInCart(product);
      } else {
        this.itens = this.itens.filter(item => item.id !== productId);
      }
    }
    localStorage.setItem("cart", JSON.stringify(this.itens));
  }
  removeIdProductCart(productId: number) {
    const product = this.findProductInCartService(productId);

    if (product) {
      this.itens = this.itens.filter(item => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(this.itens));
    }
  }


  cleanCart() {
    this.itens = [];
    localStorage.clear();
  }

  findProductInCartService(productId: number): IProductCart | undefined {
    return this.itens.find(item => item.id === productId);
  }

  updateProductInCart(product: IProductCart): void {
    const index = this.itens.findIndex(item => item.id === product.id);

    if (index !== -1) {
      this.itens[index] = product;
      localStorage.setItem("cart", JSON.stringify(this.itens));
    }
  }
}
