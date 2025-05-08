import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/core/interfaces/categories';
import { CategoryService } from 'src/app/core/services/category.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-category-factory',
  templateUrl: './category-factory.component.html',
  styleUrls: ['./category-factory.component.css']
})
export class CategoryFactoryComponent implements OnInit {
  categories: ICategory[] = [];
  filteredCategories: ICategory[] = [];
  selectedCategories: ICategory[] = [];
  searchText: string = '';
  expandedIndex: number | null = null;

  showModal = false;
  editMode = false;
  categoryForm: FormGroup;
  editingCategoryId: number | null = null;

  showDeleteModal = false;
  categoryIdToDelete: number | null = null;

  loading = false;

  get totalCategories() {
    return this.categories.length;
  }

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      nameCategory: ['', Validators.required],
      iconClass: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.loading = true;
    this.categoryService.getAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.categories = data;
          this.applyFilters();
        },
        error: () => {
          this.categories = [];
          this.applyFilters();
        }
      });
  }

  applyFilters() {
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      this.filteredCategories = this.categories.filter(cat =>
        cat.nameCategory?.toLowerCase().includes(search)
      );
    } else {
      this.filteredCategories = [...this.categories];
    }
  }

  isSelected(cat: ICategory): boolean {
    return this.selectedCategories.some(c => c.id === cat.id);
  }

  toggleSelect(cat: ICategory) {
    if (this.isSelected(cat)) {
      this.selectedCategories = this.selectedCategories.filter(c => c.id !== cat.id);
    } else {
      this.selectedCategories.push(cat);
    }
  }

  isAllSelected(): boolean {
    return this.filteredCategories.length > 0 &&
      this.filteredCategories.every(cat => this.isSelected(cat));
  }

  toggleSelectAll() {
    if (this.isAllSelected()) {
      this.selectedCategories = this.selectedCategories.filter(
        cat => !this.filteredCategories.some(fc => fc.id === cat.id)
      );
    } else {
      this.selectedCategories = [
        ...this.selectedCategories,
        ...this.filteredCategories.filter(cat => !this.selectedCategories.some(c => c.id === cat.id))
      ];
    }
  }

  toggleRow(index: number, event: Event) {
    if ((event.target as HTMLElement).tagName === 'INPUT' || (event.target as HTMLElement).tagName === 'BUTTON') {
      return;
    }
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  openAddCategoryModal() {
    this.editMode = false;
    this.categoryForm.reset({ iconClass: '' });
    this.showModal = true;
    this.editingCategoryId = null;
  }

  editCategory(cat: ICategory) {
    this.editMode = true;
    this.categoryForm.patchValue({
      ...cat,
      iconClass: cat.iconClass || ''
    });
    this.showModal = true;
    this.editingCategoryId = cat.id ?? null;
  }

  closeModal() {
    this.showModal = false;
    this.categoryForm.reset();
    this.editingCategoryId = null;
  }

  saveCategory() {
    if (this.categoryForm.invalid) return;
    const formValue = this.categoryForm.value;

    // Ensure that iconClass will not null
    if (!formValue.iconClass) {
      formValue.iconClass = '';
    }

    if (this.editMode && this.editingCategoryId !== null) {
      // Edit
      this.categoryService.updateCategory(this.editingCategoryId, formValue).subscribe({
        next: () => {
          this.fetchCategories();
          this.closeModal();
        }
      });
    } else {
      // Add
      this.categoryService.createCategory(formValue).subscribe({
        next: () => {
          this.fetchCategories();
          this.closeModal();
        }
      });
    }
  }

  handleDeleteClick(event: Event, id: number) {
    event.stopPropagation();
    this.categoryIdToDelete = id;
    this.showDeleteModal = true;
  }

  deleteSelectedCategories() {
    this.categoryIdToDelete = null;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.categoryIdToDelete = null;
  }

  confirmDelete() {
    if (this.categoryIdToDelete !== null) {
      this.categoryService.deleteCategory(this.categoryIdToDelete).subscribe({
        next: () => {
          this.selectedCategories = this.selectedCategories.filter(cat => cat.id !== this.categoryIdToDelete);
          this.fetchCategories();
          this.cancelDelete();
        }
      });
    } else {
      // Delete multiple categories
      const idsToDelete = this.selectedCategories.map(cat => cat.id);
      Promise.all(idsToDelete.map(id =>
        this.categoryService.deleteCategory(id!).toPromise()
      )).then(() => {
        this.selectedCategories = [];
        this.fetchCategories();
        this.cancelDelete();
      });
    }
  }
}
