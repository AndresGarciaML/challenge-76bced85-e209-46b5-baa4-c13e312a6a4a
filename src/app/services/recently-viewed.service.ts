import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Product } from '../models/product.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RecentlyViewedService {

  private _platformId = inject(PLATFORM_ID);

  getAll(): Product[] {
    if (isPlatformBrowser(this._platformId)) {
      const productsViewedString = localStorage.getItem('productsViewed');
      if (productsViewedString) {
        return JSON.parse(productsViewedString);
      }
    }
   
    return [];
  }

  add(product: Product): void {
    if (isPlatformBrowser(this._platformId)) {
      let productsViewed: Product[] = this.getAll();
      productsViewed.push(product);
      localStorage.setItem('productsViewed', JSON.stringify(productsViewed));
    }
  }
}
