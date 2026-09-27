import React from 'react';
import { Bolt, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#ffffff] border-t border-[#e1e8fd] shadow-[0_-1px_6px_rgba(0,0,0,0.02)] pt-space-xl pb-space-lg">
      <div className="w-full px-margin mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
        {/* Brand & mission */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center gap-2 mb-space-xs">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-white flex items-center justify-center shadow-sm">
              <Bolt className="w-4 h-4 fill-white" />
            </div>
            <span className="font-headline-sm uppercase text-[#141b2b] tracking-tight font-bold">
              VOLT Domestique
            </span>
          </div>
          <p className="font-body-sm text-[#554336] leading-relaxed">
            Solutions d'autonomie et de secours électrique haute précision à destination des résidences et domaines privés face aux délestages de charge et coupures du réseau STEG.
          </p>
          <div className="flex items-center gap-space-xs mt-space-xs">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00a572] animate-pulse"></span>
            <span className="font-label-sm text-[#006c49] font-bold uppercase tracking-wider">
              Disponibilité Réseau : Opérationnel
            </span>
          </div>
        </div>

        {/* Coverage */}
        <div className="flex flex-col gap-space-sm">
          <span className="font-title-md text-[#141b2b] uppercase tracking-wider font-semibold">
            Couverture Grand Tunis
          </span>
          <p className="font-body-sm text-[#554336]">
            Intervention certifiée sous 45 minutes :
          </p>
          <div className="grid grid-cols-2 gap-space-xs font-body-sm text-[#554336]">
            <span className="hover:text-[#141b2b] transition-colors">• La Marsa</span>
            <span className="hover:text-[#141b2b] transition-colors">• Carthage</span>
            <span className="hover:text-[#141b2b] transition-colors">• Ennasr I & II</span>
            <span className="hover:text-[#141b2b] transition-colors">• El Menzah</span>
            <span className="hover:text-[#141b2b] transition-colors">• Ariana Centre</span>
            <span className="hover:text-[#141b2b] transition-colors">• Gammarth</span>
          </div>
        </div>

        {/* Norms & Compliance */}
        <div className="flex flex-col gap-space-sm">
          <span className="font-title-md text-[#141b2b] uppercase tracking-wider font-semibold">
            Conformité & Normes
          </span>
          <ul className="space-y-space-xs font-body-sm text-[#554336]">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#006c49] shrink-0 mt-0.5" />
              <span>Certification Directive CE 2006/42/CE</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#006c49] shrink-0 mt-0.5" />
              <span>Insonorisation résidentielle ≤ 54 dB(A) à 7m</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#006c49] shrink-0 mt-0.5" />
              <span>Inverseurs Automatiques (ATS) certifiés IEC</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#006c49] shrink-0 mt-0.5" />
              <span>Monitoring télémétrique GSM / IoT intégré</span>
            </li>
          </ul>
        </div>

        {/* Emergency Assistance 24/7 */}
        <div className="flex flex-col gap-space-sm">
          <span className="font-title-md text-[#141b2b] uppercase tracking-wider font-semibold">
            Assistance Urgence 24/7
          </span>
          <p className="font-body-sm text-[#554336]">
            Permanence technique dédiée aux coupures critiques :
          </p>
          <div className="p-space-sm rounded-xl bg-[#f1f3ff] border border-[#e1e8fd] flex flex-col gap-space-xs shadow-sm">
            <span className="font-label-sm text-[#8d4b00] uppercase font-bold tracking-wider flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              Ligne Rouge Dépannage
            </span>
            <a
              href="tel:+21671000000"
              className="font-headline-sm font-bold text-[#141b2b] hover:text-[#8d4b00] transition-colors"
            >
              +216 71 000 000
            </a>
            <span className="font-label-sm text-[#554336]">
              Technicien d'astreinte Tunis Nord & Banlieue
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-margin mx-auto pt-space-md border-t border-[#e9edff] flex flex-col sm:flex-row items-center justify-between gap-space-sm text-[#554336] font-label-sm">
        <p>© 2025–2026 VOLT Énergies Tunisie. Tous droits réservés. Spécifications conformes aux normes STEG.</p>
        <div className="flex items-center gap-space-md">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006c49]" />
            Protection Réseau Domestique
          </span>
          <span className="text-[#dbc2b0]">•</span>
          <span>Garantie Constructeur 3 Ans</span>
        </div>
      </div>
    </footer>
  );
};
