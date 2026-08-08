import Redis from 'ioredis';
import { env } from './env.js';

let redisClient = null;

export function getRedisClient() {
  if (!redisClient) {
    redisClient = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      lazyConnect: true,
      retryStrategy(times) {
        if (times > 5) {
          console.warn('Redis reconnection limit reached, running in degraded cache mode');
          return null;
        }
        return Math.min(times * 200, 2000);
      }
    });

    redisClient.on('error', (err) => {
      // Suppress spam in development when Redis server is optional
      if (env.NODE_ENV === 'development') {
        // quiet warning
      } else {
        console.error('Redis Client Error:', err.message);
      }
    });
  }
  return redisClient;
}

export async function testRedisConnection() {
  try {
    const client = getRedisClient();
    await client.connect();
    const pong = await client.ping();
    return { connected: true, response: pong };
  } catch (error) {
    return { connected: false, error: error.message };
  }
}
