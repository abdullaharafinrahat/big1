import rateLimit from 'express-rate-limit';

export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests from this IP, please try again later.' }
});

export const emergencyWriteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30, // Max 30 writes per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Request rate limit exceeded. Please wait a moment.' }
});
