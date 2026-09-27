import React, { useState } from 'react';
import { X, Receipt, CheckCircle, Lock, ShieldCheck, ShoppingCart } from 'lucide-react';
import { ResidentialOrder } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  basePrice: number;
  power: string;
  defaultHasAts?: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  productName,
  basePrice,
  power,
  defaultHasAts = false,
}) => {
  const [hasAtsInstallation, setHasAtsInstallation] = useState(defaultHasAts);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [zone, setZone] = useState('La Marsa / Gammarth');
  const [notes, setNotes] = useState('');
  const [createdOrder, setCreatedOrder] = useState<ResidentialOrder | null>(null);

  if (!isOpen) return null;

  const installFee = hasAtsInstallation ? 650 : 0;
  const grandTotal = basePrice + installFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dossierId = `VP-2026-${randomSuffix}`;

    const orderPayload: ResidentialOrder = {
      dossierId,
      timestamp: new Date().toISOString(),
      client: {
        nom: fullName,
        telephone: phone,
        zone,
        notes,
      },
      produit: {
        modele: productName,
        puissance: power,
        prixBase: basePrice,
        optionInstallationATS: hasAtsInstallation,
        totalTTC: grandTotal,
      },
    };

    try {
      const stored = JSON.parse(localStorage.getItem('volt_residential_orders') || '[]');
      stored.push(orderPayload);
      localStorage.setItem('volt_residential_orders', JSON.stringify(stored));
    } catch {
      // ignore
    }

    setCreatedOrder(orderPayload);
  };

  const handleReset = () => {
    setCreatedOrder(null);
    setFullName('');
    setPhone('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#293040]/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#ffffff] h-full max-w-xl w-full p-space-lg overflow-y-auto shadow-2xl flex flex-col justify-between border-l border-[#dce2f7]">
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-[#e1e8fd]">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-[#8d4b00]/10 text-[#8d4b00] flex items-center justify-center">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <span className="font-label-sm uppercase text-[#555f6f] tracking-wider font-semibold block">
                  Réservation & Devis Direct
                </span>
                <h3 className="font-headline-sm text-[#141b2b] font-bold">
                  Configuration Commande
                </h3>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-9 h-9 rounded-xl bg-[#e1e8fd] flex items-center justify-center text-[#141b2b] hover:bg-[#dce2f7] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Selected Product Banner */}
          <div className="bg-[#f1f3ff] p-space-md rounded-xl mb-space-md border border-[#e1e8fd]">
            <div className="flex items-center justify-between">
              <span className="font-title-md text-[#141b2b] font-bold">{productName}</span>
              <span className="font-label-sm font-bold bg-[#e9edff] text-[#141b2b] px-2.5 py-1 rounded-lg">
                {power}
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-2 border-t border-[#e1e8fd] mt-2">
              <span className="font-body-sm text-[#555f6f]">Prix de l'équipement :</span>
              <span className="font-title-md text-[#8d4b00] font-bold">
                {basePrice.toLocaleString()} TND
              </span>
            </div>
          </div>

          {/* ATS Installation Option Checkbox */}
          <div className="bg-[#e9edff] p-space-md rounded-xl mb-space-md border border-[#d6e0f3]">
            <label className="flex items-start justify-between gap-space-sm cursor-pointer">
              <div className="flex items-start gap-space-sm">
                <input
                  type="checkbox"
                  checked={hasAtsInstallation}
                  onChange={(e) => setHasAtsInstallation(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#8d4b00] rounded cursor-pointer"
                />
                <div>
                  <span className="font-title-md text-[#141b2b] font-bold block">
                    Installation Certifiée & Raccordement ATS
                  </span>
                  <p className="font-body-sm text-[#554336] mt-0.5 leading-relaxed">
                    Comprend l'armoire inverseur tétrapolaire/bipolaire, le câble armé 5G10 (jusqu'à 15m), mise à la terre indépendante et raccordement certifié STEG.
                  </p>
                </div>
              </div>
              <span className="font-title-md text-[#8d4b00] font-bold shrink-0">
                +650 TND
              </span>
            </label>
          </div>

          {!createdOrder ? (
            <form onSubmit={handleSubmit} className="space-y-space-sm">
              <div>
                <label className="block font-label-sm uppercase text-[#555f6f] tracking-wider mb-1 font-semibold">
                  Nom Complet du Propriétaire ou Société *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Karim Ben Salem"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-[#f1f3ff] text-[#141b2b] text-body-md border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div>
                  <label className="block font-label-sm uppercase text-[#555f6f] tracking-wider mb-1 font-semibold">
                    Numéro Téléphone Tunisie *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+216 98 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-[#f1f3ff] text-[#141b2b] text-body-md border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00] transition-all"
                  />
                </div>
                <div>
                  <label className="block font-label-sm uppercase text-[#555f6f] tracking-wider mb-1 font-semibold">
                    Délégation / Zone *
                  </label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-[#f1f3ff] text-[#141b2b] text-body-md border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00] transition-all"
                  >
                    <option value="La Marsa / Gammarth">La Marsa / Gammarth</option>
                    <option value="Carthage / Sidi Bou Saïd">Carthage / Sidi Bou Saïd</option>
                    <option value="Ennasr I & II">Ennasr I & II</option>
                    <option value="El Menzah / Mutuelleville">El Menzah / Mutuelleville</option>
                    <option value="Ariana Centre / Soukra">Ariana Centre / Soukra</option>
                    <option value="Autre région (Grand Tunis)">Autre région (Grand Tunis)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-label-sm uppercase text-[#555f6f] tracking-wider mb-1 font-semibold">
                  Détails d'Accès & Note Technique (Facultatif)
                </label>
                <textarea
                  rows={2}
                  placeholder="Localisation souhaitée (jardin, toiture, sous-sol), type de compteur STEG..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f1f3ff] text-[#141b2b] text-body-md border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00] transition-all"
                />
              </div>

              {/* Real-time Ledger */}
              <div className="p-space-sm bg-[#f1f3ff] rounded-xl border border-[#e1e8fd] space-y-1.5 mt-space-sm">
                <div className="flex justify-between font-body-sm text-[#555f6f]">
                  <span>Équipement principal :</span>
                  <span className="font-semibold text-[#141b2b]">{basePrice.toLocaleString()} TND</span>
                </div>
                <div className="flex justify-between font-body-sm text-[#555f6f]">
                  <span>Forfait installation & raccordement ATS :</span>
                  <span className="font-semibold text-[#141b2b]">{installFee.toLocaleString()} TND</span>
                </div>
                <div className="flex justify-between font-title-md text-[#141b2b] font-bold pt-2 border-t border-[#dce2f7]">
                  <span>Total Estimé TTC :</span>
                  <span className="text-[#8d4b00] text-xl font-bold">{grandTotal.toLocaleString()} TND</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-space-md bg-[#8d4b00] hover:bg-[#b15f00] text-white font-title-md rounded-xl shadow-md transition-all flex items-center justify-center gap-space-xs mt-space-md cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Valider & Générer le Devis Officiel</span>
              </button>
            </form>
          ) : (
            <div className="p-space-md bg-[#6ffbbe]/20 border border-[#00a572]/30 rounded-2xl text-[#00311f] space-y-space-sm animate-fadeIn">
              <div className="flex items-center gap-space-xs">
                <CheckCircle className="w-6 h-6 text-[#006c49]" />
                <span className="font-headline-sm font-bold text-[#00311f]">
                  Dossier Réservé avec Succès !
                </span>
              </div>
              <p className="font-body-sm">
                Votre référence technique officielle est :{' '}
                <strong className="underline text-lg font-bold text-[#8d4b00]">
                  {createdOrder.dossierId}
                </strong>
              </p>
              <div className="p-3 bg-white/80 rounded-xl space-y-1 text-xs">
                <div>Client : <strong>{createdOrder.client.nom}</strong></div>
                <div>Modèle : <strong>{createdOrder.produit.modele}</strong> ({createdOrder.produit.puissance})</div>
                <div>Zone : <strong>{createdOrder.client.zone}</strong></div>
                <div>Total TTC : <strong>{createdOrder.produit.totalTTC.toLocaleString()} TND</strong></div>
              </div>
              <p className="font-body-sm text-[#00311f]">
                Un ingénieur VOLT Domestique prendra contact sous 30 minutes au numéro{' '}
                <strong>{createdOrder.client.telephone}</strong> pour planifier la visite de conformité.
              </p>
              <button
                onClick={handleReset}
                className="w-full py-2.5 mt-2 bg-[#006c49] text-white rounded-xl font-label-md hover:bg-[#005236] transition-all cursor-pointer"
              >
                Fermer le panneau
              </button>
            </div>
          )}
        </div>

        {/* Security badges footer */}
        <div className="pt-space-md border-t border-[#e1e8fd] mt-space-md flex items-center justify-center gap-space-md text-[#555f6f] font-label-sm">
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Chiffrement SSL 256-bit
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006c49]" /> Sauvegarde Locale Active
          </span>
        </div>
      </div>
    </div>
  );
};
