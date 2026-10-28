// Punto de entrada del bundle de servidor, declarado en angular.json como
// "server". El builder de Angular compila este archivo para Node.js y
// server.ts lo importa para pasar AppServerModule a CommonEngine.
// Se exporta por defecto porque es lo que espera CommonEngine en "bootstrap".
export { AppServerModule as default } from './app/app.server.module';
