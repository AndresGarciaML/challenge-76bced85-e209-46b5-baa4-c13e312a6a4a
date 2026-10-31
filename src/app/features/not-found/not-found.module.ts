import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

// Se renderiza en el servidor con status 404 (ver ruta '**' en app.routes.server.ts).
const routes: Routes = [
  { path: '', component: NotFoundComponent, title: 'Página no encontrada | Tienda' }
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NotFoundModule {}
