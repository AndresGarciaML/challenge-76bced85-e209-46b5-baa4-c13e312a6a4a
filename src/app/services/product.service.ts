import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // La API responde 200 con cuerpo vacío para ids inexistentes, así que
  // normalizamos ese caso (y los errores) a null para que la vista muestre "no encontrado".
  getProduct(id: number): Observable<Product | null> {
    return this.http.get<Product | null>(`${this.apiUrl}/${id}`).pipe(
      map(product => product ?? null),
      catchError(() => of(null))
    );
  }
}
