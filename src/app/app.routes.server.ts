import { RenderMode, ServerRoute } from '@angular/ssr';

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
  { path: 'products/:id', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server }
];
