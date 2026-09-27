import React, { useState, useId } from 'react';
import { ScreenTab, GensetProduct, LoadItem } from '../../types';
import { INITIAL_LOAD_ITEMS, GENSET_PRODUCTS } from '../../data/mockData';
import {
  Volume2,
  RefreshCw,
  MapPin,
  CheckCircle2,
  Calculator,
  Receipt,
  PhoneCall,
  Star,
  Send,
  Truck,
  Zap,
  PowerOff,
  Radio,
  Sliders,
  Sparkles,
} from 'lucide-react';

interface HomeScreenProps {
  onNavigateTab: (tab: ScreenTab) => void;
  onOpenBooking: (product: GensetProduct) => void;
  onOpenTechSpecs: (specIndex: number) => void;
  onRequestQuoteSubmit: (quoteData: {
    client: string;
    phone: string;
    zone: string;
    propertyType: string;
    formula: string;
    kva: string;
  }) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onOpenBooking,
  onOpenTechSpecs,
  onRequestQuoteSubmit,
}) => {
  const [loadItems, setLoadItems] = useState<LoadItem[]>(INITIAL_LOAD_ITEMS);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    phone: '',
    zone: 'La Marsa / Gammarth / Carthage',
    propertyType: 'Villa individuelle avec jardin',
    formula: 'Achat & Pose Définitive',
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Load calculator math
  const totalKva = Math.round(
    loadItems
      .filter((item) => item.checked)
      .reduce((sum, item) => sum + item.kva, 0) * 10
  ) / 10;
  const totalKw = Math.round(totalKva * 0.8 * 10) / 10;
  const progressPercent = Math.min(Math.round((totalKva / 15) * 100), 100);

  // Recommended model
  let recommendedProduct: GensetProduct = GENSET_PRODUCTS[1]; // default 6.5
  let recommendedDescription =
    'Recommandé pour un foyer complet incluant le salon climatisé, réfrigérateurs et l\'informatique.';

  if (totalKva <= 3.5) {
    recommendedProduct = GENSET_PRODUCTS[0];
    recommendedDescription =
      'Recommandé pour maintenir l\'éclairage, la Wi-Fi, la télévision et votre réfrigérateur sans interruption.';
  } else if (totalKva <= 6.5) {
    recommendedProduct = GENSET_PRODUCTS[1];
    recommendedDescription =
      'Recommandé pour un foyer complet incluant le salon climatisé, réfrigérateurs et l\'informatique.';
  } else if (totalKva <= 10.0) {
    recommendedProduct = GENSET_PRODUCTS[2];
    recommendedDescription =
      'Recommandé pour les grandes villas, chambres climatisées, surpresseur de puits et sécurité périmétrique.';
  } else {
    recommendedProduct = GENSET_PRODUCTS[3];
    recommendedDescription =
      'Recommandé pour les très grandes propriétés, villas avec ascenseur, pompes multiples ou petits commerces sensibles.';
  }

  const toggleLoadItem = (id: string) => {
    setLoadItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleQuoteFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequestQuoteSubmit({
      client: quoteForm.name,
      phone: quoteForm.phone,
      zone: quoteForm.zone,
      propertyType: quoteForm.propertyType,
      formula: quoteForm.formula,
      kva: `${recommendedProduct.power} (${recommendedProduct.name})`,
    });
    setQuoteSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Telemetry Strip */}
      <div className="w-full bg-[#e1e8fd] py-space-xs px-margin border-b border-[#d6e0f3]">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-space-sm font-label-sm text-[#555f6f]">
          <div className="flex items-center gap-space-md">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#006c49]">
              <span className="w-2 h-2 rounded-full bg-[#00a572] animate-pulse"></span>
              RÉSEAU STEG : MONITORING EN DIRECT
            </span>
            <span className="hidden md:inline text-[#555f6f]">
              Fréquence : 50.02 Hz | Tension Tunis-Nord : 228 V
            </span>
          </div>
          <div className="flex items-center gap-space-md">
            <span className="text-[#141b2b] font-semibold">
              Délai moyen d'intervention Grand Tunis : 38 min
            </span>
            <span className="bg-[#ffffff] px-2 py-0.5 rounded text-[#8d4b00] font-bold shadow-xs">
              Standard 24/7 : 71 000 000
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f1f3ff] via-[#f9f9ff] to-[#f9f9ff] pt-space-lg pb-space-xl">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Text & Value Proposition Column */}
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#dce2f7] px-3 py-1 rounded-lg text-[#141b2b] font-label-sm font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8d4b00]" />
                  Norme Résidentielle CE & STEG
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#6ffbbe] text-[#002113] px-3 py-1 rounded-lg font-label-sm font-bold">
                  <Zap className="w-3.5 h-3.5" />
                  Secours Immédiat
                </span>
              </div>

              <h1 className="font-display text-[#141b2b] tracking-tight leading-tight">
                Votre foyer à l'abri des coupures{' '}
                <span className="text-[#8d4b00] underline decoration-[#ffb77d] decoration-4 underline-offset-4">
                  STEG
                </span>
                .
              </h1>

              <p className="font-body-lg text-[#554336] max-w-2xl leading-relaxed">
                Groupes électrogènes diesel super silencieux (60-65 dB) avec basculement automatique ATS en moins de 10 secondes. Conçus sur-mesure pour villas, résidences et petits commerces du Grand Tunis.
              </p>

              {/* Engineering Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
                <div className="bg-[#ffffff] p-space-sm rounded-xl shadow-sm border border-[#e1e8fd] flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[#8d4b00]">
                    <Volume2 className="w-5 h-5 text-[#8d4b00]" />
                    <span className="font-label-md text-[#141b2b] font-bold">Triple Couche</span>
                  </div>
                  <span className="font-body-sm text-[#554336]">
                    Insonorisation Super Silent 60 dB
                  </span>
                </div>

                <div className="bg-[#ffffff] p-space-sm rounded-xl shadow-sm border border-[#e1e8fd] flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[#006c49]">
                    <RefreshCw className="w-5 h-5 text-[#006c49]" />
                    <span className="font-label-md text-[#141b2b] font-bold">Basculement Auto</span>
                  </div>
                  <span className="font-body-sm text-[#554336]">
                    ATS Smart Switch &lt; 10s
                  </span>
                </div>

                <div className="bg-[#ffffff] p-space-sm rounded-xl shadow-sm border border-[#e1e8fd] flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[#555f6f]">
                    <MapPin className="w-5 h-5 text-[#555f6f]" />
                    <span className="font-label-md text-[#141b2b] font-bold">4h Grand Tunis</span>
                  </div>
                  <span className="font-body-sm text-[#554336]">
                    Livraison & Raccordement certifiés
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-space-sm pt-space-sm">
                <a
                  href="#simulateur"
                  className="inline-flex items-center gap-2 bg-[#8d4b00] text-white hover:bg-[#b15f00] px-6 py-3 rounded-xl font-title-md transition-all shadow-md cursor-pointer"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Trouver mon générateur</span>
                </a>
                <button
                  onClick={() => onNavigateTab('location-simulateur')}
                  className="inline-flex items-center gap-2 bg-[#e1e8fd] hover:bg-[#dce2f7] text-[#141b2b] px-6 py-3 rounded-xl font-title-md transition-all border border-[#d6e0f3] cursor-pointer"
                >
                  <Receipt className="w-5 h-5 text-[#8d4b00]" />
                  <span>Voir les offres de location</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-space-md text-[#554336] font-label-sm pt-space-xs">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006c49]" />
                  Garantie 3 ans pièces & main-d'œuvre
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006c49]" />
                  Contrat carburant & maintenance inclus
                </span>
              </div>
            </div>

            {/* Hero Technical Visual Frame */}
            <div className="lg:col-span-5">
              <div className="bg-[#ffffff] rounded-2xl p-space-md shadow-xl flex flex-col gap-space-md relative overflow-hidden border border-[#dce2f7]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-3 h-3 rounded-full bg-[#8d4b00]"></span>
                    <span className="font-label-sm uppercase tracking-wider text-[#554336] font-semibold">
                      Schéma Technique Silent-Block
                    </span>
                  </div>
                  <span className="bg-[#e1e8fd] text-[#141b2b] font-label-sm px-2 py-0.5 rounded font-mono font-bold">
                    SERIES V-2025
                  </span>
                </div>

                {/* Technical Blueprint SVG */}
                <div className="w-full bg-[#f1f3ff] rounded-xl p-space-md flex items-center justify-center relative border border-[#e1e8fd]">
                  <svg
                    className="w-full h-auto text-[#141b2b]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 460 260"
                  >
                    <rect
                      className="text-[#555f6f]"
                      fill="#f1f3ff"
                      height="175"
                      rx="10"
                      strokeWidth="2.5"
                      width="370"
                      x="25"
                      y="40"
                    />
                    <rect
                      className="text-[#887364]"
                      height="155"
                      rx="6"
                      strokeDasharray="4 3"
                      strokeWidth="1.2"
                      width="350"
                      x="35"
                      y="50"
                    />
                    <rect
                      fill="#dce2f7"
                      height="105"
                      rx="4"
                      strokeWidth="1.8"
                      width="130"
                      x="55"
                      y="80"
                    />
                    <text
                      fill="#141b2b"
                      fontFamily="Inter"
                      fontSize="12"
                      fontWeight="600"
                      stroke="none"
                      x="75"
                      y="140"
                    >
                      MOTEUR DIESEL
                    </text>
                    <text
                      fill="#554336"
                      fontFamily="Inter"
                      fontSize="9"
                      stroke="none"
                      x="82"
                      y="155"
                    >
                      Injection Directe
                    </text>
                    <rect
                      fill="#d6e0f3"
                      height="105"
                      rx="4"
                      strokeWidth="1.8"
                      width="105"
                      x="200"
                      y="80"
                    />
                    <text
                      fill="#00311f"
                      fontFamily="Inter"
                      fontSize="12"
                      fontWeight="600"
                      stroke="none"
                      x="215"
                      y="140"
                    >
                      ALTERNATEUR
                    </text>
                    <text
                      fill="#005236"
                      fontFamily="Inter"
                      fontSize="9"
                      stroke="none"
                      x="225"
                      y="155"
                    >
                      100% Cuivre AVR
                    </text>
                    <path
                      className="text-[#8d4b00]"
                      d="M120 80 V 60 H 340 V 85"
                      strokeWidth="2.2"
                    />
                    <rect
                      fill="#ffdcc3"
                      height="18"
                      rx="3"
                      stroke="#8d4b00"
                      strokeWidth="1.5"
                      width="70"
                      x="250"
                      y="52"
                    />
                    <text
                      fill="#6e3900"
                      fontFamily="Inter"
                      fontSize="9"
                      fontWeight="bold"
                      stroke="none"
                      x="262"
                      y="65"
                    >
                      SILENCIEUX -25dB
                    </text>
                    <rect
                      fill="#e9edff"
                      height="105"
                      rx="3"
                      stroke="#141b2b"
                      strokeWidth="1.5"
                      width="55"
                      x="320"
                      y="80"
                    />
                    <circle cx="347" cy="100" fill="#00a572" r="5" />
                    <circle cx="347" cy="115" fill="#b15f00" r="5" />
                    <rect fill="#141b2b" height="40" rx="2" width="35" x="330" y="130" />
                    <text fill="#6ffbbe" fontFamily="Inter" fontSize="8" stroke="none" x="333" y="153">
                      ATS-RUN
                    </text>
                    <rect fill="#3d4756" height="8" rx="2" width="40" x="50" y="215" />
                    <rect fill="#3d4756" height="8" rx="2" width="40" x="190" y="215" />
                    <rect fill="#3d4756" height="8" rx="2" width="40" x="330" y="215" />
                    <line
                      className="text-[#887364]"
                      strokeDasharray="2 2"
                      strokeWidth="1"
                      x1="25"
                      x2="395"
                      y1="235"
                      y2="235"
                    />
                    <text
                      fill="#554336"
                      fontFamily="Inter"
                      fontSize="10"
                      fontWeight="600"
                      stroke="none"
                      x="180"
                      y="248"
                    >
                      L = 1 120 mm
                    </text>
                  </svg>
                </div>

                {/* Telemetry row */}
                <div className="grid grid-cols-3 gap-space-xs bg-[#f1f3ff] p-space-sm rounded-xl border border-[#e1e8fd]">
                  <div>
                    <span className="font-label-sm text-[#554336] block">NIVEAU ACOUSTIQUE</span>
                    <span className="font-metric-numeral text-[#141b2b] text-xl font-bold">
                      62 <span className="text-xs text-[#8d4b00]">dB(A)</span>
                    </span>
                  </div>
                  <div>
                    <span className="font-label-sm text-[#554336] block">RÉPONSE DÉLESTAGE</span>
                    <span className="font-metric-numeral text-[#006c49] text-xl font-bold">
                      7.8 <span className="text-xs text-[#006c49]">sec</span>
                    </span>
                  </div>
                  <div>
                    <span className="font-label-sm text-[#554336] block">AUTONOMIE CONTINU</span>
                    <span className="font-metric-numeral text-[#141b2b] text-xl font-bold">
                      18.5 <span className="text-xs text-[#8d4b00]">heures</span>
                    </span>
                  </div>
                </div>

                {/* Proof photo */}
                <div className="relative rounded-xl overflow-hidden h-36 shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    alt="Installation Villa Résidentielle - Marsa Cube"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPD750SztDktRHf6Nno7FBcAiufoSONpEleeDb6rQKwLwwjDTDBeoBnURoTS-iMT_iy5zMvE0U1XYqz9Mav2n57Xf3aNe5n5Qddz-xXI6W3nd2Trw8uQPKG3mOtV-0MG9miXNmbC9rkEGfxJX7Os8KcKZFQkFd73cPOrF9WV1rxw6he0Wfm6V6vcenrNxlIDB3ziU2DD2lVnGoLTAH46_Yj3hSqn6gdK45EAhKd5XC_4KqRe3JHCPU-Q"
                  />
                  <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg text-[#141b2b] font-label-sm flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#006c49]" />
                    <span>Installation Villa Résidentielle - Marsa Cube</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Load Calculator Section */}
      <section className="w-full py-space-xl bg-[#ffffff] border-y border-[#e1e8fd]" id="simulateur">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="flex flex-col gap-space-xs mb-space-lg">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8d4b00]"></span>
              <span className="font-label-sm uppercase tracking-wider text-[#8d4b00] font-bold">
                Simulateur de Charge Grand Tunis
              </span>
            </div>
            <h2 className="font-headline-lg text-[#141b2b]">
              Calculez précisément la puissance requise pour votre foyer
            </h2>
            <p className="font-body-md text-[#554336] max-w-3xl leading-relaxed">
              Sélectionnez vos équipements prioritaires. Notre algorithme certifié STEG calcule le pic de démarrage inductif (cos φ = 0.8) et recommande le groupe diesel insonorisé immédiatement prêt à intervenir.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* Checklist Column */}
            <div className="lg:col-span-7 flex flex-col gap-space-sm">
              {loadItems.map((item) => (
                <label
                  key={item.id}
                  onClick={() => toggleLoadItem(item.id)}
                  className={`group cursor-pointer p-space-md rounded-xl flex items-center justify-between transition-all border shadow-xs ${
                    item.checked
                      ? 'bg-[#f1f3ff] border-[#8d4b00]/30'
                      : 'bg-[#f9f9ff] border-[#e1e8fd] hover:bg-[#f1f3ff]'
                  }`}
                >
                  <div className="flex items-center gap-space-md">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => {}} // handled by label onClick
                      className="w-5 h-5 rounded accent-[#8d4b00] cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="font-title-md text-[#141b2b] group-hover:text-[#8d4b00] transition-colors">
                        {item.title}
                      </span>
                      <span className="font-body-sm text-[#554336]">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="font-metric-numeral text-xl text-[#141b2b] group-hover:text-[#8d4b00]">
                      {item.kva}
                    </span>
                    <span className="font-label-sm text-[#554336] block">kVA</span>
                  </div>
                </label>
              ))}
            </div>

            {/* Gauge & Recommendation Card */}
            <div className="lg:col-span-5 bg-[#f1f3ff] rounded-2xl p-space-lg shadow-md border border-[#e1e8fd] flex flex-col gap-space-md sticky top-24">
              <div className="flex items-center justify-between">
                <span className="font-label-sm uppercase tracking-wider text-[#554336] font-bold">
                  Puissance Absorbée Estimée
                </span>
                <span className="bg-[#e1e8fd] px-2.5 py-1 rounded-lg font-label-sm text-[#141b2b] font-semibold">
                  Marge de sécurité +20%
                </span>
              </div>

              {/* Gauge Indicator */}
              <div className="flex items-baseline gap-space-xs">
                <span className="font-display text-[#8d4b00] font-bold">
                  {totalKva.toFixed(1)}
                </span>
                <span className="font-headline-md text-[#141b2b] font-semibold">kVA</span>
                <span className="text-[#554336] font-body-sm ml-auto">
                  Puissance active :{' '}
                  <span className="font-bold text-[#141b2b]">{totalKw.toFixed(1)} kW</span>
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#dce2f7] h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#d97706] to-[#8d4b00] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex justify-between font-label-sm text-[#554336]">
                <span>0 kVA</span>
                <span>5 kVA</span>
                <span>10 kVA</span>
                <span>15 kVA</span>
              </div>

              {/* Recommendation Card */}
              <div className="bg-[#ffffff] p-space-md rounded-xl shadow-sm border border-[#e1e8fd] flex flex-col gap-space-xs">
                <span className="font-label-sm uppercase text-[#006c49] font-bold tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Modèle Certifié Préconisé
                </span>
                <h3 className="font-headline-sm text-[#141b2b] font-bold">
                  {recommendedProduct.name}
                </h3>
                <p className="font-body-sm text-[#554336]">
                  {recommendedDescription}
                </p>

                <div className="pt-space-xs flex items-center justify-between border-t border-[#f1f3ff] mt-2">
                  <div>
                    <span className="font-label-sm text-[#554336] block">
                      Tarif TTC Clé en Main
                    </span>
                    <span className="font-headline-md text-[#8d4b00] font-bold">
                      {recommendedProduct.price.toLocaleString()} TND
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenBooking(recommendedProduct)}
                    className="bg-[#8d4b00] hover:bg-[#b15f00] text-white px-5 py-2.5 rounded-xl font-title-md shadow transition-colors cursor-pointer"
                  >
                    Commander ce pack
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#554336] font-body-sm pt-space-xs">
                <Truck className="w-5 h-5 text-[#8d4b00] shrink-0" />
                <span>Livré, câblé et testé sous charge réelle à domicile dans le Grand Tunis.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Lineup Section */}
      <section className="w-full py-space-xl bg-[#f9f9ff]">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="flex flex-col gap-space-xs mb-space-lg text-center items-center">
            <span className="font-label-sm uppercase tracking-wider text-[#8d4b00] font-bold">
              Gamme Insonorisée Domestique 2025
            </span>
            <h2 className="font-headline-lg text-[#141b2b]">
              Quatre configurations adaptées aux habitations tunisiennes
            </h2>
            <p className="font-body-md text-[#554336] max-w-2xl leading-relaxed">
              Tous nos groupes sont équipés d'un alternateur 100% cuivre avec régulation électronique AVR, d'un boîtier ATS étanche et d'une double isolation acoustique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {GENSET_PRODUCTS.map((prod, idx) => (
              <div
                key={prod.id}
                className={`bg-[#ffffff] rounded-2xl p-space-md shadow-sm border hover:shadow-lg transition-all flex flex-col justify-between relative ${
                  prod.isBestSeller ? 'border-[#8d4b00] ring-2 ring-[#8d4b00]/20' : 'border-[#e1e8fd]'
                }`}
              >
                {prod.isBestSeller && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8d4b00] text-white font-label-sm px-3 py-0.5 rounded-full font-bold uppercase tracking-wide shadow-sm">
                    Le Plus Choisi Grand Tunis
                  </span>
                )}
                <div className="flex flex-col gap-space-sm mt-1">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#e1e8fd] text-[#141b2b] font-label-sm px-2.5 py-0.5 rounded font-mono font-bold">
                      {prod.power}
                    </span>
                    <span className="font-label-sm text-[#006c49] font-bold">
                      {prod.stockLabel}
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-[#141b2b] font-bold">
                    {prod.name}
                  </h3>
                  <p className="font-body-sm text-[#554336] min-h-[40px]">
                    {prod.description}
                  </p>

                  {/* Specs matrix */}
                  <div className="space-y-1.5 text-body-sm pt-space-xs border-t border-[#f1f3ff]">
                    <div className="flex items-center justify-between text-[#554336]">
                      <span>Niveau Sonore :</span>
                      <span className="font-semibold text-[#141b2b]">{prod.noise}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#554336]">
                      <span>Réservoir Diesel :</span>
                      <span className="font-semibold text-[#141b2b]">{prod.fuelTank}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#554336]">
                      <span>Inverseur ATS :</span>
                      <span className="text-[#006c49] font-bold">{prod.atsLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-space-md mt-space-md bg-[#f1f3ff] p-space-sm rounded-xl flex flex-col gap-space-xs border border-[#e1e8fd]">
                  <div className="flex items-baseline justify-between">
                    <span className="font-label-sm text-[#554336]">Achat TTC</span>
                    <span className="font-headline-sm text-[#8d4b00] font-bold">
                      {prod.price.toLocaleString()} TND
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      onClick={() => onOpenBooking(prod)}
                      className="w-full bg-[#8d4b00] hover:bg-[#b15f00] text-white font-label-md py-2 rounded-lg transition-colors shadow-xs cursor-pointer text-xs font-semibold"
                    >
                      Commander
                    </button>
                    <button
                      onClick={() => onOpenTechSpecs(idx)}
                      className="w-full bg-[#e1e8fd] hover:bg-[#dce2f7] text-[#141b2b] font-label-md py-2 rounded-lg transition-colors cursor-pointer text-xs font-semibold"
                    >
                      Fiche Tech
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATS Architecture Section */}
      <section className="w-full py-space-xl bg-[#f1f3ff] border-y border-[#e1e8fd]">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="flex flex-col gap-space-xs mb-space-lg text-center items-center">
            <span className="font-label-sm uppercase tracking-wider text-[#8d4b00] font-bold">
              Ingénierie de Transfert Automatique
            </span>
            <h2 className="font-headline-lg text-[#141b2b]">
              Comment fonctionne l'inverseur automatique ATS ?
            </h2>
            <p className="font-body-md text-[#554336] max-w-2xl leading-relaxed">
              Aucune action manuelle nécessaire. L'armoire de contrôle surveille la tension STEG 24/7 et prend le relais en moins de 8 secondes sans danger pour vos appareils électroniques.
            </p>
          </div>

          <div className="bg-[#ffffff] rounded-2xl p-space-lg shadow-sm border border-[#e1e8fd]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
              <div className="flex flex-col gap-space-sm p-space-sm rounded-xl bg-[#f9f9ff] border border-[#e1e8fd]">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center font-bold text-xs">
                    01
                  </span>
                  <PowerOff className="w-5 h-5 text-[#ba1a1a]" />
                </div>
                <h4 className="font-title-md text-[#141b2b] font-bold">
                  1. Détection de Coupure
                </h4>
                <p className="font-body-sm text-[#554336]">
                  Le réseau STEG s'interrompt ou la tension chute en dessous de 180 V. Le capteur de phase ATS isole immédiatement la ligne générale pour protéger le compteur.
                </p>
                <span className="font-label-sm text-[#ba1a1a] font-bold">Temps : 0.05 seconde</span>
              </div>

              <div className="flex flex-col gap-space-sm p-space-sm rounded-xl bg-[#f9f9ff] border border-[#e1e8fd]">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#ffdcc3] text-[#8d4b00] flex items-center justify-center font-bold text-xs">
                    02
                  </span>
                  <RefreshCw className="w-5 h-5 text-[#8d4b00]" />
                </div>
                <h4 className="font-title-md text-[#141b2b] font-bold">
                  2. Démarrage Automatique
                </h4>
                <p className="font-body-sm text-[#554336]">
                  Le démarreur électrique du groupe VOLT s'active sans intervention humaine. Le préchauffage diesel et la stabilisation du régime s'exécutent.
                </p>
                <span className="font-label-sm text-[#8d4b00] font-bold">Temps : 5 à 7 secondes</span>
              </div>

              <div className="flex flex-col gap-space-sm p-space-sm rounded-xl bg-[#f9f9ff] border border-[#e1e8fd]">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#6ffbbe] text-[#002113] flex items-center justify-center font-bold text-xs">
                    03
                  </span>
                  <Zap className="w-5 h-5 text-[#006c49]" />
                </div>
                <h4 className="font-title-md text-[#141b2b] font-bold">
                  3. Basculement Franc
                </h4>
                <p className="font-body-sm text-[#554336]">
                  Les contacteurs mécaniques verrouillés commutent la charge de la villa vers l'alternateur stabilisé par l'AVR. Climatisation et Wi-Fi reprennent.
                </p>
                <span className="font-label-sm text-[#006c49] font-bold">Temps : &lt; 8 secondes</span>
              </div>

              <div className="flex flex-col gap-space-sm p-space-sm rounded-xl bg-[#f9f9ff] border border-[#e1e8fd]">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#d9e3f6] text-[#121c2a] flex items-center justify-center font-bold text-xs">
                    04
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-[#555f6f]" />
                </div>
                <h4 className="font-title-md text-[#141b2b] font-bold">
                  4. Rétablissement & Arrêt
                </h4>
                <p className="font-body-sm text-[#554336]">
                  Dès le retour stable du réseau STEG pendant 60 secondes, l'ATS reconnecte le réseau national, refroidit le groupe 2 min puis l'éteint automatiquement.
                </p>
                <span className="font-label-sm text-[#555f6f] font-bold">Cycle 100% Automatisé</span>
              </div>
            </div>

            {/* ATS Schematic SVG */}
            <div className="mt-space-lg pt-space-md bg-[#e1e8fd] rounded-xl p-space-md border border-[#d6e0f3]">
              <svg className="w-full h-auto text-[#141b2b]" fill="none" viewBox="0 0 900 160">
                <circle cx="100" cy="80" fill="#ba1a1a" fillOpacity="0.1" r="30" stroke="#ba1a1a" strokeWidth="2" />
                <text fill="#ba1a1a" fontFamily="Inter" fontSize="12" fontWeight="bold" x="75" y="75">
                  RÉSEAU
                </text>
                <text fill="#ba1a1a" fontFamily="Inter" fontSize="11" fontWeight="bold" x="80" y="93">
                  STEG
                </text>
                <path d="M130 80 H 330" stroke="#ba1a1a" strokeDasharray="6 4" strokeWidth="3" />
                <rect fill="#ffffff" height="100" rx="8" stroke="#141b2b" strokeWidth="2" width="240" x="330" y="30" />
                <text fill="#141b2b" fontFamily="Inter" fontSize="14" fontWeight="bold" x="365" y="60">
                  BOÎTIER ATS INVERSEUR
                </text>
                <text fill="#554336" fontFamily="Inter" fontSize="11" x="355" y="80">
                  Micro-contrôleur avec verrouillage
                </text>
                <rect fill="#00a572" height="22" rx="4" width="120" x="390" y="95" />
                <text fill="#ffffff" fontFamily="Inter" fontSize="10" fontWeight="bold" x="405" y="110">
                  STATUS: SÉCURISÉ
                </text>
                <path d="M450 160 V 130" stroke="#8d4b00" strokeWidth="3" />
                <path d="M570 80 H 750" stroke="#006c49" strokeWidth="4" />
                <circle cx="790" cy="80" fill="#006c49" fillOpacity="0.1" r="36" stroke="#006c49" strokeWidth="2" />
                <text fill="#006c49" fontFamily="Inter" fontSize="12" fontWeight="bold" x="765" y="76">
                  TABLEAU
                </text>
                <text fill="#006c49" fontFamily="Inter" fontSize="11" fontWeight="bold" x="772" y="94">
                  VILLA
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grand Tunis */}
      <section className="w-full py-space-xl bg-[#ffffff]">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="flex flex-col gap-space-xs mb-space-lg text-center items-center">
            <span className="font-label-sm uppercase tracking-wider text-[#8d4b00] font-bold">
              Retours d'Expérience Concrets
            </span>
            <h2 className="font-headline-lg text-[#141b2b]">
              Ils ont sécurisé leur quotidien face aux délestages
            </h2>
            <p className="font-body-md text-[#554336] max-w-xl">
              Villas de maître, résidences familiales et commerces stratégiques protégés par VOLT à Tunis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {/* Review 1: La Marsa */}
            <div className="bg-[#f9f9ff] p-space-lg rounded-2xl shadow-sm border border-[#e1e8fd] flex flex-col justify-between">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center gap-1 text-[#d97706]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d97706]" />
                  ))}
                </div>
                <p className="font-body-md text-[#141b2b] italic leading-relaxed">
                  « L'été dernier à La Marsa, nous avons subi trois délestages par semaine en pleine canicule. Le modèle VOLT Villa 10 s'enclenche avant même qu'on ait le temps de chercher son téléphone. Nos climatiseurs ne bronchent pas et le voisinage n'entend presque rien. »
                </p>
              </div>
              <div className="pt-space-md mt-space-md flex items-center gap-space-sm border-t border-[#e1e8fd]">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#e1e8fd] border border-[#d6e0f3]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Karim B."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmqlP9RieK0SiXC5JxUWJAzRToSVkVeUh5dEpih1IAAa5P7AyqtYDY1VXlHIhtKmNGcSKkhsCPhNHOl_j-B1c2yxv2vklHBR8_8yPFvVSCgGRTTJpvOnE_N_lDA3TAk1jQLTSmgWwS8YwTbLsQQiJMTEuLoXFLWHVKlnGCO8s_9OcwrzU0HnwiSIJl721k8t7DDnepDMEMNu5PvJvrGkvuVn4-m-qfFhCFwhb9kwawVR9A1ZtHJ5W8fw"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-[#141b2b] font-bold">Karim B.</span>
                  <span className="font-body-sm text-[#554336]">Propriétaire de Villa • La Marsa Cube</span>
                  <span className="font-label-sm text-[#006c49] font-semibold">VOLT Villa 10 ATS</span>
                </div>
              </div>
            </div>

            {/* Review 2: Ennasr */}
            <div className="bg-[#f9f9ff] p-space-lg rounded-2xl shadow-sm border border-[#e1e8fd] flex flex-col justify-between">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center gap-1 text-[#d97706]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d97706]" />
                  ))}
                </div>
                <p className="font-body-md text-[#141b2b] italic leading-relaxed">
                  « Télétravailleur pour une multinationale, je ne peux pas me permettre une seule seconde d'interruption. L'équipe VOLT a installé le modèle 6.5 kVA sur le toit-terrasse à Ennasr II. Les serveurs et la fibre ne rebootent même pas lors du switch. Service après-vente irréprochable. »
                </p>
              </div>
              <div className="pt-space-md mt-space-md flex items-center gap-space-sm border-t border-[#e1e8fd]">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#e1e8fd] border border-[#d6e0f3]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Syrine M."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWVFdtMFmjMcMrEtI41t_V3LzAER2ev6sKwcwz0lwPOmO-6y46ST-V5P70uKpHY9rXsymFsHowdUpav8KzKGZKamvvSodWH5xor2IeBIabJ0qqShYxkk7cMA3pD4iVup5NCf2t9PbiYGrfsH1Jkp9V_28kC8DJXVzwuIkw6Nw7jAIeZUDbW5nn5xp6WRSNrV9IVJu5OLR-plWzXhE6M6DxO_E1Ir8G-YkaFDHiSocMwmhzQW9Jb7MNrA"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-[#141b2b] font-bold">Syrine M.</span>
                  <span className="font-body-sm text-[#554336]">Duplex Résidentiel • Ennasr II</span>
                  <span className="font-label-sm text-[#006c49] font-semibold">VOLT Home 6.5 Silent</span>
                </div>
              </div>
            </div>

            {/* Review 3: Le Bardo */}
            <div className="bg-[#f9f9ff] p-space-lg rounded-2xl shadow-sm border border-[#e1e8fd] flex flex-col justify-between">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center gap-1 text-[#d97706]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d97706]" />
                  ))}
                </div>
                <p className="font-body-md text-[#141b2b] italic leading-relaxed">
                  « Dans mon officine au Bardo, j'ai plus de 40 000 DT de vaccins et d'insuline au réfrigérateur. Une coupure de 2 heures ruinerait tout le stock. L'inverseur automatique a été posé en 4 heures un samedi. C'est la tranquillité d'esprit absolue pour mon activité. »
                </p>
              </div>
              <div className="pt-space-md mt-space-md flex items-center gap-space-sm border-t border-[#e1e8fd]">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#e1e8fd] border border-[#d6e0f3]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Dr. Mehdi K."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2KAcrU73UgMJ_nBSZx9Gowf0qFWQLi3c5wdjg2D3N1isedMxWX1W1mm0uXG4uvkPOCtQKLSz7tKpYWobawwKmKvEJnAYpJCf0yQJ_7olkRuJoWrSjY2ZjZ6KSLCG3W4K1dWYbqxJpVGa1Q03dknRD6i1qpoIeGCI6IYA5Y9XFKAbCD-czHYA1q76Gwt2ghUtuxf4ROuxZnvY6EA0REWMyubAfLLteFVcyRYLn3q09uDkajY0MuyiOxQ"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-[#141b2b] font-bold">Dr. Mehdi K.</span>
                  <span className="font-body-sm text-[#554336]">Pharmacie Centrale • Le Bardo</span>
                  <span className="font-label-sm text-[#006c49] font-semibold">VOLT Home 6.5 Silent ATS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fast Diagnostic & Quote Request Form */}
      <section className="w-full py-space-xl bg-[#f1f3ff] border-t border-[#e1e8fd]" id="devis">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="bg-[#ffffff] rounded-2xl p-space-lg lg:p-space-xl shadow-xl border border-[#dce2f7] grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
            <div className="lg:col-span-6 flex flex-col justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm uppercase tracking-wider text-[#8d4b00] font-bold">
                  Intervention Express Grand Tunis
                </span>
                <h3 className="font-headline-lg text-[#141b2b]">
                  Demander une étude d'installation & devis officiel
                </h3>
                <p className="font-body-md text-[#554336] leading-relaxed">
                  Un ingénieur VOLT certifié se déplace gratuitement à votre domicile pour auditer votre tableau électrique et dimensionner le raccordement ATS aux normes STEG.
                </p>
              </div>

              <div className="space-y-space-sm">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-xl bg-[#e1e8fd] flex items-center justify-center text-[#8d4b00]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="font-body-md text-[#141b2b]">
                    Audit électrique sans engagement sous 24h
                  </span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-xl bg-[#e1e8fd] flex items-center justify-center text-[#006c49]">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="font-body-md text-[#141b2b]">
                    Option location événementielle ou secours d'urgence
                  </span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-xl bg-[#e1e8fd] flex items-center justify-center text-[#555f6f]">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <span className="font-body-md text-[#141b2b]">
                    Contrat carburant & vidange annuel disponible
                  </span>
                </div>
              </div>

              <div className="p-space-sm rounded-xl bg-[#f1f3ff] text-[#141b2b] flex items-center gap-space-sm border border-[#e1e8fd]">
                <PhoneCall className="w-8 h-8 text-[#8d4b00]" />
                <div>
                  <span className="font-label-sm text-[#554336] block">
                    Ligne Directe Ingénieurs Tunis
                  </span>
                  <span className="font-headline-sm font-bold text-[#141b2b]">
                    +216 71 000 000
                  </span>
                </div>
              </div>
            </div>

            {/* Form Box */}
            <div className="lg:col-span-6 bg-[#f1f3ff] p-space-lg rounded-2xl border border-[#e1e8fd] flex flex-col gap-space-md">
              {!quoteSubmitted ? (
                <form onSubmit={handleQuoteFormSubmit} className="flex flex-col gap-space-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-[#141b2b] font-bold">
                        Nom & Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Slim Ben Salem"
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                        className="h-11 px-3 rounded-xl bg-[#ffffff] text-[#141b2b] border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-[#141b2b] font-bold">
                        Téléphone mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+216 98 000 000"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                        className="h-11 px-3 rounded-xl bg-[#ffffff] text-[#141b2b] border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-[#141b2b] font-bold">
                        Zone d'intervention *
                      </label>
                      <select
                        value={quoteForm.zone}
                        onChange={(e) => setQuoteForm({ ...quoteForm, zone: e.target.value })}
                        className="h-11 px-3 rounded-xl bg-[#ffffff] text-[#141b2b] border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                      >
                        <option value="La Marsa / Gammarth / Carthage">La Marsa / Gammarth / Carthage</option>
                        <option value="Ennasr / Menzah / Ariana">Ennasr / Menzah / Ariana</option>
                        <option value="Les Berges du Lac 1 & 2">Les Berges du Lac 1 & 2</option>
                        <option value="Tunis Centre / Le Bardo / Manouba">Tunis Centre / Le Bardo / Manouba</option>
                        <option value="Autre zone Grand Tunis">Autre zone Grand Tunis</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-[#141b2b] font-bold">
                        Type de propriété *
                      </label>
                      <select
                        value={quoteForm.propertyType}
                        onChange={(e) => setQuoteForm({ ...quoteForm, propertyType: e.target.value })}
                        className="h-11 px-3 rounded-xl bg-[#ffffff] text-[#141b2b] border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00]"
                      >
                        <option value="Villa individuelle avec jardin">Villa individuelle avec jardin</option>
                        <option value="Duplex / Appartement avec terrasse">Duplex / Appartement avec terrasse</option>
                        <option value="Commerce / Pharmacie / Cabinet">Commerce / Pharmacie / Cabinet</option>
                        <option value="Domaine agricole / Forage">Domaine agricole / Forage</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-[#141b2b] font-bold">
                      Formule souhaitée
                    </label>
                    <div className="grid grid-cols-2 gap-space-xs">
                      <label className="cursor-pointer bg-[#ffffff] p-2.5 rounded-xl border border-[#dce2f7] flex items-center gap-2">
                        <input
                          type="radio"
                          name="formule"
                          checked={quoteForm.formula === 'Achat & Pose Définitive'}
                          onChange={() => setQuoteForm({ ...quoteForm, formula: 'Achat & Pose Définitive' })}
                          className="accent-[#8d4b00]"
                        />
                        <span className="font-body-sm text-[#141b2b]">Achat & Pose Définitive</span>
                      </label>
                      <label className="cursor-pointer bg-[#ffffff] p-2.5 rounded-xl border border-[#dce2f7] flex items-center gap-2">
                        <input
                          type="radio"
                          name="formule"
                          checked={quoteForm.formula === 'Location Mensuelle'}
                          onChange={() => setQuoteForm({ ...quoteForm, formula: 'Location Mensuelle' })}
                          className="accent-[#8d4b00]"
                        />
                        <span className="font-body-sm text-[#141b2b]">Location Mensuelle</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#8d4b00] hover:bg-[#b15f00] text-white font-title-md py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-space-xs mt-space-xs cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    <span>Planifier l'audit technique gratuit</span>
                  </button>
                  <span className="font-label-sm text-[#554336] text-center">
                    Engagement de réponse sous 2 heures ouvrées
                  </span>
                </form>
              ) : (
                <div className="p-space-lg bg-[#6ffbbe]/20 border border-[#00a572]/30 rounded-2xl text-center space-y-space-sm animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-[#00a572] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-headline-sm font-bold text-[#00311f]">
                    Demande transmise avec succès !
                  </h4>
                  <p className="font-body-sm text-[#00311f]">
                    Merci <strong>{quoteForm.name}</strong>. Notre ingénieur d'astreinte pour la zone{' '}
                    <strong>{quoteForm.zone}</strong> vous appellera d'ici 2 heures au{' '}
                    <strong>{quoteForm.phone}</strong>.
                  </p>
                  <button
                    onClick={() => setQuoteSubmitted(false)}
                    className="px-4 py-2 bg-[#006c49] text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Nouvelle demande
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
