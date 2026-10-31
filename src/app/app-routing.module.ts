import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Rutas del cliente: cada funcionalidad es un módulo cargado de forma diferida.
// La estrategia de renderizado de cada ruta NO se define aquí, sino en
// app.routes.server.ts, que el servidor empareja con estas mismas rutas.
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule)
  },
  // Cualquier URL desconocida muestra la página 404 en lugar de redirigir a la
  // landing: así el usuario sabe que la dirección no existe y el servidor
  // puede responder con status 404 (evita un "soft 404" para los buscadores).
  {
    path: '**',
    loadChildren: () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
