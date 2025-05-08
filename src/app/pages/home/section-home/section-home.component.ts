import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/core/interfaces/categories';
import { IProduct } from 'src/app/core/interfaces/products';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-section-home',
  templateUrl: './section-home.component.html',
  styleUrls: ['./section-home.component.css']
})
export class SectionHomeComponent {

  products: IProduct[] | any;
  categories: ICategory[] | any;

  limit: number = 6;

  currentSlide: number = 0;

  constructor(
      private productsService: ProductsService,
      private categoriesService: CategoryService,
      private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
      this.productsService.getAll().subscribe((products: IProduct[]) => {
        this.route.queryParamMap.subscribe(params => {
          const nameProduct = params.get("nameProduct")?.toLowerCase();

          if (nameProduct) {
            this.products = products.filter(product => product.nameProduct.toLowerCase().includes(nameProduct));
          } else {
            this.products = products.slice(0, this.limit);
          }
        });
      });
      this.categoriesService.getAll().subscribe((categories: ICategory[]) => {
        this.route.queryParamMap.subscribe(params => {
          const id = params.get("id")?.includes("nameCategory") ? params.get("id")?.split("=")[1] : null;
          if (id) {
            this.categoriesService.getById(+id).subscribe((category: ICategory) => {
              this.categories = [category];
            });
          }
        });
        this.categories = categories;
      });
    }

    getImageUrl(image: string): string {
      return this.productsService.getImageUrl(image);
    }
}
