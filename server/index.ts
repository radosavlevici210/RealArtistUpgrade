import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { config } from "./config";
import path from "path";

const app = express();

// Production-ready middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Enhanced security headers for production
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;");
  res.setHeader('X-Powered-By', 'RealArtist-AI-v2025.1.0');

  // Production CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Global error handler for production
app.use((error: any, req: any, res: any, next: any) => {
  console.error('Unhandled application error:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
    ip: req.ip
  });

  res.status(500).json({
    error: "Internal server error",
    timestamp: new Date().toISOString(),
    requestId: Math.random().toString(36).substring(7)
  });
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

    console.log(logLine);

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

// Production health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    version: '2025.1.0',
    uptime: process.uptime(),
    platform: 'RealArtist AI'
  });
});

(async () => {
  try {
    const server = await registerRoutes(app);

    // Global error handler for production
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

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

    // Setup frontend serving
    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction) {
      console.log('🚀 Starting in PRODUCTION mode');
      serveStatic(app);
    } else {
      console.log('🔧 Starting in DEVELOPMENT mode');
      await setupVite(app, server);
    }

    // Production-ready server configuration using validated config
    const port = config.PORT;
    const host = '0.0.0.0';

    // Handle server startup errors
    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use. Retrying in 3 seconds...`);
        setTimeout(() => {
          server.close();
          server.listen(port, host);
        }, 3000);
      } else {
        console.error('❌ Server error:', err);
        process.exit(1);
      }
    });

    server.listen(port, host, () => {
      console.log(`\n🌟 RealArtist AI Platform LIVE!`);
      console.log(`🌐 Server: http://${host}:${port}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'production'}`);
      console.log(`🔗 External URL: ${process.env.REPL_URL || `http://${host}:${port}`}`);
      console.log(`⚡ Status: Ready for production traffic!`);
      console.log(`🎵 Features: AI Music Generation, Analytics, Security, Royalties`);
      console.log(`💎 Version: 2025.1.0 - Production Ready\n`);
    });

    // Graceful shutdown handling
    const gracefulShutdown = (signal: string) => {
      console.log(`📴 ${signal} received, shutting down gracefully...`);
      server.close(() => {
        console.log('✅ Server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
})();