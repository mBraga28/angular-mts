import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.production';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  nameProduct = "";
  private apiUrl = `${environment.API_URL}/products`;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  search() {
    if (this.nameProduct) {
      this.http.get(this.apiUrl, { params: { nameProduct: this.nameProduct } })
        .subscribe({
            next: (response: any) => {
              // Handle the response from the backend
              console.log(response);
              // Navigate to the products page with the search results
              this.router.navigate(["products"], { queryParams: { nameProduct: this.nameProduct }});
            },
            error: (error) => {
              // Handle any errors
              console.error(error);
            }}
        );
      return;
    }

    this.router.navigate(["products"]);
  }
}
