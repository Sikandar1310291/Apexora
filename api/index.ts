import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
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
    if (path.startsWith("/api")) {
      console.log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
  });

  next();
});

const httpServer = createServer(app);

let routesRegisteredPromise: Promise<void> | null = null;

export default async function handler(req: Request, res: Response) {
  const start = Date.now();
  
  // Ensure routes are only registered once, handling concurrent requests correctly
  if (!routesRegisteredPromise) {
    console.log('[Vercel] Initializing routes for the first time...');
    routesRegisteredPromise = (async () => {
      try {
        await registerRoutes(httpServer, app);
        console.log('[Vercel] Routes registered successfully.');
      } catch (err) {
        console.error('[Vercel] Failed to register routes:', err);
        routesRegisteredPromise = null; // Reset to allow retry on next request
        throw err;
      }
    })();
  }
  
  await routesRegisteredPromise;
  
  // Handle the request using the express app
  try {
    return app(req, res);
  } catch (err) {
    console.error('[Vercel] Unhandled error in Express app:', err);
    res.status(500).json({ 
      message: "Internal Server Error",
      timestamp: new Date().toISOString()
    });
  }
}
