import { NgModule } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { serverRoutes } from './app.routes.server';

/**
 * Módulo raíz para la versión de servidor (SSR).
 *
 * Reutiliza todo AppModule (componentes, rutas, servicios y providers) para
 * que el servidor renderice exactamente la misma aplicación que el navegador.
 *
 * provideServerRendering() registra las implementaciones de servidor de las
 * APIs del navegador (DOM, HTTP, location), y withRoutes() le pasa la tabla
 * de rutas de servidor con el modo de renderizado de cada ruta
 * (Prerender / Server / Client).
 *
 * Solo lo usa el bundle de servidor (vía src/main.server.ts); el navegador
 * sigue arrancando con AppModule desde src/main.ts.
 */
@NgModule({
  imports: [AppModule],
  providers: [provideServerRendering(withRoutes(serverRoutes))],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
