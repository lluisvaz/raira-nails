import type { Request, Response } from "express";

/**
 * Retorna configurações públicas controladas pelo backend (sem expor segredos).
 * Útil para links dinâmicos como o grupo do WhatsApp.
 */
export class ConfigController {
  static async getPublicConfig(_req: Request, res: Response): Promise<void> {
    // Somente valores explicitamente permitidos
    const whatsappGroupUrl = process.env.WHATSAPP_GROUP_URL || "";

    res.json({
      whatsappGroupUrl,
    });
  }
}
