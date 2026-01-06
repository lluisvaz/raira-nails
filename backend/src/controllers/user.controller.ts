import type { Request, Response } from "express";
import * as shared from "../../../shared/schema";
import { storage } from "../services/storage.service";

/**
 * Controller para operações relacionadas a usuários
 */
export class UserController {
  /**
   * Cria um novo usuário
   */
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const parsed = shared.insertUserSchema.parse(req.body);
      const user = await storage.createUser(parsed);
      res.status(201).json({ id: user.id, username: user.username });
    } catch (err: any) {
      const status = err.statusCode || 400;
      res.status(status).json({ message: err.message || "Invalid request" });
    }
  }

  /**
   * Obtém um usuário por username
   */
  static async getUserByUsername(req: Request, res: Response): Promise<void> {
    const user = await storage.getUserByUsername(req.params.username);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ id: user.id, username: user.username });
  }
}
