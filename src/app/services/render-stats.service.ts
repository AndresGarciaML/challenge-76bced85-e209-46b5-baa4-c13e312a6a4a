import { Injectable } from '@angular/core';

// ⚠ Vive en el proceso de Node: se comparte entre TODAS las peticiones y usuarios
let totalRenders = 0;

@Injectable({ providedIn: 'root' })
export class RenderStatsService {
  private instanceRenders = 0;               // una instancia nueva por petición
  readonly total = ++totalRenders;
  readonly perInstance = ++this.instanceRenders;
}
