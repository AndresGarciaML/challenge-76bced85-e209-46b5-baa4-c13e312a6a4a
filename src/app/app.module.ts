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
    // parpadeos). También activa la caché de transferencia HTTP: la respuesta
    // de la API obtenida en el servidor viaja en el HTML, así que el cliente
    // no vuelve a pedir los productos al arrancar.
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
