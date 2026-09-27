import React, { useState } from 'react';
import { GensetProduct } from '../../types';
import { GENSET_PRODUCTS } from '../../data/mockData';
import {
  ShieldCheck,
  CheckCircle2,
  Filter,
  ShoppingCart,
  FileText,
  Clock,
  Fuel,
  Volume2,
  Wrench,
  Warehouse,
  Flame,
} from 'lucide-react';

interface SalesScreenProps {
  onOpenBooking: (product: GensetProduct) => void;
  onOpenTechSpecs: (specIndex: number) => void;
}

export const SalesScreen: React.FC<SalesScreenProps> = ({
  onOpenBooking,
  onOpenTechSpecs,
}) => {
  const [selectedPower, setSelectedPower] = useState<string>('all');
  const [selectedAts, setSelectedAts] = useState<string>('all');
  const [selectedStock, setSelectedStock] = useState<string>('all');

  // Filter logic
  const filteredProducts = GENSET_PRODUCTS.filter((item) => {
    const matchPower =
      selectedPower === 'all' || item.powerNum.toString() === selectedPower;
    const matchAts = selectedAts === 'all' || item.atsType === selectedAts;
    const matchStock = selectedStock === 'all' || item.stockType === selectedStock;
    return matchPower && matchAts && matchStock;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Top Banner Metrology */}
      <div className="relative w-full bg-[#f1f3ff] py-space-xl overflow-hidden border-b border-[#e1e8fd]">
        <div className="max-w-[1440px] mx-auto px-margin">
          {/* Overline Metrology */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
            <div className="flex items-center gap-2 text-[#555f6f] font-label-sm uppercase tracking-widest font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00a572] animate-pulse"></span>
              <span>Standards STEG & IEC 60034-1 Certifiés</span>
              <span className="text-[#dbc2b0]">/</span>
              <span>Grand Tunis Fast-Track</span>
            </div>
            <div className="flex items-center gap-space-md font-label-sm text-[#555f6f] bg-[#ffffff] px-space-md py-1 rounded-lg shadow-xs border border-[#e1e8fd]">
              <span>
                TENSION RÉSIDENTIELLE : <strong>230V / 400V ±1.5%</strong>
              </span>
              <span className="text-[#dbc2b0]">•</span>
              <span>
                INSONORISATION : <strong>≤ 65 dB(A) @ 7M</strong>
              </span>
            </div>
          </div>

          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-end mb-space-lg">
            <div className="lg:col-span-8 space-y-space-xs">
              <span className="font-label-md uppercase tracking-wider text-[#8d4b00] font-bold">
                Catalogue Ingénierie Résidentielle
              </span>
              <h1 className="font-headline-lg text-[#141b2b] tracking-tight">
                Gamme Générateurs Diesel Silencieux pour Résidences & Villas
              </h1>
              <p className="font-body-md text-[#554336] max-w-3xl leading-relaxed">
                Groupes électrogènes insonorisés à commutation automatique (ATS) conçus pour pallier instantanément les délestages et micro-coupures de la STEG. Moteurs thermiques calibrés pour les climats méditerranéens avec isolation phonique triple couche.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end gap-space-sm">
              <div className="bg-[#ffffff] p-space-sm rounded-xl shadow-sm border border-[#e1e8fd] flex items-center gap-space-sm">
                <ShieldCheck className="w-8 h-8 text-[#8d4b00]" />
                <div>
                  <p className="font-title-md text-[#141b2b] font-bold leading-tight">Garantie 3 Ans</p>
                  <p className="font-body-sm text-[#555f6f]">Pièces, main-d'œuvre & astreinte 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Console */}
          <div className="bg-[#ffffff] p-space-md rounded-2xl shadow-sm border border-[#e1e8fd] mb-space-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-start">
              {/* Filter 1: Power */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-sm uppercase text-[#555f6f] tracking-wider flex items-center justify-between font-bold">
                  <span>Capacité Nominale</span>
                  <span className="text-[#8d4b00]">{selectedPower === 'all' ? 'Tous' : `${selectedPower} kVA`}</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'Tous' },
                    { id: '3.5', label: '3.5 kVA' },
                    { id: '6.5', label: '6.5 kVA' },
                    { id: '10', label: '10 kVA' },
                    { id: '15', label: '15 kVA' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setSelectedPower(btn.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedPower === btn.id
                          ? 'bg-[#293040] text-white shadow-xs'
                          : 'bg-[#e1e8fd] text-[#141b2b] hover:bg-[#dce2f7]'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 2: ATS */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-sm uppercase text-[#555f6f] tracking-wider flex items-center justify-between font-bold">
                  <span>Configuration Inverseur (ATS)</span>
                  <span className="text-[#8d4b00]">
                    {selectedAts === 'all' ? 'Tous' : selectedAts === 'ats-inclus' ? 'ATS Inclus' : selectedAts === 'ats-ready' ? 'ATS-Ready' : 'Démarrage Élec'}
                  </span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'Tous' },
                    { id: 'ats-inclus', label: 'ATS Inclus' },
                    { id: 'ats-ready', label: 'ATS-Ready' },
                    { id: 'electrique', label: 'Démarrage Élec' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setSelectedAts(btn.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedAts === btn.id
                          ? 'bg-[#293040] text-white shadow-xs'
                          : 'bg-[#e1e8fd] text-[#141b2b] hover:bg-[#dce2f7]'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 3: Stock */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-label-sm uppercase text-[#555f6f] tracking-wider flex items-center justify-between font-bold">
                  <span>Disponibilité Tunis & Environs</span>
                  <span className="text-[#006c49]">
                    {selectedStock === 'all' ? 'Tous' : selectedStock === 'immediat' ? 'Immédiat' : 'Sous 72h'}
                  </span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'Tous stocks' },
                    { id: 'immediat', label: 'Stock Immédiat (48h)' },
                    { id: '72h', label: 'Sous 72h' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setSelectedStock(btn.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedStock === btn.id
                          ? 'bg-[#293040] text-white shadow-xs'
                          : 'bg-[#e1e8fd] text-[#141b2b] hover:bg-[#dce2f7]'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Mosaic Area */}
      <div className="max-w-[1440px] mx-auto px-margin py-space-xl w-full">
        <div className="flex items-center justify-between pb-space-md mb-space-lg border-b border-[#e1e8fd]">
          <div className="flex items-center gap-2 font-label-md text-[#555f6f]">
            <Filter className="w-4 h-4 text-[#8d4b00]" />
            <span>Unités compatibles filtrées :</span>
            <span className="font-bold text-[#141b2b]">
              {filteredProducts.length} modèle{filteredProducts.length > 1 ? 's' : ''} d'ingénierie
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-space-md text-xs text-[#555f6f]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00a572]"></span> Déploiement direct Banlieue Nord
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8d4b00]"></span> Inverseur certifié IEC 60947-6-1
            </span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter items-stretch">
          {filteredProducts.map((prod) => {
            const originalIndex = GENSET_PRODUCTS.findIndex((p) => p.id === prod.id);

            return (
              <article
                key={prod.id}
                className="flex flex-col bg-[#ffffff] rounded-2xl shadow-sm hover:shadow-xl border border-[#e1e8fd] transition-all duration-300 relative group overflow-hidden"
              >
                {/* Ribbon for Best Seller */}
                {prod.isBestSeller && (
                  <div className="absolute -right-12 top-6 rotate-45 bg-[#8d4b00] text-white font-label-sm py-1 px-12 uppercase tracking-widest text-center shadow-md text-[10px] font-bold z-10">
                    BEST SELLER
                  </div>
                )}

                {/* Status Bar */}
                <div className="p-space-md pb-0 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-lg overflow-hidden shadow-xs border border-[#d6e0f3]">
                    <span className="bg-[#293040] text-[#d9e3f6] text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                      RATED
                    </span>
                    <span className="bg-[#e9edff] text-[#141b2b] font-metric-numeral text-xs px-2.5 py-0.5">
                      {prod.powerNum.toFixed(1)} <span className="text-[#8d4b00] font-bold">kVA</span>
                    </span>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg ${
                    prod.stockType === 'immediat' ? 'text-[#006c49] bg-[#6ffbbe]/20' : 'text-[#8d4b00] bg-[#ffdcc3]/40'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${prod.stockType === 'immediat' ? 'bg-[#00a572]' : 'bg-[#8d4b00]'}`}></span>
                    {prod.stockType === 'immediat' ? 'Immédiat' : 'Sous 72h'}
                  </span>
                </div>

                {/* Vector Schematic Graphic */}
                <div className="p-space-md flex flex-col items-center justify-center bg-[#ffffff] relative">
                  <div className="w-full h-44 flex items-center justify-center relative bg-[#f1f3ff] rounded-xl p-3 border border-[#e1e8fd]">
                    {/* SVG Graphic based on model */}
                    {prod.powerNum === 3.5 && (
                      <svg className="w-full h-full text-[#555f6f]" fill="none" stroke="currentColor" viewBox="0 0 200 130">
                        <rect className="text-[#293040]" fill="#ffffff" height="85" rx="6" strokeWidth="2" width="150" x="25" y="25" />
                        <rect height="65" rx="3" strokeDasharray="3 3" strokeWidth="1.5" width="85" x="35" y="35" />
                        <rect fill="currentColor" height="12" rx="1" width="4" x="110" y="65" />
                        <line className="text-[#8d4b00]" strokeWidth="2" x1="130" x2="165" y1="40" y2="40" />
                        <line className="text-[#8d4b00]" strokeWidth="2" x1="130" x2="165" y1="48" y2="48" />
                        <line className="text-[#8d4b00]" strokeWidth="2" x1="130" x2="165" y1="56" y2="56" />
                        <rect fill="#141b2b" height="24" rx="2" width="34" x="42" y="45" />
                        <circle cx="48" cy="52" fill="#4edea3" r="1.5" />
                        <circle cx="53" cy="52" fill="#ffdcc3" r="1.5" />
                        <line stroke="#6ffbbe" strokeWidth="1.5" x1="60" x2="70" y1="52" y2="52" />
                        <rect fill="#293040" height="5" rx="1" width="20" x="35" y="110" />
                        <rect fill="#293040" height="5" rx="1" width="20" x="145" y="110" />
                      </svg>
                    )}
                    {prod.powerNum === 6.5 && (
                      <svg className="w-full h-full text-[#555f6f]" fill="none" stroke="currentColor" viewBox="0 0 200 130">
                        <rect fill="#ffffff" height="90" rx="8" strokeWidth="2" width="160" x="20" y="20" />
                        <rect height="70" rx="2" strokeDasharray="2 2" strokeWidth="1.5" width="65" x="30" y="30" />
                        <rect height="70" rx="2" strokeDasharray="2 2" strokeWidth="1.5" width="70" x="100" y="30" />
                        <rect fill="#b15f00" height="15" rx="1" width="22" x="140" y="75" />
                        <circle cx="146" cy="82" fill="#ffffff" r="1.5" />
                        <circle cx="156" cy="82" fill="#ffffff" r="1.5" />
                        <text fill="#8d4b00" fontFamily="monospace" fontSize="6" x="141" y="71">ATS PORT</text>
                        <path d="M40 45 H75 M40 53 H75 M40 61 H75 M40 69 H75" strokeWidth="2" />
                        <rect fill="#141b2b" height="26" rx="2" width="45" x="108" y="38" />
                        <rect fill="#00311f" height="12" rx="1" width="22" x="114" y="44" />
                        <line stroke="#6ffbbe" strokeWidth="1.5" x1="116" x2="132" y1="50" y2="50" />
                        <rect fill="#121c2a" height="6" rx="1" width="24" x="30" y="110" />
                        <rect fill="#121c2a" height="6" rx="1" width="24" x="146" y="110" />
                      </svg>
                    )}
                    {prod.powerNum === 10.0 && (
                      <svg className="w-full h-full text-[#555f6f]" fill="none" stroke="currentColor" viewBox="0 0 200 130">
                        <rect fill="#e9edff" height="98" rx="8" strokeWidth="2" width="170" x="15" y="15" />
                        <rect className="text-[#006c49]" height="70" rx="3" strokeWidth="1.5" width="40" x="25" y="28" />
                        <line className="text-[#006c49]" strokeWidth="1.5" x1="30" x2="60" y1="38" y2="38" />
                        <line className="text-[#006c49]" strokeWidth="1.5" x1="30" x2="60" y1="48" y2="48" />
                        <line className="text-[#006c49]" strokeWidth="1.5" x1="30" x2="60" y1="58" y2="58" />
                        <rect fill="#ffffff" height="70" rx="2" stroke="#141b2b" strokeWidth="1.5" width="60" x="75" y="28" />
                        <rect fill="#141b2b" height="28" rx="2" width="44" x="83" y="36" />
                        <text fill="#6ffbbe" fontFamily="monospace" fontSize="8" x="88" y="52">ATS ACTIVE</text>
                        <circle cx="92" cy="72" fill="#00a572" r="3" />
                        <circle cx="105" cy="72" fill="#dce2f7" r="3" />
                        <circle cx="118" cy="72" fill="#ba1a1a" r="3" />
                        <circle className="text-[#8d4b00]" cx="160" cy="45" r="7" strokeWidth="1.5" />
                        <circle cx="160" cy="45" fill="#8d4b00" r="3" />
                        <rect fill="#141b2b" height="6" rx="2" width="160" x="20" y="113" />
                      </svg>
                    )}
                    {prod.powerNum === 15.0 && (
                      <svg className="w-full h-full text-[#555f6f]" fill="none" stroke="currentColor" viewBox="0 0 200 130">
                        <rect fill="#dce2f7" height="105" rx="8" strokeWidth="2" width="180" x="10" y="10" />
                        <circle cx="20" cy="18" r="3" strokeWidth="1.5" />
                        <circle cx="180" cy="18" r="3" strokeWidth="1.5" />
                        <rect height="70" rx="3" strokeWidth="1.5" width="46" x="22" y="32" />
                        <line strokeWidth="1.5" x1="35" x2="55" y1="50" y2="50" />
                        <line strokeWidth="1.5" x1="35" x2="55" y1="65" y2="65" />
                        <rect fill="#ffffff" height="70" rx="3" stroke="#141b2b" strokeWidth="1.5" width="48" x="76" y="32" />
                        <circle className="text-[#8d4b00]" cx="100" cy="62" r="14" strokeWidth="1.5" />
                        <text fill="#8d4b00" fontFamily="monospace" fontSize="7" x="89" y="65">1500 RPM</text>
                        <rect height="70" rx="3" strokeWidth="1.5" width="48" x="132" y="32" />
                        <rect fill="#141b2b" height="24" rx="2" width="36" x="138" y="40" />
                        <polyline fill="none" points="142,55 148,48 154,58 162,46 168,52" stroke="#4edea3" strokeWidth="1.5" />
                        <rect fill="#121c2a" height="8" rx="2" width="176" x="12" y="115" />
                      </svg>
                    )}
                    <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-0.5 rounded-md shadow-xs text-[11px] font-semibold text-[#555f6f]">
                      {prod.noise}
                    </div>
                  </div>
                </div>

                {/* Specs & Description */}
                <div className="px-space-md flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#8d4b00] uppercase tracking-wider mb-1">
                      {prod.targetUse}
                    </div>
                    <h3 className="font-headline-sm text-[#141b2b] font-bold leading-snug">
                      {prod.name}
                    </h3>
                    <p className="font-body-sm text-[#554336] mt-1 line-clamp-2">
                      {prod.description}
                    </p>

                    <div className="grid grid-cols-2 gap-space-xs mt-space-sm pt-space-xs bg-[#f1f3ff] p-2 rounded-xl text-xs">
                      <div className="flex items-center gap-1.5 text-[#555f6f]">
                        <Fuel className="w-3.5 h-3.5 text-[#887364]" />
                        <span>{prod.fuelTank.split(' ')[0]} L</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#555f6f]">
                        <Clock className="w-3.5 h-3.5 text-[#006c49]" />
                        <span>{prod.autonomy.split(' ')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#555f6f] col-span-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8d4b00]" />
                        <span className="truncate">{prod.atsLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="mt-space-md pt-space-sm border-t border-[#e1e8fd]">
                    <div className="flex items-baseline justify-between mb-space-sm">
                      <span className="font-label-sm text-[#555f6f] uppercase">
                        Tarif Direct Clé en main
                      </span>
                      <div className="text-right">
                        <span className="font-metric-numeral text-2xl text-[#141b2b]">
                          {prod.price.toLocaleString()}
                        </span>
                        <span className="font-label-sm font-bold text-[#8d4b00] ml-1">
                          TND TTC
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mb-space-sm">
                      <button
                        onClick={() => onOpenBooking(prod)}
                        className="w-full py-2.5 px-3 bg-[#8d4b00] text-white hover:bg-[#b15f00] font-label-md rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs font-semibold"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Commander / Réserver</span>
                      </button>
                      <button
                        onClick={() => onOpenTechSpecs(originalIndex >= 0 ? originalIndex : 0)}
                        className="w-full py-2 px-3 bg-[#e1e8fd] text-[#141b2b] hover:bg-[#dce2f7] font-label-md rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs font-semibold border border-[#d6e0f3]"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#8d4b00]" />
                        <span>Fiche technique complète</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Technical Infrastructure & Assurance Blueprint Strip */}
      <div className="w-full bg-[#f1f3ff] py-space-xl border-t border-[#e1e8fd]">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="p-space-lg rounded-2xl bg-[#ffffff] shadow-sm border border-[#e1e8fd] flex flex-col gap-space-xs">
              <div className="w-10 h-10 rounded-xl bg-[#ffdcc3] flex items-center justify-center text-[#8d4b00]">
                <Wrench className="w-5 h-5" />
              </div>
              <h4 className="font-title-md text-[#141b2b] font-bold">
                Installation Agréée STEG
              </h4>
              <p className="font-body-sm text-[#554336] leading-relaxed">
                Inverseur de source avec verrouillage mécanique et électrique empêchant tout retour de courant intempestif sur le réseau public tunisien.
              </p>
            </div>

            <div className="p-space-lg rounded-2xl bg-[#ffffff] shadow-sm border border-[#e1e8fd] flex flex-col gap-space-xs">
              <div className="w-10 h-10 rounded-xl bg-[#6ffbbe] flex items-center justify-center text-[#002113]">
                <Volume2 className="w-5 h-5 text-[#006c49]" />
              </div>
              <h4 className="font-title-md text-[#141b2b] font-bold">
                Capotage Acoustique Résidentiel
              </h4>
              <p className="font-body-sm text-[#554336] leading-relaxed">
                Conception multi-chicanes avec laine de roche haute densité assurant une pression acoustique conforme au voisinage urbain de Tunis (La Marsa, Ennasr).
              </p>
            </div>

            <div className="p-space-lg rounded-2xl bg-[#ffffff] shadow-sm border border-[#e1e8fd] flex flex-col gap-space-xs">
              <div className="w-10 h-10 rounded-xl bg-[#d9e3f6] flex items-center justify-center text-[#121c2a]">
                <Warehouse className="w-5 h-5 text-[#555f6f]" />
              </div>
              <h4 className="font-title-md text-[#141b2b] font-bold">
                Stock de Pièces Détachées en Tunisie
              </h4>
              <p className="font-body-sm text-[#554336] leading-relaxed">
                Filtres, cartes électroniques AVR, bougies de préchauffage et injecteurs en stock immédiat au centre logistique de la Charguia II.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
