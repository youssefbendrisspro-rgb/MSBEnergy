import React, { useState, useEffect } from 'react';
import { ScreenTab, GensetProduct, SAVTicket, ResidentialQuote } from './types';
import { DEFAULT_SAV_TICKETS, DEFAULT_QUOTES, GENSET_PRODUCTS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/Screens/HomeScreen';
import { SalesScreen } from './components/Screens/SalesScreen';
import { RentalScreen } from './components/Screens/RentalScreen';
import { SupportScreen } from './components/Screens/SupportScreen';
import { TechSpecsModal } from './components/Modals/TechSpecsModal';
import { BookingModal } from './components/Modals/BookingModal';
import { AdminPinModal } from './components/Modals/AdminPinModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('accueil');

  // Modals state
  const [adminPinModalOpen, setAdminPinModalOpen] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [techSpecsIndex, setTechSpecsIndex] = useState<number | null>(null);
  const [bookingModalData, setBookingModalData] = useState<{
    productName: string;
    basePrice: number;
    power: string;
    defaultHasAts: boolean;
  } | null>(null);

  // Tickets & Quotes local persistence
  const [tickets, setTickets] = useState<SAVTicket[]>(() => {
    try {
      const saved = localStorage.getItem('volt_sav_tickets');
      return saved ? JSON.parse(saved) : DEFAULT_SAV_TICKETS;
    } catch {
      return DEFAULT_SAV_TICKETS;
    }
  });

  const [quotes, setQuotes] = useState<ResidentialQuote[]>(() => {
    try {
      const saved = localStorage.getItem('volt_quotes');
      return saved ? JSON.parse(saved) : DEFAULT_QUOTES;
    } catch {
      return DEFAULT_QUOTES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('volt_sav_tickets', JSON.stringify(tickets));
    } catch {}
  }, [tickets]);

  useEffect(() => {
    try {
      localStorage.setItem('volt_quotes', JSON.stringify(quotes));
    } catch {}
  }, [quotes]);

  const handleSelectTab = (tab: ScreenTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCalculateNeeds = () => {
    setCurrentTab('accueil');
    setTimeout(() => {
      const el = document.getElementById('simulateur');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOpenBooking = (prod: GensetProduct) => {
    setBookingModalData({
      productName: prod.name,
      basePrice: prod.price,
      power: prod.power,
      defaultHasAts: prod.atsType === 'ats-inclus',
    });
  };

  const handleOrderFromSpec = (specIdx: number) => {
    const prod = GENSET_PRODUCTS[specIdx] || GENSET_PRODUCTS[0];
    setTechSpecsIndex(null);
    handleOpenBooking(prod);
  };

  const handleAddTicket = (newTicket: SAVTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  const handleUpdateTicketStatus = (ticketId: string, newStatus: SAVTicket['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
  };

  const handleUpdateTicketTech = (ticketId: string, techName: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, technician: techName } : t))
    );
  };

  const handleConfirmQuote = (quoteId: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: 'Confirmé' } : q))
    );
  };

  const handleAddQuoteRequest = (data: {
    client: string;
    phone: string;
    zone: string;
    propertyType: string;
    formula: string;
    kva: string;
  }) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newQuote: ResidentialQuote = {
      id: `DEV-${randomSuffix}`,
      client: data.client,
      phone: data.phone,
      zone: data.zone,
      kva: data.kva,
      propertyType: data.propertyType,
      formula: data.formula,
      status: 'En attente',
      date: new Date().toLocaleDateString('fr-FR'),
    };
    setQuotes((prev) => [newQuote, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] text-[#141b2b]">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenAdmin={() => {
          if (isAdminUnlocked) {
            setCurrentTab('support-depannage-steg');
            setTimeout(() => {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }, 100);
          } else {
            setAdminPinModalOpen(true);
          }
        }}
        onCalculateNeeds={handleCalculateNeeds}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-1 flex flex-col">
        {currentTab === 'accueil' && (
          <HomeScreen
            onNavigateTab={handleSelectTab}
            onOpenBooking={handleOpenBooking}
            onOpenTechSpecs={(idx) => setTechSpecsIndex(idx)}
            onRequestQuoteSubmit={handleAddQuoteRequest}
          />
        )}

        {currentTab === 'vente-residentielle' && (
          <SalesScreen
            onOpenBooking={handleOpenBooking}
            onOpenTechSpecs={(idx) => setTechSpecsIndex(idx)}
          />
        )}

        {currentTab === 'location-simulateur' && <RentalScreen />}

        {currentTab === 'support-depannage-steg' && (
          <SupportScreen
            tickets={tickets}
            quotes={quotes}
            isAdminUnlocked={isAdminUnlocked}
            onOpenPinModal={() => setAdminPinModalOpen(true)}
            onLockAdmin={() => setIsAdminUnlocked(false)}
            onAddTicket={handleAddTicket}
            onUpdateTicketStatus={handleUpdateTicketStatus}
            onUpdateTicketTech={handleUpdateTicketTech}
            onConfirmQuote={handleConfirmQuote}
          />
        )}
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Modals */}
      <TechSpecsModal
        specIndex={techSpecsIndex}
        onClose={() => setTechSpecsIndex(null)}
        onOrder={handleOrderFromSpec}
      />

      {bookingModalData && (
        <BookingModal
          isOpen={Boolean(bookingModalData)}
          onClose={() => setBookingModalData(null)}
          productName={bookingModalData.productName}
          basePrice={bookingModalData.basePrice}
          power={bookingModalData.power}
          defaultHasAts={bookingModalData.defaultHasAts}
        />
      )}

      <AdminPinModal
        isOpen={adminPinModalOpen}
        onClose={() => setAdminPinModalOpen(false)}
        onSuccess={() => {
          setIsAdminUnlocked(true);
          setAdminPinModalOpen(false);
          setCurrentTab('support-depannage-steg');
          setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }, 150);
        }}
      />
    </div>
  );
}
