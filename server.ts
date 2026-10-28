/**
 * Servidor Express que ejecuta la aplicación Angular en Node.js (SSR).
 *
 * Por cada petición, Angular renderiza la página en el servidor y devuelve
 * HTML completo con los productos ya pintados. Así el usuario ve contenido
 * antes de que descargue y ejecute el JavaScript, y los buscadores pueden
 * indexar la página sin ejecutar JS (mejor SEO y primer pintado más rápido
 * que con CSR puro).
 *
 * angular.json declara este archivo en "ssr.entry", por lo que `ng build`
 * lo compila a dist/rendering-techniques/server/server.mjs
 * (se arranca con `npm run serve:ssr`).
 */
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

// Se exporta la app de Express para poder reutilizarla, p. ej. en funciones serverless.
export function app(): express.Express {
  const server = express();

  // Rutas calculadas desde la ubicación del bundle compilado (dist/.../server),
  // no desde el código fuente: el build deja browser/ y server/ como carpetas hermanas.
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  // Plantilla HTML que genera el build específicamente para renderizar en servidor.
  const indexHtml = join(serverDistFolder, 'index.server.html');

  // Motor de Angular que renderiza un módulo a HTML en Node.js.
  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Los archivos estáticos (JS, CSS, assets) se sirven directamente desde
  // /browser sin pasar por Angular. Llevan hash en el nombre, así que se
  // pueden cachear un año. Como prerender está desactivado no existe
  // browser/index.html, por lo que "/" no se resuelve aquí y cae en el
  // renderizado SSR de abajo.
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html'
  }));

  // Cualquier otra ruta se renderiza con Angular en el servidor.
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        // URL absoluta de la petición: el router y HttpClient la necesitan
        // en el servidor porque ahí no existe window.location.
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }]
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
