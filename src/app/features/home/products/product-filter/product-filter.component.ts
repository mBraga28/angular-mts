import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/core/interfaces/categories';
import { IProduct } from 'src/app/core/interfaces/products';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<{ id?: number; searchText?: string }>();

  categories: ICategory[] = [];
  products: IProduct[] = [];
  selectedCategory: number | null = null;
  selectedCategoryName: string | null = null;
  selectedPriceOrder: string = '';
  selectedAlphaOrder: string = '';
  selectedBestSeller: string = '';
  searchText: string = '';

  @Output() searchClicked = new EventEmitter<void>(); // Event emitter to notify parent component when search is clicked

  constructor(private productService: ProductsService,
              private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute
            ) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  filterProductsByCategory(): void {

      const selected = this.categories.find(cat => cat.id === this.selectedCategory);

      this.router.navigate(['/products'], {
        queryParams: {
          ...(this.selectedCategory !== null ? { id: this.selectedCategory } : {}),
          ...(selected?.nameCategory ? { nameCategory: selected.nameCategory } : {}),
          ...(this.searchText ? { nameProduct: this.searchText } : {}),
          ...(this.selectedPriceOrder ? { priceOrder: this.selectedPriceOrder } : {}),
          ...(this.selectedAlphaOrder ? { alphaOrder: this.selectedAlphaOrder } : {}),
          ...(this.selectedBestSeller ? { bestSeller: this.selectedBestSeller } : {})
        },
        queryParamsHandling: 'merge'
      });
      this.searchClicked.emit();
  }
}
