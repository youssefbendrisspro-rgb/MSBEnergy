export type ScreenTab = 'accueil' | 'vente-residentielle' | 'location-simulateur' | 'support-depannage-steg';

export interface GensetProduct {
  id: string;
  name: string;
  power: string;
  powerNum: number;
  atsType: 'ats-inclus' | 'ats-ready' | 'electrique';
  atsLabel: string;
  stockType: 'immediat' | '72h';
  stockLabel: string;
  stockCount?: number;
  voltage: string;
  noise: string;
  fuelTank: string;
  autonomy: string;
  price: number;
  targetUse: string;
  description: string;
  features: string[];
  isBestSeller?: boolean;
}

export interface RentalPack {
  id: 'secours' | 'serenite' | 'evenement';
  title: string;
  power: string;
  category: string;
  noise: string;
  image: string;
  badge?: string;
  voltageLabel: string;
  dailyRate: number;
  weeklyRate: number;
  weeklySavings: number;
  features: string[];
  recommended?: boolean;
}

export interface LoadItem {
  id: string;
  title: string;
  subtitle: string;
  kva: number;
  checked: boolean;
}

export interface SAVTicket {
  id: string;
  client: string;
  phone: string;
  zone: string;
  model: string;
  urgency: 'Normal' | 'Urgent' | 'Critique';
  issue: string;
  technician: string;
  status: 'Pris en charge' | 'Technicien en route' | 'Dépanné';
  timestamp: string;
  description?: string;
}

export interface ResidentialQuote {
  id: string;
  client: string;
  phone?: string;
  zone: string;
  kva: string;
  propertyType?: string;
  formula?: string;
  status: 'En attente' | 'Confirmé';
  date: string;
}

export interface ResidentialOrder {
  dossierId: string;
  timestamp: string;
  client: {
    nom: string;
    telephone: string;
    zone: string;
    notes?: string;
  };
  produit: {
    modele: string;
    puissance: string;
    prixBase: number;
    optionInstallationATS: boolean;
    totalTTC: number;
  };
}

export interface RentalBookingVoucher {
  voucherCode: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientZone: string;
  clientAddress?: string;
  clientNotes?: string;
  packName: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  optionDelivery: boolean;
  optionFuel: boolean;
  totalTTC: number;
  timestamp: string;
}
