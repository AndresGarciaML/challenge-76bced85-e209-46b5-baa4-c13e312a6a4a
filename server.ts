/**
 * Servidor Express que ejecuta la aplicación Angular en Node.js (SSR).
 *
 * Usa AngularNodeAppEngine, que lee las rutas de servidor
 * (src/app/app.routes.server.ts) y decide por cada URL cómo responder:
 * - Prerender: devuelve el HTML generado en el build (p. ej. la landing).
 * - Server: renderiza la página en esta petición (catálogo y detalle).
 * - Client: devuelve el shell para que el navegador lo pinte todo.
 * También aplica el status HTTP que fije la app (p. ej. 404 vía RESPONSE_INIT).
 *
 * angular.json declara este archivo en "ssr.entry", por lo que `ng build`
 * lo compila a dist/rendering-techniques/server/server.mjs
 * (se arranca con `npm run serve:ssr`).
 */
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

// El build deja browser/ y server/ como carpetas hermanas dentro de dist/.
const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Los archivos estáticos (JS, CSS, assets) se sirven directamente desde
// /browser sin pasar por Angular. Llevan hash en el nombre, así que se pueden
// cachear un año. index: false evita que Express responda "/" con un HTML
// por su cuenta: esa decisión la toma el motor según las rutas de servidor.
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false
  })
);

// Cualquier otra petición la resuelve Angular según su modo de renderizado.
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

// Solo se escucha en un puerto cuando el archivo se ejecuta directamente
// (node server.mjs). Si lo importa otro proceso, p. ej. el dev server de
// Angular o una plataforma serverless, se usa reqHandler.
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Handler que usan `ng serve` y las plataformas de despliegue.
export const reqHandler = createNodeRequestHandler(app);
