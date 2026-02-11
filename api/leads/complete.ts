import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { appendLeadRow } from "../_lib/google-sheets";

const startSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
});

const completeSchema = z.object({
  leadId: z.string().min(1),
  lead: startSchema.optional(),
  quiz: z.record(z.any()),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const body = (req as any).body ?? JSON.parse(req.body as any);
    const parsed = completeSchema.parse(body);

    // Em ambiente serverless, NÃO há storage em memória estável. Requeremos os dados do lead no payload.
    if (!parsed.lead) {
      res.status(400).json({ message: "Dados do lead ausentes. Reenvie com { lead: { fullName, email, phone } }" });
      return;
    }

    const row = [
      parsed.lead.fullName,
      parsed.lead.email,
      parsed.lead.phone,
      JSON.stringify(parsed.quiz ?? {}),
    ];

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const sheetName = process.env.GOOGLE_SHEETS_TAB_NAME || "Leads";
    if (!spreadsheetId) {
      throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID não configurado");
    }

    await appendLeadRow({ spreadsheetId, sheetName }, row);

    res.status(201).json({ ok: true });
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: err?.message || "Falha ao finalizar lead" });
  }
}
