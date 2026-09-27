import React from 'react';
import { X, Cpu, ShieldCheck } from 'lucide-react';
import { DETAILED_SPECS } from '../../data/mockData';

interface TechSpecsModalProps {
  specIndex: number | null;
  onClose: () => void;
  onOrder: (specIndex: number) => void;
}

export const TechSpecsModal: React.FC<TechSpecsModalProps> = ({
  specIndex,
  onClose,
  onOrder,
}) => {
  if (specIndex === null || !DETAILED_SPECS[specIndex]) return null;
  const spec = DETAILED_SPECS[specIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#293040]/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#ffffff] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col border border-[#dce2f7]">
        {/* Header */}
        <div className="p-space-md bg-[#f1f3ff] border-b border-[#e1e8fd] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-[#8d4b00]/10 text-[#8d4b00] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="font-label-sm uppercase text-[#555f6f] tracking-widest font-semibold block">
                Spécifications Électromécaniques
              </span>
              <h3 className="font-headline-sm text-[#141b2b] font-bold">
                {spec.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#e1e8fd] flex items-center justify-center text-[#141b2b] hover:bg-[#dce2f7] transition-all cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-space-lg space-y-space-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="p-space-sm rounded-xl bg-[#f1f3ff] border border-[#e1e8fd]">
              <span className="font-label-sm text-[#555f6f] uppercase font-bold block mb-1">
                Puissance Nominale
              </span>
              <p className="font-title-md text-[#141b2b] font-bold">{spec.power}</p>
            </div>
            <div className="p-space-sm rounded-xl bg-[#f1f3ff] border border-[#e1e8fd]">
              <span className="font-label-sm text-[#555f6f] uppercase font-bold block mb-1">
                Configuration Moteur
              </span>
              <p className="font-title-md text-[#141b2b] font-semibold">{spec.engine}</p>
            </div>
            <div className="p-space-sm rounded-xl bg-[#f1f3ff] border border-[#e1e8fd]">
              <span className="font-label-sm text-[#555f6f] uppercase font-bold block mb-1">
                Sortie Électrique & Fréquence
              </span>
              <p className="font-title-md text-[#141b2b] font-semibold">{spec.voltage}</p>
            </div>
            <div className="p-space-sm rounded-xl bg-[#f1f3ff] border border-[#e1e8fd]">
              <span className="font-label-sm text-[#555f6f] uppercase font-bold block mb-1">
                Capacité Réservoir
              </span>
              <p className="font-title-md text-[#141b2b] font-semibold">{spec.fuelTank}</p>
            </div>
            <div className="p-space-sm rounded-xl bg-[#f1f3ff] border border-[#e1e8fd]">
              <span className="font-label-sm text-[#555f6f] uppercase font-bold block mb-1">
                Autonomie Continue
              </span>
              <p className="font-title-md text-[#141b2b] font-semibold">{spec.autonomy}</p>
            </div>
            <div className="p-space-sm rounded-xl bg-[#f1f3ff] border border-[#e1e8fd]">
              <span className="font-label-sm text-[#555f6f] uppercase font-bold block mb-1">
                Pression Acoustique
              </span>
              <p className="font-title-md text-[#8d4b00] font-bold">{spec.noise}</p>
            </div>
          </div>

          <div className="p-space-sm rounded-xl bg-[#f1f3ff] border border-[#e1e8fd] space-y-1">
            <span className="font-label-sm text-[#555f6f] uppercase font-bold block">
              Système de Démarrage & Commutation
            </span>
            <p className="font-body-sm text-[#141b2b]">{spec.starting}</p>
          </div>

          <div className="p-space-sm rounded-xl bg-[#f1f3ff] border border-[#e1e8fd] space-y-1">
            <span className="font-label-sm text-[#555f6f] uppercase font-bold block">
              Sécurité Électrique & Régulation
            </span>
            <p className="font-body-sm text-[#141b2b]">{spec.protection}</p>
          </div>

          <div className="p-space-sm rounded-xl bg-[#f1f3ff] border border-[#e1e8fd] space-y-1">
            <span className="font-label-sm text-[#555f6f] uppercase font-bold block">
              Poids & Châssis
            </span>
            <p className="font-body-sm text-[#141b2b]">{spec.weight}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-space-md bg-[#f1f3ff] border-t border-[#e1e8fd] flex flex-col sm:flex-row items-center justify-between gap-space-sm">
          <span className="font-label-sm text-[#555f6f] flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#006c49]" />
            Conformité Normes ISO 8528 / CE 2006/42/EC
          </span>
          <button
            onClick={() => onOrder(specIndex)}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#8d4b00] text-white rounded-xl font-label-md hover:bg-[#b15f00] shadow transition-all cursor-pointer"
          >
            Commander ce modèle
          </button>
        </div>
      </div>
    </div>
  );
};
