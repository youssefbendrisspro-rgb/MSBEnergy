import React, { useState } from 'react';
import { SAVTicket, ResidentialQuote } from '../../types';
import {
  AlertTriangle,
  Radio,
  Search,
  CheckCircle2,
  Lock,
  PhoneCall,
  Clock,
  Car,
  Fuel,
  Activity,
  FileSpreadsheet,
  Download,
  LockKeyhole,
  RefreshCw,
  Copy,
  Check,
  Shield,
  Send,
  Zap,
} from 'lucide-react';

interface SupportScreenProps {
  tickets: SAVTicket[];
  quotes: ResidentialQuote[];
  isAdminUnlocked: boolean;
  onOpenPinModal: () => void;
  onLockAdmin: () => void;
  onAddTicket: (ticket: SAVTicket) => void;
  onUpdateTicketStatus: (ticketId: string, newStatus: SAVTicket['status']) => void;
  onUpdateTicketTech: (ticketId: string, techName: string) => void;
  onConfirmQuote: (quoteId: string) => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({
  tickets,
  quotes,
  isAdminUnlocked,
  onOpenPinModal,
  onLockAdmin,
  onAddTicket,
  onUpdateTicketStatus,
  onUpdateTicketTech,
  onConfirmQuote,
}) => {
  // SAV Form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientZone, setClientZone] = useState('');
  const [generatorModel, setGeneratorModel] = useState('');
  const [urgency, setUrgency] = useState<'Normal' | 'Urgent' | 'Critique'>('Critique');
  const [incidentType, setIncidentType] = useState('Problème démarrage automatique ATS (Armement bloqué)');
  const [description, setDescription] = useState('');

  // Ticket newly created confirmation
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Tracking query & current active ticket
  const [searchQuery, setSearchQuery] = useState('');
  const [trackedTicket, setTrackedTicket] = useState<SAVTicket>(tickets[0] || {
    id: 'VOLT-2026-88412',
    client: 'Dr. Skander M.',
    phone: '+216 98 221 445',
    zone: 'Carthage Amilcar',
    model: 'VOLT Heavy-Duty 22 kVA',
    urgency: 'Critique',
    issue: 'Problème démarrage automatique ATS (Armement bloqué)',
    technician: 'Ing. Mehdi Trabelsi (Véhicule VOLT-04)',
    status: 'Technicien en route',
    timestamp: 'Il y a 18 min',
  });

  const handleSAVSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newId = `VOLT-2026-${randomSuffix}`;

    const newTicket: SAVTicket = {
      id: newId,
      client: clientName,
      phone: clientPhone,
      zone: clientZone || 'Grand Tunis',
      model: generatorModel || 'VOLT Home 6.5 Silent',
      urgency,
      issue: incidentType,
      technician: 'Ing. Mehdi Trabelsi (Équipe d\'astreinte)',
      status: 'Pris en charge',
      timestamp: "À l'instant",
      description,
    };

    onAddTicket(newTicket);
    setCreatedTicketId(newId);
    setTrackedTicket(newTicket);

    // reset fields
    setClientName('');
    setClientPhone('');
    setDescription('');
  };

  const handleSearchTracking = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    const found = tickets.find(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.phone.replace(/\s+/g, '').includes(q.replace(/\s+/g, ''))
    );

