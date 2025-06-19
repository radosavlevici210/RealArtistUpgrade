
interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

const rateLimitStore: RateLimitStore = {};
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // requests per window

export function rateLimit(req: any, res: any, next: any) {
  const clientId = req.ip || 'unknown';
  const now = Date.now();
  
  // Clean up expired entries
  Object.keys(rateLimitStore).forEach(key => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key];
    }
  });
  
  // Initialize or get current limit data
  if (!rateLimitStore[clientId]) {
    rateLimitStore[clientId] = {
      count: 0,
      resetTime: now + RATE_LIMIT_WINDOW
    };
  }
  
  const limitData = rateLimitStore[clientId];
  
  // Reset if window expired
  if (limitData.resetTime < now) {
    limitData.count = 0;
    limitData.resetTime = now + RATE_LIMIT_WINDOW;
  }
  
  // Check if limit exceeded
  if (limitData.count >= MAX_REQUESTS) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      retryAfter: Math.ceil((limitData.resetTime - now) / 1000),
      timestamp: new Date().toISOString()
    });
  }
  
  // Increment counter
  limitData.count++;
  
  // Add headers
  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS);
  res.setHeader('X-RateLimit-Remaining', MAX_REQUESTS - limitData.count);
  res.setHeader('X-RateLimit-Reset', Math.ceil(limitData.resetTime / 1000));
  
  next();
}
