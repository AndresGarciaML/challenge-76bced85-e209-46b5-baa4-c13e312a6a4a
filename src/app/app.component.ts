import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header class="topbar">
      <nav class="topbar__inner">
        <a class="wordmark" routerLink="/">tienda<span class="wordmark__dot">.</span></a>
        <a class="topbar__link" routerLink="/products" routerLinkActive="topbar__link--active">Productos</a>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .topbar {
      position: sticky;
      top: 0;
      z-index: 10;
      background: var(--color-pure-white);
      box-shadow: var(--shadow-sm);
    }

    .topbar__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: var(--page-max-width);
      height: 64px;
      margin: 0 auto;
      padding: 0 var(--spacing-16);
    }

    .wordmark {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.05em;
      color: var(--color-ink-black);
      text-decoration: none;
    }

    .wordmark__dot {
      color: var(--color-shop-violet);
    }

    .topbar__link {
      padding: var(--spacing-6) var(--spacing-16);
      border: 1px solid var(--color-faint-border);
      border-radius: var(--radius-chips);
      font-size: var(--text-body);
      color: var(--color-ink-black);
      text-decoration: none;
    }

    .topbar__link--active {
      background: var(--color-canvas-mist);
    }
  `],
  standalone: false
})
export class AppComponent {}
