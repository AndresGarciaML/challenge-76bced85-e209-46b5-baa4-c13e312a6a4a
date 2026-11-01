import { inject } from '@angular/core';
import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { ProductService } from './services/product.service';
import { firstValueFrom } from 'rxjs';

/**
 * Estrategia de renderizado por ruta (hybrid rendering).
 *
 * El servidor empareja cada URL con estos patrones, que deben corresponder a
 * las rutas del cliente (app-routing.module.ts y las de cada módulo):
 *
 * - Prerender: el HTML se genera una sola vez en `ng build` y se sirve como
 *   archivo estático. Ideal para la landing, cuyo contenido no depende de
 *   datos que cambien entre peticiones.
 * - Server: el HTML se genera en cada petición con datos frescos de la API.
 *   Lo usan el catálogo y el detalle, porque precio y stock pueden cambiar y
 *   las páginas deben ser indexables (SEO).
 * - Client: el servidor devuelve el shell vacío y todo se pinta en el navegador.
 *   Aquí no se usa, pero sería la opción para áreas privadas como un carrito.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'products', renderMode: RenderMode.Server },
    {
    path: 'products/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Server, // ids no listados -> SSR en cada petición
    async getPrerenderParams() {
      // inject() debe llamarse antes del primer await
      const productService = inject(ProductService);
      const products = await firstValueFrom(productService.getProducts());
      return products.slice(0, 5).map(p => ({ id: String(p.id) }));
    }
  },
  { path: 'cart', renderMode: RenderMode.Client },
  // Rutas desconocidas: NotFoundModule renderizado en servidor con status 404.
  { path: '**', renderMode: RenderMode.Server, status: 404 }
];
