import type { Request, Response } from "express";
import { z } from "zod";
import { appendLeadRow } from "../services/google-sheets.service";
import { leadsStore } from "../services/leads.service";

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

export class LeadsController {
  static async start(req: Request, res: Response): Promise<void> {
    try {
      const parsed = startSchema.parse(req.body);
      const lead = leadsStore.startLead(parsed);
      res.status(201).json({ leadId: lead.id });
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Dados inválidos" });
    }
  }

  static async complete(req: Request, res: Response): Promise<void> {
    try {
      const parsed = completeSchema.parse(req.body);
      const { leadId, lead: leadOverride, quiz } = parsed;

      const lead = leadsStore.getLead(leadId);
      if (!lead) {
        res.status(404).json({ message: "Lead não encontrado ou expirado" });
        return;
      }

      // Permite sobrescrever dados pessoais caso o frontend envie novamente
      const finalLead = {
        ...lead,
        ...(leadOverride ?? {}),
      };

      // Marca como completo na memória
      leadsStore.completeLead(leadId, quiz);

      // Monta linha para a planilha (sem timestamp)
      // Ordem desejada: A=Nome Completo, B=Email, C=Celular, D=Quiz (JSON)
      const row = [
        finalLead.fullName,
        finalLead.email,
        finalLead.phone,
        JSON.stringify(quiz),
      ];

      const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
      const sheetName = process.env.GOOGLE_SHEETS_TAB_NAME || "Leads";
      if (!spreadsheetId) {
        throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID não configurado");
      }

      await appendLeadRow({ spreadsheetId, sheetName }, row);

      // Remove da memória após sucesso
      leadsStore.deleteLead(leadId);

      res.status(201).json({ ok: true });
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ message: err.message || "Falha ao finalizar lead" });
    }
  }
}
