import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as shared from "../../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Health check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  // Create user
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const parsed = shared.insertUserSchema.parse(req.body);
      const user = await storage.createUser(parsed);
      res.status(201).json({ id: user.id, username: user.username });
    } catch (err: any) {
      const status = err.statusCode || 400;
      res.status(status).json({ message: err.message || "Invalid request" });
    }
  });

  // Get user by username
  app.get("/api/users/:username", async (req: Request, res: Response) => {
    const user = await storage.getUserByUsername(req.params.username);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ id: user.id, username: user.username });
  });

  const httpServer = createServer(app);

  return httpServer;
}
