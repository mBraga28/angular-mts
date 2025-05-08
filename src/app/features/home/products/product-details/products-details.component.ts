import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { IProduct, IProductCart } from 'src/app/core/interfaces/products';
import { ProductsService } from 'src/app/core/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class DetailsProductComponent implements OnInit {
  product: IProduct | any;
  quantity = 1;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productId = Number(routeParams.get("id"));
    this.productsService.getOne(productId).subscribe(product => {
      this.product = product;
    });
  }

  addToCart() {
    this.notificationService.notify("The product has been added to the cart!");
    const product: IProductCart = {
      ...this.product!,
      quantity: this.quantity
    };
    this.cartService.addToCart(product);
  }

  getImageUrl(image: string): string {
    return this.productsService.getImageUrl(image);
  }

}
