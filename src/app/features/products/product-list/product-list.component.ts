import { afterNextRender, Component, OnInit, Signal, signal } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { RecentlyViewedService } from '../../../services/recently-viewed.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    standalone: false
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  recentlyViewed: Signal<Product[]> = signal([]);

  constructor(private productService: ProductService, private recentlyViewedService: RecentlyViewedService) {
    afterNextRender(() => {
      this.recentlyViewed = signal(this.recentlyViewedService.getAll());
    })
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  trackById(_index: number, product: Product): number {
    return product.id;
  }
}
