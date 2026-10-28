import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
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
