import React, { useState } from 'react';
import { X, Lock, KeyRound, AlertCircle } from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleVerify = () => {
    if (pin === '1234') {
      setError(false);
      setPin('');
      onSuccess();
    } else {
      setError(true);
      setPin('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#293040]/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#ffffff] w-full max-w-md rounded-2xl p-space-lg shadow-2xl flex flex-col gap-space-md border border-[#dce2f7]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-[#e1e8fd] text-[#8d4b00] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title-md font-bold text-[#141b2b]">
                Espace Administration & Régulation
              </h3>
              <span className="font-label-sm text-[#555f6f]">
                Accès réservé aux ingénieurs VOLT
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#f1f3ff] flex items-center justify-center text-[#555f6f] hover:text-[#141b2b] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="font-body-sm text-[#554336]">
          Veuillez saisir votre code PIN opérateur à 4 chiffres (Code d'essai :{' '}
          <strong className="text-[#8d4b00] font-bold">1234</strong>).
        </p>

        <div className="flex flex-col gap-space-xs items-center my-2">
          <div className="relative">
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ''));
                setError(false);
              }}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="••••"
              className="w-48 text-center font-metric-numeral tracking-widest h-14 rounded-xl bg-[#f1f3ff] text-[#141b2b] border border-[#dce2f7] focus:outline-none focus:ring-2 focus:ring-[#8d4b00] text-2xl font-bold shadow-inner"
            />
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-[#ba1a1a] font-semibold mt-2 animate-shake">
              <AlertCircle className="w-4 h-4" />
              <span>Code PIN incorrect. Veuillez réessayer.</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-space-sm mt-space-xs pt-space-xs border-t border-[#e1e8fd]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-[#554336] hover:bg-[#f1f3ff] font-label-md text-xs cursor-pointer transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleVerify}
            className="px-5 py-2.5 rounded-xl bg-[#8d4b00] text-white hover:bg-[#b15f00] font-label-md text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>Valider l'Accès</span>
          </button>
        </div>
      </div>
    </div>
  );
};
