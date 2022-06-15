import express, { Express } from 'express';
import http, { Server } from 'http';
import dotenv from 'dotenv';

import indexRoutes from './router';

dotenv.config();

const PORT = normalizePort(process.env.PORT || 5500);
const app: Express = express();
const server: Server = http.createServer(app);

app.use('/', indexRoutes);

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = getPortType();

  switch (error.code) {
    case 'EACCES':
      console.error(`[error] ${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`[error] ${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const bind = getPortType();
  console.log(`[server] listening on ${bind}`);
}

function getPortType() {
  const address = server.address();
  return typeof address === 'string'
    ? `pipe ${address}`
    : `port ${address.port}`;
}

function normalizePort(val: number | string) {
  const port = parseInt(`${val}`, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}
