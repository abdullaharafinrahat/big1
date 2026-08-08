import { Queue } from 'bullmq';
import { env } from './env.js';
import { getRedisClient } from './redis.config.js';

let donorMatchingQueue = null;
let notificationQueue = null;

export function getDonorMatchingQueue() {
  if (!donorMatchingQueue && env.ENABLE_BULLMQ) {
    donorMatchingQueue = new Queue('donor-matching', {
      connection: getRedisClient(),
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: 1000,
        removeOnFail: 5000
      }
    });
  }
  return donorMatchingQueue;
}

export function getNotificationQueue() {
  if (!notificationQueue && env.ENABLE_BULLMQ) {
    notificationQueue = new Queue('notifications', {
      connection: getRedisClient(),
      defaultJobOptions: {
        attempts: 5,
        backoff: { type: 'exponential', delay: 1000 }
      }
    });
  }
  return notificationQueue;
}
