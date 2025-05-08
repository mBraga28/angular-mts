import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/core/interfaces/categories';
import { IProduct } from 'src/app/core/interfaces/products';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-factory',
  templateUrl: './product-factory.component.html',
  styleUrls: ['./product-factory.component.css']
})
export class ProductFactoryComponent implements OnInit {
  // Index of the expanded row, -1 means no row is expanded
  expandedIndex: Number = -1;

  // Filter variables
  searchTerm: string = '';
  selectedCategory: number | '' = '';

  // Sorting
  sortColumn: String = '';
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Selection
  selectedProducts: IProduct[] = [];

  // Modal controls
  showModal: boolean = false;
  showDeleteModal: boolean = false;
  editMode: boolean = false;
  currentProductId: number | null = null;
  productIdToDelete: number | null = null; // used for delete confirmation


  // Form
  productForm: FormGroup;

  products: IProduct[] = [];
  categories: ICategory[] = [];

  // Product data: image
  selectedFile: File | null = null;

  // Computed properties
  get filteredProducts(): IProduct[] {
    let filtered = [...this.products];

    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter(p =>
        p.nameProduct.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

    //Apply category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(p =>
        p.categories && (p.categories.some(c => c.id === +this.selectedCategory)));
    }

    // Apply sorting
    if (this.sortColumn) {
      filtered.sort((a, b) => {
        const valueA = a[this.sortColumn as keyof IProduct];
        const valueB = b[this.sortColumn as keyof IProduct];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return this.sortDirection === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else {
          // Numeric comparison
          return this.sortDirection === 'asc'
            ? (valueA as number) - (valueB as number)
            : (valueB as number) - (valueA as number);
        }
      });
    }

     // Ordenação
  if (this.sortField) {
    filtered.sort((a, b) => {
      let valueA, valueB;
      if (this.sortField === 'category') {
        valueA = a.categories && a.categories.length ? a.categories[0].nameCategory : '';
        valueB = b.categories && b.categories.length ? b.categories[0].nameCategory : '';
      } else {
        valueA = a[this.sortField as keyof IProduct];
        valueB = b[this.sortField as keyof IProduct];
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      } else {
        const numA = typeof valueA === 'number' ? valueA : 0;
        const numB = typeof valueB === 'number' ? valueB : 0;
        return this.sortDirection === 'asc' ? numA - numB : numB - numA;
      }
    });
  }

