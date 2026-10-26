import compression from 'compression';
import cors from 'cors';
import express, { type Express } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';
import { env, isProduction } from './config/env.js';
import { logger } from './lib/logger.js';
import { DrizzleSessionStore } from './lib/session-store.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import { apiRouter } from './routes/index.js';

export function createApp(): Express {
  const app = express();

  // Counting hops exactly is deliberate: `true` would trust the whole
  // X-Forwarded-For chain, letting a client spoof its address.
  app.set('trust proxy', isProduction ? 2 : 1);

  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGINS,
      credentials: true,
    }),
  );
  app.use(compression());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      name: 'onekawayan.sid',
      secret: env.SESSION_SECRET,
      store: new DrizzleSessionStore(),
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: true,
        // Lax keeps the session on normal top-level navigation while blocking
        // it on cross-site POSTs.
        sameSite: 'lax',
        secure: isProduction,
        maxAge: env.SESSION_TTL_DAYS * 24 * 60 * 60 * 1000,
        path: '/',
      },
    }),
  );
  app.use(
    pinoHttp({
      logger,
      // Log only what is useful for tracing a request. Never the body or the
      // session cookie.
      redact: {
        paths: ['req.headers.cookie', 'req.headers.authorization', 'res.headers["set-cookie"]'],
        remove: true,
      },
      serializers: {
        req: (req) => ({ id: req.id, method: req.method, url: req.url }),
        res: (res) => ({ statusCode: res.statusCode }),
      },
    }),
  );

  app.use('/api/v1', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
