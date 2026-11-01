import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    // Desde Angular 21 las apps son zoneless por defecto. Los componentes
    // asignan datos dentro de subscribe() sin signals, así que necesitan
    // Zone.js para detectar cambios. Se declara aquí, y no en main.ts, para
    // que aplique también al servidor: sin ello el SSR serializa el HTML
    // antes de pintar los productos.
    provideZoneChangeDetection(),
    // Sustituye a HttpClientModule. withFetch() hace que HttpClient use la
    // API fetch, disponible tanto en el navegador como en Node.js; es lo que
    // Angular recomienda con SSR (sin ella muestra un aviso en el servidor).
    provideHttpClient(withFetch()),
    // Hidratación: el navegador reutiliza el DOM que ya llegó renderizado
    // desde el servidor en lugar de destruirlo y volver a pintarlo (evita
    // parpadeos). También activa la caché de transferencia HTTP: cada GET que
    // se hace en el servidor viaja serializado en el HTML (<script id="ng-state">)
    // y, al hidratar, HttpClient lo lee de ahí en lugar de repetir la petición.
    // Así la carga inicial solo pide datos a la API desde el servidor.
    // No usar withNoHttpTransferCache(): obligaría al navegador a repetir
    // todas las peticiones que ya hizo el servidor.
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
