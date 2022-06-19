import express, { Express, Request, Response, NextFunction } from 'express';
import http, { Server } from 'http';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { ZodError } from 'zod';

import apiRoutes from './routes/apiRoutes';
import HttpError, { Error } from './httpError';

dotenv.config();

const PORT = normalizePort(process.env.PORT || 5500);
const app: Express = express();
const server: Server = http.createServer(app);

app.set('port', PORT);

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common'));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new HttpError('Not found', 404));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const message = err.message;

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    next(new HttpError(message, 400));
    return;
  }

  if (err instanceof ZodError) {
    const issues = err.errors.map((error) => ({
      prop: error.path[0],
      message: error.message,
    }));

    next(new HttpError('Unprocessable entity', 422, issues));
    return;
  }

  next(new HttpError(message || 'Internal error', err.status || 500));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({
    success: err.success,
    status: err.status,
    message: err.message,
    issues: err?.issues,
  });
});

server.listen(app.get('port'));
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
    : `port ${address?.port}`;
}

function normalizePort(val: number | string) {
  const port = parseInt(`${val}`, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}
