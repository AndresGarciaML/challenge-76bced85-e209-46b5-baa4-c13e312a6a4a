import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RelatedProductsComponent } from './related-products/related-products.component';

// Ambas rutas se renderizan en el servidor en cada petición
// (RenderMode.Server en app.routes.server.ts).
const routes: Routes = [
  { path: '', component: ProductListComponent, title: 'Product List' },
  { path: ':id', component: ProductDetailComponent }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // Los componentes standalone no se declaran: se importan como un módulo.
    RelatedProductsComponent
  ]
})
export class ProductsModule {}
