import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { randomUUID } from "crypto";

const startSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const body = (req as any).body ?? JSON.parse(req.body as any);
    const parsed = startSchema.parse(body);

    // Em ambiente serverless, não persistimos em memória; apenas geramos um ID
    const leadId = randomUUID();

    res.status(201).json({ leadId });
  } catch (err: any) {
    const message = err?.message || "Dados inválidos";
    res.status(400).json({ message });
  }
}
