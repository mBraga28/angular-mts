import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.production';
import { ICategory } from '../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.API_URL; // Get the API URL from environment.ts

  constructor(private http: HttpClient) {} // Inject HttpClient

  getAll() {
    const url = `${this.apiUrl}/categories`; // Construct the API endpoint
    return this.http.get<ICategory[]>(url); // Make an HTTP GET request
  }

  getById(id: number) {
    const url = `${this.apiUrl}/categories?id=${id}`; // Construct the API endpoint
    return this.http.get<ICategory>(url); // Make an HTTP GET request
  }

  getByName(id : number, name: string) {
    const url = `${this.apiUrl}/categories/${id}/name${name}`; // Construct the API endpoint
    return this.http.get<ICategory[]>(url); // Make an HTTP GET request
  }

  createCategory(formData: FormData) {
    const url = `${this.apiUrl}/categories`; // Construct the API endpoint
    return this.http.post<ICategory>(url, formData); // Make an HTTP POST request
  }

  updateCategory(categoryId: number, formData: FormData) {
    const url = `${this.apiUrl}/categories/${categoryId}`; // Construct the API endpoint
    return this.http.put<ICategory>(url, formData); // Make an HTTP PUT request
  }

  deleteCategory(id: number) {
    const url = `${this.apiUrl}/categories/${id}`; // Construct the API endpoint
    return this.http.delete(url); // Make an HTTP DELETE request
  }
}
