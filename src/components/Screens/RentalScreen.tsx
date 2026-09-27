import React, { useState, useEffect, useRef } from 'react';
import { RentalPack, RentalBookingVoucher } from '../../types';
import { RENTAL_PACKS } from '../../data/mockData';
import {
  Bolt,
  Truck,
  CheckCircle2,
  Volume2,
  Calendar,
  Calculator,
  ArrowDown,
  Printer,
  PlusCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Fuel,
  VolumeX,
} from 'lucide-react';

export const RentalScreen: React.FC = () => {
  const [selectedPackKey, setSelectedPackKey] = useState<'secours' | 'serenite' | 'evenement'>('serenite');

  // Dates: today & today+3
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [optDelivery, setOptDelivery] = useState(true);
  const [optFuel, setOptFuel] = useState(false);

  // Booking form
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientZone, setClientZone] = useState('La Marsa / Gammarth / Sidi Bou Saïd');
  const [clientAddress, setClientAddress] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [voucher, setVoucher] = useState<RentalBookingVoucher | null>(null);

  const simulatorRef = useRef<HTMLDivElement>(null);
  const reservationFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + 3);

    const pad = (n: number) => n.toString().padStart(2, '0');
    const startStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
    const endStr = `${future.getFullYear()}-${pad(future.getMonth() + 1)}-${pad(future.getDate())}`;

    setStartDate(startStr);
    setEndDate(endStr);
  }, []);

  const pack = RENTAL_PACKS.find((p) => p.id === selectedPackKey) || RENTAL_PACKS[1];

  // Calculate duration
  let durationDays = 3;
  if (startDate && endDate) {
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    durationDays = diffDays > 0 ? diffDays : 1;
  }

  // Cost calculation
  const weeks = Math.floor(durationDays / 7);
  const extraDays = durationDays % 7;

  let baseCost = 0;
  let standardCost = durationDays * pack.dailyRate;
  let discountAmount = 0;

  if (weeks > 0) {
    baseCost = weeks * pack.weeklyRate + extraDays * pack.dailyRate;
    discountAmount = standardCost - baseCost;
  } else {
    baseCost = durationDays * pack.dailyRate;
    discountAmount = 0;
  }

  const optionsCost = (optDelivery ? 50 : 0) + (optFuel ? 120 : 0);
  const grandTotal = baseCost + optionsCost;

  const handleSelectPack = (packId: 'secours' | 'serenite' | 'evenement') => {
    setSelectedPackKey(packId);
    if (simulatorRef.current) {
      simulatorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToReservation = () => {
    if (reservationFormRef.current) {
      reservationFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const voucherCode = `VR-2026-${randomDigits}`;

    const newVoucher: RentalBookingVoucher = {
      voucherCode,
      clientName,
      clientPhone,
      clientEmail,
      clientZone,
      clientAddress,
      clientNotes,
      packName: `${pack.title} (${pack.power.split(' ')[0]} kVA)`,
      startDate,
      endDate,
      durationDays,
      optionDelivery: optDelivery,
      optionFuel: optFuel,
      totalTTC: grandTotal,
      timestamp: new Date().toISOString(),
    };

    setVoucher(newVoucher);
    if (reservationFormRef.current) {
      reservationFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetBooking = () => {
    setVoucher(null);
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setClientAddress('');
    setClientNotes('');
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HEADER & LIVE TELEMETRY BAR */}
      <section className="w-full bg-[#f1f3ff] px-margin py-space-md border-b border-[#e1e8fd]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#8d4b00] text-white shadow-xs">
              <Bolt className="w-5 h-5 fill-white" />
            </span>
            <div>
              <span className="font-label-sm uppercase text-[#8d4b00] font-bold tracking-widest block">
                Parc Mobile Grand Tunis
              </span>
              <span className="font-headline-sm text-[#141b2b] font-bold">
                Location de Groupes Électrogènes Résidentiels
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] border border-[#e1e8fd] shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00a572] animate-pulse"></span>
              <span className="font-label-sm text-[#141b2b] font-bold">14 Unités Disponibles</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] border border-[#e1e8fd] shadow-xs">
              <Truck className="w-4 h-4 text-[#8d4b00]" />
              <span className="font-label-sm text-[#141b2b] font-bold">Livraison H+3 Tunis Nord</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] border border-[#e1e8fd] shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#006c49]" />
              <span className="font-label-sm text-[#141b2b] font-bold">Assistance STEG 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 3 PACKAGED OFFERS */}
      <section className="w-full px-margin py-space-xl bg-[#f9f9ff]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-space-sm mb-space-lg">
            <div>
              <span className="font-label-sm uppercase text-[#8d4b00] tracking-widest font-bold block mb-space-xs">
                Tarification Transparente
              </span>
              <h2 className="font-headline-lg text-[#141b2b]">
                3 Formules Clé-en-Main Résidence & Événements
              </h2>
            </div>
            <p className="font-body-sm text-[#554336] max-w-md leading-relaxed">
              Groupes capotés insonorisés récents (2024–2025) certifiés CE. Tous nos packs incluent le disjoncteur différentiel calibré et l'assistance technique.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-stretch">
            {RENTAL_PACKS.map((p) => {
              const isSelected = selectedPackKey === p.id;
              return (
                <div
                  key={p.id}
                  className={`flex flex-col bg-[#ffffff] rounded-2xl p-space-lg shadow-sm hover:shadow-xl transition-all relative overflow-hidden group border ${
                    p.recommended
                      ? 'border-[#8d4b00] ring-2 ring-[#8d4b00]/20 shadow-md'
                      : 'border-[#e1e8fd]'
                  }`}
                >
                  {p.badge && (
                    <div className="absolute top-0 right-0 bg-[#8d4b00] text-white font-label-sm uppercase px-4 py-1 rounded-bl-xl font-bold tracking-wider text-[11px] shadow-xs">
                      {p.badge}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-space-xs mb-space-sm mt-1">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#e9edff] text-[#596373] font-label-sm uppercase font-semibold">
                      {p.category}
                    </span>
                    <div className="flex items-center gap-1 text-[#554336]">
                      {p.id === 'evenement' ? (
                        <VolumeX className="w-4 h-4 text-[#006c49]" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-[#8d4b00]" />
                      )}
                      <span className="font-label-sm">{p.noise}</span>
                    </div>
                  </div>

                  <h3 className="font-headline-sm text-[#141b2b] font-bold mb-1">
                    {p.title}
                  </h3>
                  <span className="font-label-md text-[#8d4b00] font-bold mb-space-md block">
                    {p.power}
                  </span>

                  {/* Image slot */}
                  <div className="h-44 w-full rounded-xl bg-[#f1f3ff] mb-space-md overflow-hidden relative border border-[#e1e8fd]">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={p.title}
                      src={p.image}
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-[#293040]/90 backdrop-blur text-white font-label-sm text-[11px]">
                      {p.voltageLabel}
                    </div>
                  </div>

                  {/* Pricing Box */}
                  <div className="bg-[#f1f3ff] rounded-xl p-space-sm mb-space-md flex items-baseline justify-between border border-[#e1e8fd]">
                    <div>
                      <span className="font-metric-numeral text-3xl font-bold text-[#141b2b]">
                        {p.dailyRate}
                      </span>
                      <span className="font-label-md text-[#554336] ml-1">TND / jour</span>
                    </div>
                    <div className="text-right">
                      <div className="font-title-md text-[#8d4b00] font-bold">
                        {p.weeklyRate} TND{' '}
                        <span className="font-body-sm text-[#554336] font-normal">/ sem.</span>
                      </div>
                      <span className="font-label-sm text-[#006c49] font-bold">
                        Économie {p.weeklySavings} TND
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-space-xs font-body-sm text-[#554336] mb-space-lg flex-1">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#006c49] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action */}
                  <button
                    onClick={() => handleSelectPack(p.id)}
                    className={`w-full py-2.5 px-space-md rounded-xl font-label-md transition-all flex items-center justify-center gap-2 cursor-pointer text-xs font-bold ${
                      p.recommended
                        ? 'bg-[#8d4b00] text-white hover:bg-[#b15f00] shadow-sm'
                        : 'bg-[#e1e8fd] text-[#141b2b] hover:bg-[#dce2f7] border border-[#d6e0f3]'
                    }`}
                  >
                    <span>{isSelected ? '✓ Pack Sélectionné' : 'Sélectionner ce Pack'}</span>
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: SIMULATEUR DYNAMIQUE ET CALCUL DE DEVIS */}
      <section className="w-full px-margin py-space-xl bg-[#f1f3ff] border-y border-[#e1e8fd]" ref={simulatorRef} id="simulateur-section">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-gutter">
            {/* Left: Controls Panel */}
            <div className="w-full lg:w-7/12 flex flex-col gap-space-md">
              <div className="bg-[#ffffff] p-space-lg rounded-2xl shadow-sm border border-[#e1e8fd]">
                <div className="flex items-center justify-between mb-space-md">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-[#8d4b00]" />
                    <h3 className="font-headline-sm text-[#141b2b] font-bold">
                      Simulateur de Devis en Direct
                    </h3>
                  </div>
                  <span className="font-label-sm px-2.5 py-1 rounded-lg bg-[#e1e8fd] text-[#141b2b] font-bold">
                    Tarifs 2026 TTC
                  </span>
                </div>

                {/* 1. Pack choice radio */}
                <div className="mb-space-md">
                  <label className="font-label-md text-[#141b2b] font-bold mb-space-xs block">
                    1. Choisissez votre groupe électrogène
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs">
                    {RENTAL_PACKS.map((p) => {
                      const isChecked = selectedPackKey === p.id;
                      return (
                        <label
                          key={p.id}
                          onClick={() => setSelectedPackKey(p.id)}
                          className={`flex flex-col p-3 rounded-xl cursor-pointer transition-all border ${
                            isChecked
                              ? 'bg-[#ffdcc3]/30 border-[#8d4b00] ring-1 ring-[#8d4b00]'
                              : 'bg-[#f9f9ff] border-[#e1e8fd] hover:bg-[#f1f3ff]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-title-md text-[#141b2b] font-bold">
                              {p.id === 'secours' ? 'Secours' : p.id === 'serenite' ? 'Sérénité Villa' : 'Événement'}
                            </span>
                            <input
                              type="radio"
                              name="packChoice"
                              checked={isChecked}
                              onChange={() => setSelectedPackKey(p.id)}
                              className="w-4 h-4 accent-[#8d4b00]"
                            />
                          </div>
                          <span className="font-label-sm text-[#8d4b00] font-bold">
                            {p.power.split(' ')[0]} kVA
                          </span>
                          <span className="font-body-sm text-[#554336]">
                            {p.dailyRate} TND/j · {p.weeklyRate}/s
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mb-space-md">
                  <div>
                    <label className="font-label-md text-[#141b2b] font-bold mb-space-xs block">
                      2. Date de début de mise à disposition
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full h-11 px-3 bg-[#f9f9ff] text-[#141b2b] rounded-xl border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                    />
                  </div>
                  <div>
                    <label className="font-label-md text-[#141b2b] font-bold mb-space-xs block">
                      3. Date de fin de location
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full h-11 px-3 bg-[#f9f9ff] text-[#141b2b] rounded-xl border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                    />
                  </div>
                </div>

                {/* 4. Options */}
                <div className="mb-space-md">
                  <label className="font-label-md text-[#141b2b] font-bold mb-space-xs block">
                    4. Options opérationnelles
                  </label>
                  <div className="flex flex-col gap-space-xs">
                    <label className="flex items-center justify-between p-3 rounded-xl bg-[#f9f9ff] hover:bg-[#f1f3ff] transition-colors border border-[#e1e8fd] cursor-pointer">
                      <div className="flex items-center gap-space-sm">
                        <input
                          type="checkbox"
                          checked={optDelivery}
                          onChange={(e) => setOptDelivery(e.target.checked)}
                          className="w-4 h-4 accent-[#8d4b00] rounded"
                        />
                        <div>
                          <span className="font-title-md text-[#141b2b] font-bold block">
                            Livraison express & reprise Grand Tunis
                          </span>
                          <span className="font-body-sm text-[#554336]">
                            Camion plateau avec hayon & technicien de déchargement
                          </span>
                        </div>
                      </div>
                      <span className="font-label-md text-[#8d4b00] font-bold ml-2 shrink-0">
                        +50 TND
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-[#f9f9ff] hover:bg-[#f1f3ff] transition-colors border border-[#e1e8fd] cursor-pointer">
                      <div className="flex items-center gap-space-sm">
                        <input
                          type="checkbox"
                          checked={optFuel}
                          onChange={(e) => setOptFuel(e.target.checked)}
                          className="w-4 h-4 accent-[#8d4b00] rounded"
                        />
                        <div>
                          <span className="font-title-md text-[#141b2b] font-bold block">
                            Plein diesel initial complet certifié STEG
                          </span>
                          <span className="font-body-sm text-[#554336]">
                            Carburant haute pureté sans paraffine (autonomie immédiate garantie)
                          </span>
                        </div>
                      </div>
                      <span className="font-label-md text-[#8d4b00] font-bold ml-2 shrink-0">
                        +120 TND
                      </span>
                    </label>
                  </div>
                </div>

                {/* Duration summary bar */}
                <div className="p-3 rounded-xl bg-[#f1f3ff] border border-[#e1e8fd] flex items-center justify-between font-label-md text-[#141b2b]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#8d4b00]" />
                    <span>
                      Durée sélectionnée :{' '}
                      <strong className="text-[#8d4b00]">
                        {durationDays} jour{durationDays > 1 ? 's' : ''}
                      </strong>{' '}
                      ({weeks > 0 ? `${weeks} sem. ${extraDays} j` : 'court séjour'})
                    </span>
                  </div>
                  <span className={`font-bold ${weeks > 0 ? 'text-[#006c49]' : 'text-[#554336]'}`}>
                    {weeks > 0 ? 'Forfait Semaine Appliqué' : 'Tarif Journalier Standard'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Breakdown Calculation Card */}
            <div className="w-full lg:w-5/12 flex flex-col">
              <div className="bg-[#ffffff] p-space-lg rounded-2xl shadow-md border border-[#e1e8fd] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b pb-space-sm border-[#e1e8fd] mb-space-md">
                    <span className="font-label-sm uppercase text-[#555f6f] tracking-wider font-semibold">
                      Devis d'ingénierie instantané
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#6ffbbe] text-[#002113] font-label-sm font-bold">
                      En direct
                    </span>
                  </div>

                  {/* Summary */}
                  <div className="mb-space-md">
                    <h4 className="font-headline-sm text-[#141b2b] font-bold">
                      {pack.title} ({pack.power.split(' ')[0]} kVA)
                    </h4>
                    <p className="font-body-sm text-[#554336] mt-0.5">
                      {pack.category} · Mise en service Grand Tunis
                    </p>
                  </div>

                  {/* Breakdown lines */}
                  <div className="space-y-space-xs text-body-sm text-[#554336] mb-space-md">
                    <div className="flex justify-between">
                      <span>Location de base ({durationDays} jour{durationDays > 1 ? 's' : ''})</span>
                      <span className="font-bold text-[#141b2b]">{baseCost} TND</span>
                    </div>

                    {optDelivery && (
                      <div className="flex justify-between">
                        <span>Livraison & Reprise Grand Tunis</span>
                        <span className="font-bold text-[#141b2b]">+50 TND</span>
                      </div>
                    )}

                    {optFuel && (
                      <div className="flex justify-between">
                        <span>Plein diesel initial certifié</span>
                        <span className="font-bold text-[#141b2b]">+120 TND</span>
                      </div>
                    )}

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#006c49] font-bold">
                        <span>Remise Forfait Semaine(s)</span>
                        <span>-{discountAmount} TND</span>
                      </div>
                    )}
                  </div>

                  {/* Banner */}
                  <div className="p-3 rounded-xl bg-[#00a572]/10 border border-[#00a572]/20 mb-space-md flex items-center gap-2 text-[#006c49]">
                    <Sparkles className="w-5 h-5 shrink-0" />
                    <span className="font-label-sm font-semibold">
                      {discountAmount > 0
                        ? `Forfait longue durée : Vous économisez ${discountAmount} TND sur votre location !`
                        : `Maintenance et hotline technique 24/7 incluses sur le réseau Grand Tunis`}
                    </span>
                  </div>
                </div>

                {/* Total & CTA */}
                <div className="pt-space-md border-t border-[#e1e8fd]">
                  <div className="flex items-baseline justify-between mb-space-sm">
                    <div>
                      <span className="font-label-sm uppercase tracking-wider text-[#555f6f] block font-semibold">
                        Total Net TTC
                      </span>
                      <span className="font-body-sm text-[#554336]">
                        Facture conforme STEG
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-metric-numeral text-4xl text-[#8d4b00] font-bold">
                        {grandTotal}
                      </span>
                      <span className="font-title-md text-[#141b2b] font-bold ml-1">
                        TND
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={scrollToReservation}
                    className="w-full py-3 px-space-md rounded-xl bg-[#8d4b00] text-white hover:bg-[#b15f00] font-title-md transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Valider et Réserver ce Pack</span>
                  </button>

                  <span className="font-label-sm text-center block text-[#554336] mt-2">
                    Aucun débit immédiat · Confirmation d'ingénieur sous 15 min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FORMULAIRE DE RÉSERVATION AVEC GENERATION DU BON */}
      <section className="w-full px-margin py-space-xl bg-[#ffffff]" ref={reservationFormRef} id="reservation-form-section">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-[#f9f9ff] rounded-2xl p-space-lg lg:p-space-xl shadow-md border border-[#e1e8fd]">
            {!voucher ? (
              <div>
                <div className="max-w-2xl mb-space-lg">
                  <span className="font-label-sm uppercase text-[#8d4b00] font-bold tracking-widest block mb-1">
                    Étape Finale
                  </span>
                  <h3 className="font-headline-lg text-[#141b2b]">
                    Finaliser votre Réservation d'Urgence ou Événement
                  </h3>
                  <p className="font-body-md text-[#554336] mt-1">
                    Remplissez vos coordonnées d'installation à Tunis pour bloquer l'équipement sur notre planning opérationnel.
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div>
                    <label className="font-label-md text-[#141b2b] font-bold mb-1 block">
                      Nom complet ou Nom de la Société *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Karim Ben Salem"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full h-11 px-3 bg-[#ffffff] text-[#141b2b] rounded-xl border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                    />
                  </div>

                  <div>
                    <label className="font-label-md text-[#141b2b] font-bold mb-1 block">
                      Numéro de Téléphone Mobile (Tunisie) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+216 98 000 000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full h-11 px-3 bg-[#ffffff] text-[#141b2b] rounded-xl border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                    />
                  </div>

                  <div>
                    <label className="font-label-md text-[#141b2b] font-bold mb-1 block">
                      Adresse Email de confirmation *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="karim.bensalem@domaine.tn"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full h-11 px-3 bg-[#ffffff] text-[#141b2b] rounded-xl border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                    />
                  </div>

                  <div>
                    <label className="font-label-md text-[#141b2b] font-bold mb-1 block">
                      Zone de livraison dans le Grand Tunis *
                    </label>
                    <select
                      value={clientZone}
                      onChange={(e) => setClientZone(e.target.value)}
                      className="w-full h-11 px-3 bg-[#ffffff] text-[#141b2b] rounded-xl border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                    >
                      <option value="La Marsa / Gammarth / Sidi Bou Saïd">La Marsa / Gammarth / Sidi Bou Saïd</option>
                      <option value="Carthage / Le Kram / Ain Zaghouan">Carthage / Le Kram / Ain Zaghouan</option>
                      <option value="Ennasr I & II / El Menzah / Ariana">Ennasr I & II / El Menzah / Ariana</option>
                      <option value="Les Berges du Lac 1 & 2">Les Berges du Lac 1 & 2</option>
                      <option value="Autre commune du Grand Tunis">Autre commune du Grand Tunis</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-label-md text-[#141b2b] font-bold mb-1 block">
                      Adresse exacte d'installation & particularités d'accès
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Villa 14, Rue des Jasmins, La Marsa (accès plain-pied)"
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      className="w-full h-11 px-3 bg-[#ffffff] text-[#141b2b] rounded-xl border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-label-md text-[#141b2b] font-bold mb-1 block">
                      Consignes techniques particulières (facultatif)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ex: Climatiseur centralisé, coupure STEG récurrente le soir, présence tableau triphasé..."
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="w-full p-3 bg-[#ffffff] text-[#141b2b] rounded-xl border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                    />
                  </div>

                  <div className="md:col-span-2 pt-space-xs flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-[#e1e8fd] mt-2">
                    <div className="flex items-center gap-2 text-[#554336] font-body-sm">
                      <ShieldCheck className="w-4 h-4 text-[#006c49]" />
                      <span>Données protégées · Contrat de mise à disposition fourni au déchargement</span>
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#8d4b00] text-white hover:bg-[#b15f00] font-label-md shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
                    >
                      <span>Confirmer la réservation du Pack</span>
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Success Voucher Card */
              <div className="flex flex-col items-center justify-center py-space-lg text-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#00a572]/20 text-[#006c49] flex items-center justify-center mb-space-md animate-bounce">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <span className="px-3 py-1 rounded-lg bg-[#00a572] text-white font-label-md font-bold mb-space-xs text-xs">
                  RÉSERVATION ENREGISTRÉE AVEC SUCCÈS
                </span>
                <h3 className="font-headline-lg text-[#141b2b] mb-1 font-bold">
                  Votre Bon de Réservation Officiel
                </h3>
                <p className="font-body-md text-[#554336] max-w-lg mb-space-lg">
                  Un technicien d'astreinte VOLT Domestique vous contacte par téléphone dans les 15 prochaines minutes pour convenir du créneau de livraison précis.
                </p>

                {/* Ticket Box */}
                <div className="w-full max-w-xl bg-[#ffffff] p-space-lg rounded-2xl shadow-md text-left mb-space-lg border border-[#e1e8fd]">
                  <div className="flex items-center justify-between border-b border-[#e1e8fd] pb-space-sm mb-space-md">
                    <div>
                      <span className="font-label-sm text-[#555f6f] uppercase font-semibold">
                        Code Réservation
                      </span>
                      <div className="font-metric-numeral text-2xl text-[#8d4b00] font-bold tracking-wider">
                        {voucher.voucherCode}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-label-sm text-[#555f6f] uppercase font-semibold">
                        Statut
                      </span>
                      <span className="font-label-md text-[#006c49] font-bold block">
                        MATÉRIEL BLOQUÉ
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-space-sm gap-x-space-md font-body-sm mb-space-md">
                    <div>
                      <span className="text-[#555f6f] block font-label-sm">Client :</span>
                      <span className="font-bold text-[#141b2b]">{voucher.clientName}</span>
                    </div>
                    <div>
                      <span className="text-[#555f6f] block font-label-sm">Téléphone :</span>
                      <span className="font-bold text-[#141b2b]">{voucher.clientPhone}</span>
                    </div>
                    <div>
                      <span className="text-[#555f6f] block font-label-sm">Pack Matériel :</span>
                      <span className="font-bold text-[#8d4b00]">{voucher.packName}</span>
                    </div>
                    <div>
                      <span className="text-[#555f6f] block font-label-sm">Zone d'intervention :</span>
                      <span className="font-bold text-[#141b2b]">{voucher.clientZone}</span>
                    </div>
                    <div>
                      <span className="text-[#555f6f] block font-label-sm">Période :</span>
                      <span className="font-bold text-[#141b2b]">
                        Du {voucher.startDate} au {voucher.endDate} ({voucher.durationDays}j)
                      </span>
                    </div>
                    <div>
                      <span className="text-[#555f6f] block font-label-sm">Montant Total TTC :</span>
                      <span className="font-metric-numeral text-xl text-[#8d4b00] font-bold">
                        {voucher.totalTTC} TND
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#f1f3ff] p-3 rounded-xl flex items-center justify-between border border-[#e1e8fd]">
                    <span className="font-label-sm text-[#554336]">
                      Assistance dépannage réseau STEG :
                    </span>
                    <span className="font-label-md text-[#141b2b] font-bold">
                      +216 71 000 000 (Ligne 24/7)
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-space-md">
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 rounded-xl bg-[#e1e8fd] text-[#141b2b] hover:bg-[#dce2f7] font-label-md flex items-center gap-2 transition-all cursor-pointer font-semibold border border-[#d6e0f3]"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimer le reçu</span>
                  </button>
                  <button
                    onClick={resetBooking}
                    className="px-5 py-2.5 rounded-xl bg-[#8d4b00] text-white hover:bg-[#b15f00] font-label-md flex items-center gap-2 transition-all cursor-pointer font-semibold shadow-xs"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Effectuer une autre réservation</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5: SPECS & QUALITY ASSURANCE */}
      <section className="w-full px-margin py-space-xl bg-[#f1f3ff] border-t border-[#e1e8fd]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="p-space-lg rounded-2xl bg-[#ffffff] border border-[#e1e8fd] shadow-sm flex flex-col gap-space-xs">
              <div className="w-10 h-10 rounded-xl bg-[#ffdcc3] text-[#8d4b00] flex items-center justify-center mb-space-xs">
                <Bolt className="w-5 h-5 fill-[#8d4b00]" />
              </div>
              <h4 className="font-headline-sm text-[#141b2b] font-bold">
                Inverseur de Source ATS Mobile
              </h4>
              <p className="font-body-sm text-[#554336] leading-relaxed">
                Évite toute réinjection accidentelle sur le réseau public STEG. Détecte la coupure et bascule votre tableau électrique en moins de 4 secondes sans intervention humaine.
              </p>
            </div>

            <div className="p-space-lg rounded-2xl bg-[#ffffff] border border-[#e1e8fd] shadow-sm flex flex-col gap-space-xs">
              <div className="w-10 h-10 rounded-xl bg-[#6ffbbe] text-[#006c49] flex items-center justify-center mb-space-xs">
                <Volume2 className="w-5 h-5" />
              </div>
              <h4 className="font-headline-sm text-[#141b2b] font-bold">
                Isolation Acoustique Résidentielle
              </h4>
              <p className="font-body-sm text-[#554336] leading-relaxed">
                Capotage double épaisseur avec mousse absorbante ignifugée. Nos générateurs respectent le voisinage urbain à La Marsa, Gammarth et Carthage (seuils sous 54 dB(A)).
              </p>
            </div>

            <div className="p-space-lg rounded-2xl bg-[#ffffff] border border-[#e1e8fd] shadow-sm flex flex-col gap-space-xs">
              <div className="w-10 h-10 rounded-xl bg-[#d9e3f6] text-[#555f6f] flex items-center justify-center mb-space-xs">
                <Fuel className="w-5 h-5 text-[#8d4b00]" />
              </div>
              <h4 className="font-headline-sm text-[#141b2b] font-bold">
                Carburant Certifié & Nettoyé
              </h4>
              <p className="font-body-sm text-[#554336] leading-relaxed">
                Filtres séparateurs d'eau RACOR et régulation électronique AVR protégeant vos équipements électroniques sensibles (domotique, serveurs, téléviseurs OLED).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
