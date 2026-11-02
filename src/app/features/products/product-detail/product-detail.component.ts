import { Component, Inject, OnInit, Optional, RESPONSE_INIT } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { RecentlyViewedService } from '../../../services/recently-viewed.service';
import { RelatedProductsComponent } from '../related-products/related-products.component';

// Standalone para poder usar hidratación incremental (@defer con hydrate):
// el componente diferido debe importarse directamente aquí, no vía NgModule.
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [RouterLink, CurrencyPipe, DecimalPipe, RelatedProductsComponent]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private recentlyViewedService: RecentlyViewedService,
    private title: Title,
    private meta: Meta,
    // Solo existe durante el render en servidor: permite fijar el status HTTP
    // de la respuesta. En el navegador se inyecta null.
    @Optional() @Inject(RESPONSE_INIT) private responseInit: ResponseInit | null
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap(params => this.productService.getProduct(Number(params.get('id')))))
      .subscribe(product => {
        this.product = product;
        this.notFound = !product;

        if (product) {

          // Title y Meta funcionan también en el servidor, así que estas
          // etiquetas quedan escritas en el HTML que leen los buscadores.
          this.title.setTitle(`${product.title} | Tienda`);
          this.meta.updateTag({ name: 'description', content: product.description });
          this.meta.updateTag({ property: 'og:image', content: product.image });
          this.recentlyViewedService.add(product);
        } else {
          this.title.setTitle('Producto no encontrado | Tienda');
          // Evita un "soft 404": la página de error responde con status 404, no 200.
          if (this.responseInit) {
            this.responseInit.status = 404;
          }
        }
      });
  }
}
