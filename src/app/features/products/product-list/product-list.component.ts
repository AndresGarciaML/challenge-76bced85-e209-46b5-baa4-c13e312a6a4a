import { afterNextRender, Component, OnInit, Signal, signal } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { RecentlyViewedService } from '../../../services/recently-viewed.service';
import { delay, timeout } from 'rxjs';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    standalone: false
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  recentlyViewed: Signal<Product[]> = signal([]);
  loadError: boolean = false;

  constructor(private productService: ProductService, private recentlyViewedService: RecentlyViewedService) {
    afterNextRender(() => {
      this.recentlyViewed = signal(this.recentlyViewedService.getAll());
    })
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loadError = false;
    this.productService.getProducts()
    .pipe(delay(0), timeout(1500))
    .subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        this.loadError = true;
        this.products = [];
      }
    });
  }

  trackById(_index: number, product: Product): number {
    return product.id;
  }
}
