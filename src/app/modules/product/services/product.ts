import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const base_url = "http://localhost:8080/api/v1";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const endpoint = `${base_url}/products`;
    return this.http.get(endpoint);
  }

  saveProduct(data: FormData): Observable<any> {
    const endpoint = `${base_url}/products`;
    return this.http.post(endpoint, data);
  }

  updateProduct(data: FormData, id: number): Observable<any> {
    const endpoint = `${base_url}/products/${id}`;
    return this.http.put(endpoint, data);
  }

  deleteProduct(id: number): Observable<any> {
    const endpoint = `${base_url}/products/${id}`;
    return this.http.delete(endpoint);
  }

  getProductById(id: number): Observable<any> {
    const endpoint = `${base_url}/products/${id}`;
    return this.http.get(endpoint);
  }
}
