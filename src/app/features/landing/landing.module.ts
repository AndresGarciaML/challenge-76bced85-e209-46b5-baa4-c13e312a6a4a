import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing.component';

// Se prerenderiza en build (RenderMode.Prerender en app.routes.server.ts).
const routes: Routes = [
  { path: '', component: LandingComponent }
];

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LandingModule {}
