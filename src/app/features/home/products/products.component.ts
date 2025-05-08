import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/core/interfaces/categories';
import { IProduct } from 'src/app/core/interfaces/products';
import { ISales } from 'src/app/core/interfaces/sales';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { SalesService } from 'src/app/core/services/sales.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: IProduct[] | any;
  selectedCategory: number | any;
  selectedCategoryName: string | any;
  showFilterModal = false;

  constructor(
    private productsService: ProductsService,
    private salesService: SalesService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.productsService.getAll().subscribe((products: IProduct[]) => {
      this.salesService.getStatisticsFromOrders().subscribe((sales: ISales) => {
        this.route.queryParamMap.subscribe(params => {
          const nameProduct = params.get("nameProduct")?.toLowerCase();
          const categoryIdParam = params.get("id");
          const nameCategory = params.get("nameCategory");
          const priceOrder = params.get("priceOrder");
          const alphaOrder = params.get("alphaOrder");
          const bestSeller = params.get("bestSeller");
          this.selectedCategoryName = nameCategory ? nameCategory : null;
          this.selectedCategory = categoryIdParam ? +categoryIdParam : null;


          let filteredProducts = products;

          if (nameProduct) {
            filteredProducts = filteredProducts.filter(product =>
              product.nameProduct.toLowerCase().includes(nameProduct)
            );
          }

          if (this.selectedCategory) {
            filteredProducts = filteredProducts.filter(product =>
              product.categories
              && product.categories.some(category => category.id === this.selectedCategory)
            );
          }

          if (this.selectedCategoryName) {
            filteredProducts = filteredProducts.filter(product =>
              product.categories
              && product.categories.some(category => category.nameCategory === this.selectedCategoryName)
            );
          }

          // Best seller filter
          if (bestSeller === 'bestseller') {
            filteredProducts = filteredProducts.slice().sort((a, b) => {
              const salesA = sales.productIdSales[a.id] || 0;
              const salesB = sales.productIdSales[b.id] || 0;
              return salesB - salesA;
            });
          }


          // Alphabetical order filter
          // 'az' for ascending, 'za' for descending
          if (alphaOrder === 'az') {
            filteredProducts = filteredProducts.slice().sort((a, b) =>
              a.nameProduct.localeCompare(b.nameProduct)
            );
          } else if (alphaOrder === 'za') {
            filteredProducts = filteredProducts.slice().sort((a, b) =>
              b.nameProduct.localeCompare(a.nameProduct)
            );
          }

          // Filtro de preço
          if (priceOrder === 'asc') {
            filteredProducts = filteredProducts.slice().sort((a, b) => a.price - b.price);
          } else if (priceOrder === 'desc') {
            filteredProducts = filteredProducts.slice().sort((a, b) => b.price - a.price);
          }

          this.products = filteredProducts;
        });
      });
    });
  }

  getImageUrl(image: string): string {
    return this.productsService.getImageUrl(image);
  }
}
