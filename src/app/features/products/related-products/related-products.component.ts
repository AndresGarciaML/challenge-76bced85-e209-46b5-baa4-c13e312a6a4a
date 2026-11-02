import { Component, OnInit, input, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { delay, map } from 'rxjs/operators';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css'],
  imports: [CurrencyPipe, RouterLink]
})
export class RelatedProductsComponent implements OnInit {
  category = input.required<string>();
  excludeId = input<number>();

  products = signal<Product[] | null>(null);

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts()
      .pipe(
        map(products => products
          .filter(p => p.category === this.category() && p.id !== this.excludeId())
          .slice(0, 4)),
        // Simula una API lenta. Sin @defer, el SSR espera estos 2 s antes de
        // enviar el HTML, porque la página no es "estable" hasta que termina.
      )
      .subscribe(products => this.products.set(products));
  }
}
