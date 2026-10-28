import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

/**
 * Módulo raíz para la versión de servidor (SSR).
 *
 * Reutiliza todo AppModule (componentes, servicios y providers) para que el
 * servidor renderice exactamente la misma aplicación que el navegador, y le
 * añade ServerModule, que sustituye las APIs del navegador (DOM, HTTP,
 * location) por implementaciones que funcionan en Node.js.
 *
 * Solo lo usa el bundle de servidor (vía src/main.server.ts); el navegador
 * sigue arrancando con AppModule desde src/main.ts.
 */
@NgModule({
  imports: [
    AppModule,
    ServerModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
