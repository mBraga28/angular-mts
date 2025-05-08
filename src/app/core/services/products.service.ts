import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/products';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.production';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: IProduct[] | any;

  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAll(): Observable<IProduct[]>  {
    const url = `${this.apiUrl}/products`;
    return this.http.get<IProduct[]>(url);
  }

  getOne(productId: number): Observable<IProduct>  {
    const url = `${this.apiUrl}/products/${productId}`;
    return this.http.get<IProduct>(url);
  }

  createProduct(formData: FormData): Observable<IProduct> {
    const url = `${this.apiUrl}/products`;
    return this.http.post<IProduct>(url, formData);
  }

  updateProduct(productId: number, formData: FormData): Observable<IProduct> {
    const url = `${this.apiUrl}/products/${productId}`;
    return this.http.put<IProduct>(url, formData);
  }

  deleteProduct( productId: number ): Observable<IProduct>  {
    const url = `${this.apiUrl}/products/${productId}`;
    return this.http.delete<IProduct>(url);
  }

  getImageUrl(image: string): string {

    return image;
  }

}
