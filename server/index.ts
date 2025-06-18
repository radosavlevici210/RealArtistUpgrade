
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Production-ready middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Security headers for production
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Production CORS
  const allowedOrigins = [
    'https://replit.com',
    'https://*.replit.dev',
    'https://*.replit.app',
    process.env.APP_URL,
    process.env.CORS_ORIGIN
  ].filter(Boolean);
  
  const origin = req.headers.origin;
  if (allowedOrigins.some(allowed => 
    allowed.includes('*') ? origin?.includes(allowed.replace('*', '')) : origin === allowed
  )) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Request logging for production monitoring
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logLine = `[${new Date().toISOString()}] ${req.method} ${path} ${res.statusCode} - ${duration}ms - ${req.ip}`;
    
    // Log all requests in production for monitoring
    console.log(logLine);
    
    // Detailed API logging
    if (path.startsWith("/api")) {
      let detailedLog = `API: ${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse && res.statusCode >= 400) {
        detailedLog += ` :: ERROR: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(detailedLog);
    }
  });

  next();
});

// Production health check endpoint before routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    version: '2025.1.0',
    uptime: process.uptime()
  });
});

(async () => {
  const server = await registerRoutes(app);

  // Global error handler for production
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    // Log error details for production monitoring
    console.error(`[ERROR] ${new Date().toISOString()} - ${req.method} ${req.path}:`, {
      error: message,
      stack: err.stack,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.status(status).json({ 
      message,
      status,
      timestamp: new Date().toISOString(),
      path: req.path
    });
  });

  // Setup frontend serving - both dev and production
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    console.log('🚀 Starting in PRODUCTION mode');
    serveStatic(app);
  } else {
    console.log('🔧 Starting in DEVELOPMENT mode');
    await setupVite(app, server);
  }

  // Production-ready server configuration
  const port = parseInt(process.env.PORT || '5000', 10);
  const host = '0.0.0.0';
  
  server.listen({
    port,
    host,
    reusePort: true,
  }, () => {
    console.log(`🌟 RealArtist AI Platform running on ${host}:${port}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'production'}`);
    console.log(`🔗 External URL: ${process.env.APP_URL || `http://${host}:${port}`}`);
    console.log(`⚡ Ready for production traffic!`);
  });

  // Graceful shutdown handling
  process.on('SIGTERM', () => {
    console.log('📴 SIGTERM received, shutting down gracefully...');
    server.close(() => {
      console.log('✅ Server closed.');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('📴 SIGINT received, shutting down gracefully...');
    server.close(() => {
      console.log('✅ Server closed.');
      process.exit(0);
    });
  });
})();
