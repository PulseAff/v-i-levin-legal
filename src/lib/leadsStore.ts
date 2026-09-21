import fs from 'fs';
import path from 'path';

export type LeadStatus = 'New' | 'Qualified' | 'Consultation' | 'Contract' | 'In Progress' | 'Completed' | 'Archived';

export interface LeadRecord {
  id: string;
  createdAt: string;
  source: string;
  referrerPage?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
  serviceCategory: string;
  jurisdiction: string;
  description: string;
  urgency: 'Сегодня' | 'В течение недели' | 'Плановая консультация';
  format: string;
  contact: {
    telegramUsername?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  status: LeadStatus;
  notes?: string;
}

const dataFilePath = path.join(process.cwd(), 'data', 'leads.json');

function ensureDataFile() {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function getAllLeads(): LeadRecord[] {
  try {
    ensureDataFile();
    const content = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Failed to read leads:', err);
    return [];
  }
}

export function saveLead(lead: Omit<LeadRecord, 'id' | 'createdAt' | 'status'>): LeadRecord {
  ensureDataFile();
  const leads = getAllLeads();
  const newLead: LeadRecord = {
    ...lead,
    id: `LEAD-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    status: 'New',
  };
  leads.unshift(newLead);
  fs.writeFileSync(dataFilePath, JSON.stringify(leads, null, 2), 'utf-8');
  return newLead;
}

export function updateLeadStatus(id: string, status: LeadStatus, notes?: string): boolean {
  ensureDataFile();
  const leads = getAllLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return false;
  leads[index].status = status;
  if (notes !== undefined) {
    leads[index].notes = notes;
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(leads, null, 2), 'utf-8');
  return true;
}