    if (found) {
      setTrackedTicket(found);
    } else {
      alert('Aucun dossier trouvé pour cette recherche. Vérifiez le format (ex: VOLT-2026-XXXXX) ou le numéro.');
    }
  };

  const copyTicketId = () => {
    if (!createdTicketId) return;
    navigator.clipboard.writeText(createdTicketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportJSONLog = () => {
    const data = {
      exportDate: new Date().toISOString(),
      tickets,
      quotes,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VOLT_Dispatch_Report_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const pendingEmergencyCount = tickets.filter((t) => t.status !== 'Dépanné').length;
  const pendingQuotesCount = quotes.filter((q) => q.status === 'En attente').length;

  return (
    <div className="flex flex-col w-full">
      {/* Top Alert Ribbon */}
      <div className="w-full bg-[#f1f3ff] px-margin py-2.5 flex items-center justify-between border-b border-[#e1e8fd] shadow-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8d4b00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8d4b00]"></span>
          </span>
          <span className="font-label-sm uppercase tracking-wider text-[#141b2b] font-bold">
            Astreinte Grand Tunis 24/7 en cas de délestage électrique prolongé
          </span>
        </div>

        <div className="hidden md:flex items-center gap-space-md text-[#554336] font-label-sm">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-[#006c49]" />
            Temps d'intervention moyen : 38 min
          </span>
          <span className="flex items-center gap-1 font-semibold text-[#8d4b00]">
            <Radio className="w-4 h-4 text-[#8d4b00]" />
            6 Équipes Mobiles Actives
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[1440px] mx-auto px-margin py-space-lg flex flex-col gap-space-xl">
        {/* Header Title Diagnostic Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-2">
              <span className="font-label-sm uppercase tracking-widest text-[#8d4b00] font-bold">
                Unité Centrale de Secours
              </span>
              <span className="text-[#555f6f] text-label-sm">/</span>
              <span className="font-label-sm uppercase tracking-wider text-[#555f6f] font-semibold">
                Cellule Opérationnelle Tunis
              </span>
            </div>
            <h1 className="font-headline-lg text-[#141b2b] font-bold tracking-tight">
              Support Technique & Urgence STEG
            </h1>
            <p className="font-body-md text-[#554336] max-w-2xl leading-relaxed">
              Plateforme certifiée de prise en charge des coupures de phase, pannes d'inverseur automatique (ATS) et approvisionnement d'urgence pour installations résidentielles haut de gamme.
            </p>
          </div>

          <div className="flex items-center gap-space-sm">
            <a
              href="#tracking-card"
              className="px-4 py-2 rounded-xl bg-[#e1e8fd] text-[#141b2b] hover:bg-[#dce2f7] transition-all font-label-md text-xs font-semibold flex items-center gap-1.5 shadow-xs border border-[#d6e0f3]"
            >
              <Search className="w-4 h-4 text-[#8d4b00]" />
              <span>Suivre mon ticket</span>
            </a>
            <button
              onClick={onOpenPinModal}
              className="px-4 py-2 rounded-xl bg-[#293040] text-white hover:bg-[#141b2b] transition-all font-label-md text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Lock className="w-4 h-4 text-[#ffdcc3]" />
              <span>Espace Opérateur (PIN)</span>
            </button>
          </div>
        </div>

        {/* Telemetry Diagnostic Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          <div className="p-space-md bg-[#ffffff] rounded-2xl shadow-sm border border-[#e1e8fd] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[#555f6f] uppercase font-semibold">
                Réseau STEG 50Hz
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-label-sm text-[11px] font-bold">
                Tension Instable
              </span>
            </div>
            <div className="mt-space-sm flex items-baseline gap-1">
              <span className="font-metric-numeral text-3xl font-bold text-[#141b2b]">184.2</span>
              <span className="font-label-md text-[#555f6f]">V AC</span>
            </div>
            <div className="w-full bg-[#f1f3ff] h-1.5 rounded-full overflow-hidden mt-space-xs">
              <div className="bg-[#ba1a1a] h-full w-[65%]"></div>
            </div>
            <span className="font-body-sm text-[#554336] mt-space-xs">
              Dérive -16% sous le seuil nominal
            </span>
          </div>

          <div className="p-space-md bg-[#ffffff] rounded-2xl shadow-sm border border-[#e1e8fd] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[#555f6f] uppercase font-semibold">
                ATS Basculement Auto
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#6ffbbe]/40 text-[#002113] font-label-sm text-[11px] font-bold">
                Armé
              </span>
            </div>
            <div className="mt-space-sm flex items-baseline gap-1">
              <span className="font-metric-numeral text-3xl font-bold text-[#141b2b]">0.82</span>
              <span className="font-label-md text-[#555f6f]">sec</span>
            </div>
            <div className="w-full bg-[#f1f3ff] h-1.5 rounded-full overflow-hidden mt-space-xs">
              <div className="bg-[#00a572] h-full w-[95%]"></div>
            </div>
            <span className="font-body-sm text-[#554336] mt-space-xs">
              Délai d'isolation certifié CE
            </span>
          </div>

          <div className="p-space-md bg-[#ffffff] rounded-2xl shadow-sm border border-[#e1e8fd] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[#555f6f] uppercase font-semibold">
                Flotte Astreinte Mobile
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#e1e8fd] text-[#141b2b] font-label-sm text-[11px] font-bold">
                Connectée
              </span>
            </div>
            <div className="mt-space-sm flex items-baseline gap-1">
              <span className="font-metric-numeral text-3xl font-bold text-[#141b2b]">6/6</span>
              <span className="font-label-md text-[#555f6f]">Véhicules</span>
            </div>
            <div className="w-full bg-[#f1f3ff] h-1.5 rounded-full overflow-hidden mt-space-xs">
              <div className="bg-[#8d4b00] h-full w-[100%]"></div>
            </div>
            <span className="font-body-sm text-[#554336] mt-space-xs">
              Carthage, Marsa, Ennasr & Ariana
            </span>
          </div>

          <div className="p-space-md bg-[#ffffff] rounded-2xl shadow-sm border border-[#e1e8fd] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[#555f6f] uppercase font-semibold">
                Stock Diesel Réserve
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#6ffbbe]/40 text-[#002113] font-label-sm text-[11px] font-bold">
                Disponible
              </span>
            </div>
            <div className="mt-space-sm flex items-baseline gap-1">
              <span className="font-metric-numeral text-3xl font-bold text-[#141b2b]">14 200</span>
              <span className="font-label-md text-[#555f6f]">Litres</span>
            </div>
            <div className="w-full bg-[#f1f3ff] h-1.5 rounded-full overflow-hidden mt-space-xs">
              <div className="bg-[#8d4b00] h-full w-[84%]"></div>
            </div>
            <span className="font-body-sm text-[#554336] mt-space-xs">
              Camions-citernes équipés pompes 12V
            </span>
          </div>
        </div>

        {/* Main Grid: Form & Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left: Dispatch Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="bg-[#ffffff] rounded-2xl p-space-lg shadow-sm border border-[#e1e8fd] flex flex-col gap-space-md">
              <div className="flex items-center justify-between border-b border-[#e1e8fd] pb-space-sm">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#8d4b00] text-white flex items-center justify-center shadow-xs">
                    <Zap className="w-5 h-5 fill-white" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-headline-sm text-[#141b2b] font-bold">
                      Formulaire d'Urgence SAV Résidentiel
                    </h2>
                    <span className="font-body-sm text-[#554336]">
                      Déclenchement immédiat de l'ingénieur d'astreinte secteur Grand Tunis
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#e1e8fd] text-[#141b2b] font-label-sm font-bold uppercase text-[11px]">
                  Priorité STEG
                </span>
              </div>

              <form onSubmit={handleSAVSubmit} className="flex flex-col gap-space-md">
                {/* Row 1: Name and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-[#141b2b] font-bold">
                      Nom complet & Qualité *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ex: Karim Ben Salem (Propriétaire)"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-[#f1f3ff] text-[#141b2b] border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-[#141b2b] font-bold">
                      Numéro Mobile Direct *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="ex: +216 98 000 000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-[#f1f3ff] text-[#141b2b] border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                    />
                  </div>
                </div>

                {/* Row 2: Location and Model */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-[#141b2b] font-bold">
                      Localisation & Cité *
                    </label>
                    <select
                      value={clientZone}
                      onChange={(e) => setClientZone(e.target.value)}
                      required
                      className="w-full h-11 px-3 rounded-xl bg-[#f1f3ff] text-[#141b2b] border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                    >
                      <option value="">Sélectionner le quartier</option>
                      <option value="La Marsa (Nassine / Corniche)">La Marsa (Nassine / Corniche)</option>
                      <option value="Carthage (Présidence / Amilcar)">Carthage (Présidence / Amilcar)</option>
                      <option value="Gammarth Supérieur">Gammarth Supérieur</option>
                      <option value="Ennasr I & II">Ennasr I & II</option>
                      <option value="El Menzah (V, VI, IX)">El Menzah (V, VI, IX)</option>
                      <option value="Ariana Ville / Borj Louzir">Ariana Ville / Borj Louzir</option>
                      <option value="Lac 1 & 2">Les Berges du Lac (1 & 2)</option>
                      <option value="Autre secteur Grand Tunis">Autre secteur Grand Tunis</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-[#141b2b] font-bold">
                      Modèle Groupe VOLT concerné *
                    </label>
                    <select
                      value={generatorModel}
                      onChange={(e) => setGeneratorModel(e.target.value)}
                      required
                      className="w-full h-11 px-3 rounded-xl bg-[#f1f3ff] text-[#141b2b] border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                    >
                      <option value="">Choisir la puissance nominale</option>
                      <option value="VOLT Home 3.5 Silent">VOLT Home 3.5 Silent</option>
                      <option value="VOLT Home 6.5 Silent ATS-R">VOLT Home 6.5 Silent ATS-R</option>
                      <option value="VOLT Villa 10 Silent ATS">VOLT Villa 10 Silent ATS</option>
                      <option value="VOLT Pro Resident 15 SS">VOLT Pro Resident 15 SS</option>
                      <option value="Autre marque tierce connectée à l'ATS VOLT">Autre marque tierce connectée à l'ATS VOLT</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Urgency Selector */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-[#141b2b] font-bold">
                    Degré d'Urgence Opérationnelle *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                    {[
                      { id: 'Normal', label: 'Normal', desc: 'Intervention planifiée sous 48h', color: 'bg-[#555f6f]' },
                      { id: 'Urgent', label: 'Urgent', desc: 'Intervention sous 8 heures', color: 'bg-[#8d4b00]' },
                      { id: 'Critique', label: 'Critique STEG', desc: 'Coupure Totale - Sous 2h', color: 'bg-[#ba1a1a]' },
                    ].map((item) => (
                      <label
                        key={item.id}
                        onClick={() => setUrgency(item.id as any)}
                        className={`p-3 rounded-xl cursor-pointer transition-all border flex flex-col justify-between ${
                          urgency === item.id
                            ? item.id === 'Critique'
                              ? 'bg-[#ffdad6]/60 border-[#ba1a1a] ring-1 ring-[#ba1a1a]'
                              : 'bg-[#ffdcc3]/40 border-[#8d4b00] ring-1 ring-[#8d4b00]'
                            : 'bg-[#f1f3ff] border-[#e1e8fd] hover:bg-[#e9edff]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-title-md font-bold ${item.id === 'Critique' ? 'text-[#ba1a1a]' : 'text-[#141b2b]'}`}>
                            {item.label}
                          </span>
                          <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                        </div>
                        <span className="font-label-sm text-[#554336]">{item.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Row 4: Issue type */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-[#141b2b] font-bold">
                    Nature de l'Avarie Constatée *
                  </label>
                  <select
                    value={incidentType}
                    onChange={(e) => setIncidentType(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-[#f1f3ff] text-[#141b2b] border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                  >
                    <option value="Problème démarrage automatique ATS (Armement bloqué)">Problème démarrage automatique ATS (Armement bloqué)</option>
                    <option value="Défaut de tension / Sous-tension après reprise STEG">Défaut de tension / Sous-tension après reprise STEG</option>
                    <option value="Entretien préventif, vidange d'urgence, remplacement filtres">Entretien préventif, vidange d'urgence, remplacement filtres</option>
                    <option value="Ravitaillement Diesel d'urgence (Cuve < 15%)">Ravitaillement Diesel d'urgence (Cuve &lt; 15%)</option>
                    <option value="Fuite circuit de refroidissement ou code alarme contrôleur">Fuite circuit de refroidissement ou code alarme contrôleur</option>
                  </select>
                </div>

                {/* Row 5: Notes */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-[#141b2b] font-bold">
                    Diagnostic visuel ou sonore / Informations d'accès *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Indiquez les bips du tableau de commande, odeurs suspectes, présence d'un disjoncteur différentiel déclenché..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#f1f3ff] text-[#141b2b] border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                  />
                </div>

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs border-t border-[#e1e8fd]">
                  <div className="flex items-center gap-1.5 text-[#554336] font-label-sm">
                    <Shield className="w-4 h-4 text-[#006c49]" />
                    <span>Transmission chiffrée SSL au répartiteur d'astreinte</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#8d4b00] text-white hover:bg-[#b15f00] font-label-md font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Radio className="w-4 h-4" />
                    <span>Émettre l'Alerte SAV</span>
                  </button>
                </div>
              </form>

              {/* Success Notification Box */}
              {createdTicketId && (
                <div className="p-space-md rounded-2xl bg-[#6ffbbe]/25 border border-[#00a572]/40 text-[#00311f] flex flex-col gap-space-xs shadow-xs animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="font-title-md font-bold flex items-center gap-2 text-[#00311f]">
                      <CheckCircle2 className="w-5 h-5 text-[#006c49]" />
                      Ticket Officiel Enregistré avec Succès !
                    </span>
                    <button
                      onClick={() => setCreatedTicketId(null)}
                      className="text-[#00311f] hover:opacity-75 text-xs font-bold"
                    >
                      Fermer
                    </button>
                  </div>
                  <p className="font-body-sm text-[#00311f]">
                    Votre dossier technique a été envoyé à notre technicien d'astreinte le plus proche de votre zone.
                  </p>
                  <div className="p-3 rounded-xl bg-[#ffffff] text-[#141b2b] flex items-center justify-between border border-[#e1e8fd] mt-1">
                    <div>
                      <span className="font-label-sm text-[#555f6f] uppercase block">
                        Identifiant de suivi :
                      </span>
                      <span className="font-headline-sm font-bold text-[#8d4b00]">
                        {createdTicketId}
                      </span>
                    </div>
                    <button
                      onClick={copyTicketId}
                      className="px-3 py-1.5 rounded-lg bg-[#e1e8fd] text-[#141b2b] hover:bg-[#dce2f7] font-label-sm font-semibold flex items-center gap-1.5 cursor-pointer text-xs"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#006c49]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copié !' : 'Copier'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Live Tracking Console & Map (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            {/* Tracking Tool Card */}
            <div className="bg-[#ffffff] rounded-2xl p-space-lg shadow-sm border border-[#e1e8fd] flex flex-col gap-space-md" id="tracking-card">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-[#e1e8fd] text-[#8d4b00] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h2 className="font-headline-sm text-[#141b2b] font-bold">
                    Suivre mon Dépannage
                  </h2>
                  <span className="font-body-sm text-[#554336]">
                    Télé-suivi en direct du statut d'intervention
                  </span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ex: VOLT-2026-88412 ou Téléphone"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 h-11 px-3 rounded-xl bg-[#f1f3ff] text-[#141b2b] border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                  />
                  <button
                    onClick={handleSearchTracking}
                    className="px-4 h-11 rounded-xl bg-[#e1e8fd] hover:bg-[#dce2f7] text-[#141b2b] font-label-md font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#d6e0f3]"
                  >
                    <Search className="w-4 h-4 text-[#8d4b00]" />
                    <span>Vérifier</span>
                  </button>
                </div>
                <span className="font-label-sm text-[#555f6f]">
                  Recherche par numéro de dossier ou numéro de téléphone client
                </span>
              </div>

              {/* Active Ticket Result Panel */}
              <div className="p-space-md rounded-2xl bg-[#f1f3ff] border border-[#e1e8fd] flex flex-col gap-space-md">
                <div className="flex items-center justify-between border-b pb-space-sm border-[#e1e8fd]">
                  <div>
                    <span className="font-label-sm text-[#555f6f] uppercase font-semibold">
                      Dossier en cours
                    </span>
                    <p className="font-title-md font-bold text-[#141b2b]">
                      {trackedTicket.id}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      trackedTicket.status === 'Dépanné'
                        ? 'bg-[#6ffbbe]/40 text-[#002113]'
                        : trackedTicket.status === 'Technicien en route'
                        ? 'bg-[#ffdcc3] text-[#2f1500]'
                        : 'bg-[#e1e8fd] text-[#141b2b]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        trackedTicket.status === 'Dépanné'
                          ? 'bg-[#00a572]'
                          : trackedTicket.status === 'Technicien en route'
                          ? 'bg-[#8d4b00] animate-ping'
                          : 'bg-[#555f6f]'
                      }`}
                    ></span>
                    {trackedTicket.status}
                  </span>
                </div>

                {/* Timeline Milestones */}
                <div className="flex flex-col gap-3">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-[#00a572] text-white flex items-center justify-center font-bold text-xs">
                        ✓
                      </div>
                      <div className="w-0.5 h-6 bg-[#00a572]"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-[#141b2b] font-bold">
                        1. Pris en charge par le Dispatch
                      </span>
                      <span className="font-body-sm text-[#554336]">
                        Ticket validé et raccordé au technicien de zone
                      </span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          trackedTicket.status === 'Technicien en route' || trackedTicket.status === 'Dépanné'
                            ? 'bg-[#8d4b00] text-white'
                            : 'bg-[#e1e8fd] text-[#555f6f]'
                        }`}
                      >
                        {trackedTicket.status === 'Dépanné' ? '✓' : '2'}
                      </div>
                      <div className="w-0.5 h-6 bg-[#dce2f7]"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-[#8d4b00] font-bold">
                        2. Technicien en route (ETA: 18 min)
                      </span>
                      <span className="font-body-sm text-[#554336]">
                        {trackedTicket.technician}
                      </span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className={`flex items-start gap-3 ${trackedTicket.status === 'Dépanné' ? '' : 'opacity-50'}`}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          trackedTicket.status === 'Dépanné'
                            ? 'bg-[#00a572] text-white'
                            : 'bg-[#e1e8fd] text-[#555f6f]'
                        }`}
                      >
                        3
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-[#141b2b] font-bold">
                        3. Rétablissement & Dépanné
                      </span>
                      <span className="font-body-sm text-[#554336]">
                        Essai à blanc, contrôle de phase & rapport certifié
                      </span>
                    </div>
                  </div>
                </div>

                {/* Call line */}
                <div className="p-3 rounded-xl bg-[#ffffff] border border-[#e1e8fd] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-[#8d4b00]" />
                    <span className="font-label-sm text-[#141b2b] font-semibold">
                      Liaison Chauffeur Astreinte
                    </span>
                  </div>
                  <a
                    href="tel:+21671889012"
                    className="font-label-sm font-bold text-[#8d4b00] hover:underline"
                  >
                    +216 71 889 012
                  </a>
                </div>
              </div>
            </div>

            {/* Field Service Satellite Map Component */}
            <div className="bg-[#ffffff] rounded-2xl p-space-lg shadow-sm border border-[#e1e8fd] flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm font-bold text-[#141b2b]">
                  Périmètre d'Intervention Rapide
                </span>
                <span className="font-label-sm text-[#8d4b00] uppercase font-bold">
                  Couverture Active
                </span>
              </div>
              <p className="font-body-sm text-[#554336]">
                Positionnement en direct des bases logistiques de secours mobiles couvrant Tunis Nord, Banlieue et Ceinture Urbaine.
              </p>

              <div
                className="w-full h-48 bg-cover bg-center rounded-xl shadow-inner overflow-hidden relative mt-2 border border-[#e1e8fd]"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDX6B25MR6UqXCzcMBMs3uEkYz4rTA8Qv1PRcJ9QoBFdyfzPaP_97_tiO8xc2SWs7I9r7y20aR0O8JIP11CiOrul9oB2bdsG4kY269mIMpbaqOlSvWgf0tomq-AXfw-AZJtlkyNNJn13HZDy3ZdnbxtfWhC5XU46I3s298mGHp6yH3MrfNzFVJtFUQTKs0gP8ggCDQldpvvUdn7Q8xha2emiexZlhb48mms62Y6FX6z_wbN3o-jnDVvKQ')`,
                }}
              >
                <div className="absolute inset-0 bg-[#293040]/20 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur text-[#141b2b] shadow-md font-label-sm font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00a572] animate-pulse"></span>
                    <span>Grand Tunis : 100% Maillé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Specs Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="p-space-lg rounded-2xl bg-[#ffffff] border border-[#e1e8fd] shadow-sm flex flex-col gap-space-xs">
            <AlertTriangle className="w-8 h-8 text-[#8d4b00]" />
            <h3 className="font-title-md text-[#141b2b] font-bold">
              Consignes en Cas de Délestage STEG
            </h3>
            <p className="font-body-sm text-[#554336] leading-relaxed">
              Ne forcez pas manuellement l'inverseur si le voyant de synchronisation clignote. Le coffret ATS applique une temporisation de sécurité de 15 secondes pour stabiliser la fréquence.
            </p>
          </div>

          <div className="p-space-lg rounded-2xl bg-[#ffffff] border border-[#e1e8fd] shadow-sm flex flex-col gap-space-xs">
            <Fuel className="w-8 h-8 text-[#8d4b00]" />
            <h3 className="font-title-md text-[#141b2b] font-bold">
              Qualité Carburant & Additifs
            </h3>
            <p className="font-body-sm text-[#554336] leading-relaxed">
              Nos unités de ravitaillement injectent du gasoil 50 ppm purifié avec biocide et stabilisateur antioxydant, évitant le colmatage des injecteurs Common-Rail sous fortes chaleurs.
            </p>
          </div>

          <div className="p-space-lg rounded-2xl bg-[#ffffff] border border-[#e1e8fd] shadow-sm flex flex-col gap-space-xs">
            <Shield className="w-8 h-8 text-[#8d4b00]" />
            <h3 className="font-title-md text-[#141b2b] font-bold">
              Garantie Intervention Zéro Risque
            </h3>
            <p className="font-body-sm text-[#554336] leading-relaxed">
              Chaque dépannage inclut la vérification thermique à infrarouge des disjoncteurs différentiels 30mA pour éliminer tout risque d'arc électrique dans votre tableau principal.
            </p>
          </div>
        </div>

        {/* ADMIN DASHBOARD CONSOLE (Visible when PIN 1234 validated) */}
        {isAdminUnlocked && (
          <section className="w-full bg-[#f1f3ff] rounded-3xl p-space-lg lg:p-space-xl border-2 border-[#8d4b00]/30 shadow-lg mt-space-md animate-fadeIn">
            <div className="flex flex-col gap-space-xl">
              {/* Admin Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-[#ffffff] p-space-lg rounded-2xl shadow-sm border border-[#e1e8fd]">
                <div className="flex items-center gap-space-md">
                  <div className="w-12 h-12 rounded-xl bg-[#293040] text-white flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#6ffbbe]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm font-bold text-[#141b2b]">
                        Console de Commandement VOLT Tunis
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] font-label-sm font-bold text-xs">
                        Session Active
                      </span>
                    </div>
                    <p className="font-body-sm text-[#554336]">
                      Poste de Supervision : Flotte, Devis Résidentiels & Déploiements d'Urgence STEG
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm">
                  <button
                    onClick={exportJSONLog}
                    className="px-4 py-2 rounded-xl bg-[#e1e8fd] text-[#141b2b] hover:bg-[#dce2f7] font-label-md text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-[#d6e0f3]"
                  >
                    <Download className="w-4 h-4 text-[#8d4b00]" />
                    <span>Journal (.JSON)</span>
                  </button>
                  <button
                    onClick={onLockAdmin}
                    className="px-4 py-2 rounded-xl bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ffb4ab] font-label-md text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <LockKeyhole className="w-4 h-4" />
                    <span>Verrouiller</span>
                  </button>
                </div>
              </div>

              {/* 4 Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                <div className="p-space-lg rounded-2xl bg-[#ffffff] shadow-sm border border-[#e1e8fd] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-[#555f6f] uppercase font-semibold">
                      Générateurs en Vente
                    </span>
                    <FileSpreadsheet className="w-5 h-5 text-[#8d4b00]" />
                  </div>
                  <div className="my-2 flex items-baseline gap-1">
                    <span className="font-metric-numeral text-3xl font-bold text-[#141b2b]">4</span>
                    <span className="font-label-md text-[#554336]">Gammes Certifiées</span>
                  </div>
                  <div className="font-body-sm text-[#006c49] flex items-center gap-1 font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 3.5, 6.5, 10, 15 kVA
                  </div>
                </div>

                <div className="p-space-lg rounded-2xl bg-[#ffffff] shadow-sm border border-[#e1e8fd] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-[#555f6f] uppercase font-semibold">
                      Devis en Attente
                    </span>
                    <Activity className="w-5 h-5 text-[#8d4b00]" />
                  </div>
                  <div className="my-2 flex items-baseline gap-1">
                    <span className="font-metric-numeral text-3xl font-bold text-[#8d4b00]">
                      {pendingQuotesCount}
                    </span>
                    <span className="font-label-md text-[#554336]">Dossiers</span>
                  </div>
                  <div className="font-body-sm text-[#554336] text-xs">
                    Validation technique en cours
                  </div>
                </div>

                <div className="p-space-lg rounded-2xl bg-[#ffffff] shadow-sm border border-[#e1e8fd] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-[#555f6f] uppercase font-semibold">
                      Locations Actives
                    </span>
                    <Car className="w-5 h-5 text-[#8d4b00]" />
                  </div>
                  <div className="my-2 flex items-baseline gap-1">
                    <span className="font-metric-numeral text-3xl font-bold text-[#141b2b]">19</span>
                    <span className="font-label-md text-[#554336]">Unités Déployées</span>
                  </div>
                  <div className="font-body-sm text-[#006c49] font-bold text-xs">
                    Taux d'utilisation 94.2%
                  </div>
                </div>

                <div className="p-space-lg rounded-2xl bg-[#ffffff] shadow-sm border border-[#e1e8fd] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-[#ba1a1a] uppercase font-bold">
                      Tickets Dépannage
                    </span>
                    <AlertTriangle className="w-5 h-5 text-[#ba1a1a]" />
                  </div>
                  <div className="my-2 flex items-baseline gap-1">
                    <span className="font-metric-numeral text-3xl font-bold text-[#ba1a1a]">
                      {pendingEmergencyCount}
                    </span>
                    <span className="font-label-md text-[#554336]">Interventions</span>
                  </div>
                  <div className="font-body-sm text-[#554336] text-xs">
                    {tickets.filter((t) => t.status === 'Technicien en route').length} en route
                  </div>
                </div>
              </div>

              {/* Workspace Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
                {/* Table 1: Emergency SAV Dispatch */}
                <div className="lg:col-span-7 bg-[#ffffff] rounded-2xl p-space-lg shadow-sm border border-[#e1e8fd] flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-title-md text-[#141b2b] font-bold">
                        Astreinte & Dépannages en Cours
                      </h3>
                      <p className="font-body-sm text-[#554336]">
                        Modification du statut et attribution des techniciens
                      </p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-body-sm">
                      <thead className="bg-[#f1f3ff] text-[#555f6f] uppercase font-label-sm text-[11px]">
                        <tr>
                          <th className="p-3 rounded-l-xl">Réf / Heure</th>
                          <th className="p-3">Client & Zone</th>
                          <th className="p-3">Panne</th>
                          <th className="p-3">Technicien</th>
                          <th className="p-3 rounded-r-xl">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f1f3ff]">
                        {tickets.map((t) => (
                          <tr key={t.id} className="hover:bg-[#f9f9ff] transition-colors">
                            <td className="p-3">
                              <div className="font-bold text-[#141b2b]">{t.id}</div>
                              <div className="text-[#555f6f] text-xs">{t.timestamp}</div>
                            </td>
                            <td className="p-3">
                              <div className="font-semibold text-[#141b2b]">{t.client}</div>
                              <div className="text-[#555f6f] text-xs">{t.zone}</div>
                            </td>
                            <td className="p-3 max-w-[140px]">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  t.urgency === 'Critique'
                                    ? 'bg-[#ffdad6] text-[#ba1a1a]'
                                    : 'bg-[#ffdcc3] text-[#8d4b00]'
                                }`}
                              >
                                {t.urgency}
                              </span>
                              <div className="truncate text-xs text-[#554336] mt-0.5" title={t.issue}>
                                {t.issue}
                              </div>
                            </td>
                            <td className="p-3">
                              <select
                                value={t.technician}
                                onChange={(e) => onUpdateTicketTech(t.id, e.target.value)}
                                className="h-8 px-2 rounded-lg bg-[#f1f3ff] text-[#141b2b] text-xs border border-[#dce2f7] focus:outline-none"
                              >
                                <option value="Ing. Mehdi Trabelsi (Véhicule VOLT-04)">Ing. Mehdi T. (Nord)</option>
                                <option value="T. Anis Riahi (Véhicule VOLT-02)">T. Anis R. (Marsa)</option>
                                <option value="Équipe Citerne C1">Équipe Citerne C1</option>
                                <option value="Non Assigné">Non Assigné</option>
                              </select>
                            </td>
                            <td className="p-3">
                              <select
                                value={t.status}
                                onChange={(e) => onUpdateTicketStatus(t.id, e.target.value as any)}
                                className={`h-8 px-2 rounded-lg font-bold text-xs border focus:outline-none ${
                                  t.status === 'Dépanné'
                                    ? 'bg-[#6ffbbe]/40 text-[#002113] border-[#00a572]'
                                    : t.status === 'Technicien en route'
                                    ? 'bg-[#ffdcc3] text-[#2f1500] border-[#8d4b00]'
                                    : 'bg-[#e1e8fd] text-[#141b2b] border-[#d6e0f3]'
                                }`}
                              >
                                <option value="Pris en charge">Pris en charge</option>
                                <option value="Technicien en route">En route</option>
                                <option value="Dépanné">Dépanné</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table 2: Quotes Workflow */}
                <div className="lg:col-span-5 bg-[#ffffff] rounded-2xl p-space-lg shadow-sm border border-[#e1e8fd] flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-title-md text-[#141b2b] font-bold">
                        Demandes de Devis Résidentiels
                      </h3>
                      <p className="font-body-sm text-[#554336]">
                        Validation de dimensionnement et confirmation
                      </p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-body-sm">
                      <thead className="bg-[#f1f3ff] text-[#555f6f] uppercase font-label-sm text-[11px]">
                        <tr>
                          <th className="p-3 rounded-l-xl">Client</th>
                          <th className="p-3">Puissance</th>
                          <th className="p-3">Statut</th>
                          <th className="p-3 rounded-r-xl text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f1f3ff]">
                        {quotes.map((q) => (
                          <tr key={q.id} className="hover:bg-[#f9f9ff] transition-colors">
                            <td className="p-3">
                              <div className="font-semibold text-[#141b2b]">{q.client}</div>
                              <div className="text-[#555f6f] text-xs">{q.zone}</div>
                            </td>
                            <td className="p-3 font-medium text-xs text-[#141b2b]">
                              {q.kva}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  q.status === 'Confirmé'
                                    ? 'bg-[#6ffbbe]/40 text-[#002113]'
                                    : 'bg-[#e1e8fd] text-[#555f6f]'
                                }`}
                              >
                                {q.status}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              {q.status === 'En attente' ? (
                                <button
                                  onClick={() => onConfirmQuote(q.id)}
                                  className="px-3 py-1 rounded-lg bg-[#8d4b00] text-white hover:bg-[#b15f00] font-label-sm text-xs font-bold cursor-pointer transition-colors shadow-xs"
                                >
                                  Confirmer
                                </button>
                              ) : (
                                <CheckCircle2 className="w-5 h-5 text-[#006c49] inline-block" />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
