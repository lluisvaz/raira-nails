import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Retorna configurações públicas controladas pelo backend (sem expor segredos).
 * Útil para links dinâmicos como o grupo do WhatsApp.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  // Somente valores explicitamente permitidos
  const whatsappGroupUrl = process.env.WHATSAPP_GROUP_URL || "";

  res.status(200).json({
    whatsappGroupUrl,
  });
}
