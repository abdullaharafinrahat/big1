import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

const server = app.listen(env.PORT, env.HOST, () => {
  console.log(`🚀 Bondhu API Server running on http://${env.HOST}:${env.PORT} in ${env.NODE_ENV} mode`);
});

function gracefulShutdown(signal) {
  console.log(`\nReceived ${signal}, initiating graceful shutdown...`);
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });

  // Force exit if hanging
  setTimeout(() => {
    console.error('Graceful shutdown timeout exceeded, forcing exit.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
