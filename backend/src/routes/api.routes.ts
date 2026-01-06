import type { Express } from "express";
import { UserController } from "../controllers/user.controller";

/**
 * Registra todas as rotas da API
 * Todas as rotas devem ter o prefixo /api
 */
export function registerApiRoutes(app: Express): void {
  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // User routes
  app.post("/api/users", UserController.createUser);
  app.get("/api/users/:username", UserController.getUserByUsername);
}
