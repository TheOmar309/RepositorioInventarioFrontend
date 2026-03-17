import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // 1. Inyectamos el HttpClient de forma moderna
  private readonly http = inject(HttpClient);

  // 2. Definimos la URL base usando el environment
  private readonly API_URL = `${environment.apiUrl}/categories`;

  constructor() {}

  // 3. Método para obtener todas las categorías
  getCategories(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  // 4. Método para buscar por ID (opcional)
  getCategoryById(id: number): Observable<any> {
  return this.http.get<any>(`${this.API_URL}/${id}`);
}

  // 5. Método para guardar (POST)
  saveCategory(category: any): Observable<any> {
    return this.http.post<any>(this.API_URL, category);
  }
}
