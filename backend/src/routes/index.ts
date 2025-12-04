import type { Express } from "express";
import { createServer, type Server } from "http";
import { registerApiRoutes } from "./api.routes";

/**
 * Registra todas as rotas da aplicação e retorna o servidor HTTP
 */
export async function registerRoutes(app: Express): Promise<Server> {
  // Registra rotas da API
  registerApiRoutes(app);

  // Cria e retorna o servidor HTTP
  const httpServer = createServer(app);
  return httpServer;
}
