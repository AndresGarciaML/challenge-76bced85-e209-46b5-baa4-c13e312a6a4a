import { Component } from '@angular/core';

interface RenderStrategy {
  route: string;
  page: string;
  mode: string;
  description: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  standalone: false
})
export class LandingComponent {
  // Contenido estático a propósito: la landing se prerenderiza una sola vez en
  // `ng build`, así que no debe depender de datos que cambien entre peticiones.
  readonly strategies: RenderStrategy[] = [
    {
      route: '/',
      page: 'Landing',
      mode: 'Prerender',
      description: 'HTML generado en el build y servido como archivo estático. Respuesta inmediata y coste de servidor casi nulo.'
    },
    {
      route: '/products',
      page: 'Catálogo',
      mode: 'SSR',
      description: 'Se renderiza en cada petición con los productos actuales de la API, listo para buscadores.'
    },
    {
      route: '/products/:id',
      page: 'Detalle',
      mode: 'SSR',
      description: 'Cada ficha llega con su título y descripción en el HTML, y responde 404 si el producto no existe.'
    }
  ];
}
