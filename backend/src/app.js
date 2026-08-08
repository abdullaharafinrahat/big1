import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import { env } from './config/env.js';
import { globalRateLimiter } from './middleware/rate-limit.middleware.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.middleware.js';

import bloodRequestsRouter from './routes/blood-requests.routes.js';
import donorsRouter from './routes/donors.routes.js';
import hospitalsRouter from './routes/hospitals.routes.js';
import ambulancesRouter from './routes/ambulances.routes.js';
import missingBureauRouter from './routes/missing-bureau.routes.js';
import cmsRouter from './routes/cms.routes.js';
import adminRouter from './routes/admin.routes.js';
import usersRouter from './routes/users.routes.js';
import paymentsRouter from './routes/payments.routes.js';

export function createApp() {
  const app = express();

  // 1. Security Headers & CORS
  app.use(helmet({ contentSecurityPolicy: false })); // allow embedding in sandboxed previews
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

  // 2. Performance & Compression
  app.use(compression());
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true, limit: '5mb' }));

  // 3. Logging & Rate limiting
  if (env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
  }
  app.use(globalRateLimiter);

  // 4. Health Checks
  app.get('/healthz', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), env: env.NODE_ENV });
  });

  // 5. API Routes
  app.use('/api/blood-requests', bloodRequestsRouter);
  app.use('/api/donors', donorsRouter);
  app.use('/api/hospitals', hospitalsRouter);
  app.use('/api/ambulances', ambulancesRouter);
  app.use('/api/missing-bureau', missingBureauRouter);
  app.use('/api/cms', cmsRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/payments', paymentsRouter);

  // 6. Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
