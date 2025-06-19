
export interface Config {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URL: string;
  REPLIT_DB_URL?: string;
}

export function validateConfig(): Config {
  const requiredEnvVars = ['DATABASE_URL'];
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing);
    process.exit(1);
  }
  
  return {
    NODE_ENV: process.env.NODE_ENV || 'production',
    PORT: parseInt(process.env.PORT || '5000', 10),
    DATABASE_URL: process.env.DATABASE_URL!,
    REPLIT_DB_URL: process.env.REPLIT_DB_URL,
  };
}

export const config = validateConfig();
