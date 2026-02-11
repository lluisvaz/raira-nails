import { randomUUID } from "crypto";

export interface LeadPartial {
  fullName: string;
  email: string;
  phone: string;
}

export interface LeadStored extends LeadPartial {
  id: string;
  createdAt: string; // ISO
  completed: boolean;
  quiz?: Record<string, unknown>;
}

class LeadsMemoryStore {
  private leads = new Map<string, LeadStored>();

  startLead(partial: LeadPartial): LeadStored {
    const id = randomUUID();
    const lead: LeadStored = {
      id,
      ...partial,
      createdAt: new Date().toISOString(),
      completed: false,
    };
    this.leads.set(id, lead);
    return lead;
  }

  getLead(id: string): LeadStored | undefined {
    return this.leads.get(id);
  }

  completeLead(id: string, quiz: Record<string, unknown>): LeadStored | undefined {
    const lead = this.leads.get(id);
    if (!lead) return undefined;
    lead.completed = true;
    lead.quiz = quiz;
    return lead;
  }

  deleteLead(id: string): void {
    this.leads.delete(id);
  }
}

export const leadsStore = new LeadsMemoryStore();