    return filtered;
  }

  get totalProducts(): number {
    return this.products.length;
  }

  constructor(
      private fb: FormBuilder,
      private cdr: ChangeDetectorRef,
      private productsService: ProductsService,
      private categoryService: CategoryService) {
    this.productForm = this.fb.group({
      nameProduct: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      priceDescription: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
      imageFile: [''],
      description: [''],
      categories: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productsService.getAll().subscribe(products => {
      this.products = products;
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }



  // Toggle the expanded row
  toggleRow(index: number, event: MouseEvent): void {
    // Prevent toggling when clicking on checkboxes or buttons
    if ((event.target as HTMLElement).closest('input[type="checkbox"]') ||
        (event.target as HTMLElement).closest('button')) {
      return;
    }

    if (this.expandedIndex === index) {
      // If clicking on the already expanded row, collapse it
      this.expandedIndex = -1;
    } else {
      // Otherwise, expand the clicked row
      this.expandedIndex = index;
    }
  }

  // Sorting
  sortBy(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  applySort() {
    this.filteredProducts.sort((a: any, b: any) => {
      let valueA, valueB;
      if (this.sortField === 'category') {
        valueA = a.categories && a.categories.length ? a.categories[0].nameCategory : '';
        valueB = b.categories && b.categories.length ? b.categories[0].nameCategory : '';
      } else {
        valueA = a[this.sortField];
        valueB = b[this.sortField];
      }

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      } else {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
    });
  }

  // Filtering
  applyFilters(): void {
    // The filtering is handled by the filteredProducts getter
    // This method is called when filter dropdowns change
  }

  // Selection methods
  toggleSelect(product: IProduct): void {
    const index = this.selectedProducts.findIndex(p => p.id === product.id);
    if (index === -1) {
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts.splice(index, 1);
    }
  }

  isSelected(product: IProduct): boolean {
    return this.selectedProducts.some(p => p.id === product.id);
  }

  toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this.selectedProducts = [];
    } else {
      this.selectedProducts = [...this.filteredProducts];
    }
  }

  isAllSelected(): boolean {
    return this.filteredProducts.length > 0 &&
           this.selectedProducts.length === this.filteredProducts.length &&
           this.filteredProducts.every(p => this.isSelected(p));
  }

  // CRUD operations
  openAddProductModal(): void {
    this.editMode = false;
    this.currentProductId = null;
    this.productForm.reset({
      // status: 'Active',
      price: 0,
      stock: 0,
      categories: [],
      // sales: 0,
      // purchasePrice: 0
    });
    this.selectedFile = null; // Reset selected file
    this.showModal = true;
    this.cdr.detectChanges(); // Force Angular to update the view immediately
  }

  editProduct(product: IProduct): void {
    this.editMode = true;
    this.currentProductId = product.id;
    this.productForm.patchValue({
      ...product,
      categories: product.categories && product.categories.length > 0 ? product.categories[0].id : ''
    });
    this.selectedFile = null; // Reset selected file
    this.showModal = true;
    this.cdr.detectChanges(); // Force Angular to update the view immediately
  }

  getImageUrl(image: string): string {
    return this.productsService.getImageUrl(image);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      return;
    }

    const formValue = this.productForm.value;
    const productToSave: IProduct = {
      ...formValue,
      id: this.editMode && this.currentProductId ? this.currentProductId : 0,
      categories:  [{ id: +formValue.categories }]
    };

    const formData = new FormData();
      formData.append('product', new Blob(
        [JSON.stringify(productToSave)],
        { type: 'application/json' }));

      if (this.selectedFile) {
        formData.append('imageFile', this.selectedFile);
      }

    if (this.editMode && this.currentProductId) {
      // Update existing product
      this.productsService.updateProduct(this.currentProductId, formData).subscribe({
        next: (response) => {
          console.log('Product created:', response);
          this.loadProducts();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating product:', err);
        }
      });
    } else {
      // Add new product
      this.productsService.createProduct(formData).subscribe({
        next: (response) => {
          console.log('Product created:', response);
          this.loadProducts();
          this.loadCategories();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error creating product:', err);
        }
      });
    }

    this.closeModal();
  }

  handleDeleteClick(event: MouseEvent, productId: number): void {
    event.stopPropagation(); // Guarantee that the click event doesn't trigger row expansion
    this.productIdToDelete = productId;
    this.showDeleteModal = true;
    console.log('Modal de exclusão ativado');
    this.cdr.detectChanges(); // Force Angular to update the view immediately
  }


  deleteSelectedProducts(): void {
    this.productIdToDelete = null;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.productIdToDelete !== null) {
      // delete a single product
      this.products = this.products.filter(p => p.id !== this.productIdToDelete);
    } else {
      // delete multiple products
      // Assuming you have a way to get the selected products
      const selectedIds = this.selectedProducts.map(p => p.id);
      this.products = this.products.filter(p => !selectedIds.includes(p.id));
      this.selectedProducts = [];
    }

    this.productIdToDelete = null;
    this.showDeleteModal = false;
  }


  cancelDelete(): void {
    this.showDeleteModal = false;
    this.productIdToDelete = null;
  }

  closeModal(): void {
    this.showModal = false;
    this.productForm.reset();
  }

  // Summary calculations
  getTotalPurchasePrice(): number {
    return this.products.reduce((sum, product) => sum + (product.price || 0), 0);
  }

  getTotalSellingPrice(): number {
    return this.products.reduce((sum, product) => sum + product.price, 0);
  }
}
