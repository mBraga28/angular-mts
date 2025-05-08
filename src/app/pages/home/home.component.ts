import { Component } from '@angular/core';
import { IProduct } from 'src/app/core/interfaces/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products: IProduct[] | undefined;

  limit: number = 6;

  constructor() { }

  /**
   * Initializes the component, setting the products to the first 6 products
   * from the products array.
   */
  ngOnInit(): void {
    this.products = this.products?.slice(0, this.limit) as IProduct[];
  }
}
