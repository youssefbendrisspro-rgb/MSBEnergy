import React, { useState } from 'react';
import { ScreenTab } from '../types';
import { Lock, Bolt, Menu, X, User, Calculator } from 'lucide-react';

interface HeaderProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  onOpenAdmin: () => void;
  onCalculateNeeds: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenAdmin,
  onCalculateNeeds,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ScreenTab; label: string }[] = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'vente-residentielle', label: 'Vente Résidentielle' },
    { id: 'location-simulateur', label: 'Location & Simulateur' },
    { id: 'support-depannage-steg', label: 'Support STEG 24/7' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f9f9ff]/90 backdrop-blur-xl border-b border-[#e1e8fd] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 w-full px-margin mx-auto flex items-center justify-between gap-gutter">
        {/* Brand Zone */}
        <div
          onClick={() => onSelectTab('accueil')}
          className="flex items-center gap-space-md cursor-pointer select-none group"
        >
          {/* Logo icon with lightning bolt */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Bolt className="w-6 h-6 fill-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm uppercase text-[#141b2b] tracking-tight leading-none font-bold">
                VOLT
              </span>
              <span className="font-headline-sm uppercase text-[#d97706] tracking-tight leading-none font-bold">
                DOMESTIQUE
              </span>
              <span className="w-2 h-2 rounded-full bg-[#10b981] inline-block animate-pulse"></span>
            </div>
            <span className="font-label-sm text-[10px] uppercase text-[#8d4b00] tracking-widest font-bold">
              Ingénierie Tunis
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-space-lg">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`font-title-md text-sm transition-all relative py-1 px-1 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-[#8d4b00] font-bold'
                    : 'text-[#554336] hover:text-[#141b2b]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8d4b00] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Zone */}
        <div className="flex items-center gap-space-sm sm:gap-space-md">
          {/* Admin Operator PIN Button */}
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-space-xs px-3 py-1.5 rounded-lg bg-[#e1e8fd] text-[#141b2b] hover:bg-[#dce2f7] transition-all font-label-md text-xs cursor-pointer border border-[#d6e0f3]"
            title="Espace Opérateur & Dispatch"
          >
            <Lock className="w-3.5 h-3.5 text-[#8d4b00]" />
            <span className="font-semibold">Admin</span>
          </button>

          {/* Primary Action: Calculer mes besoins */}
          <button
            onClick={onCalculateNeeds}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#8d4b00] hover:bg-[#b15f00] text-white font-label-md text-xs shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Calculer mes besoins</span>
          </button>

          {/* Avatar Profile */}
          <div className="w-8 h-8 rounded-full bg-[#8d4b00] text-white flex items-center justify-center shadow-inner cursor-pointer hover:bg-[#b15f00] transition-colors">
            <User className="w-4 h-4" />
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-[#e9edff] text-[#141b2b] hover:bg-[#dce2f7] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#f9f9ff] border-b border-[#e1e8fd] px-margin py-4 flex flex-col gap-2 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2.5 px-3 rounded-lg text-sm transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-[#e9edff] text-[#8d4b00] font-bold'
                    : 'text-[#141b2b] hover:bg-[#f1f3ff]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#8d4b00]"></span>}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#e1e8fd] flex flex-col gap-2">
            <button
              onClick={() => {
                onCalculateNeeds();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-[#8d4b00] text-white font-semibold text-xs flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculer mes besoins (Simulateur)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
