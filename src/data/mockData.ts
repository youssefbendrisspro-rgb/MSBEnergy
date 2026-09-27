import { GensetProduct, RentalPack, LoadItem, SAVTicket, ResidentialQuote } from '../types';

export const GENSET_PRODUCTS: GensetProduct[] = [
  {
    id: 'volt-home-3-5',
    name: 'VOLT Home 3.5 Silent',
    power: '3.5 kVA',
    powerNum: 3.5,
    atsType: 'electrique',
    atsLabel: 'Option manuelle/auto',
    stockType: 'immediat',
    stockLabel: 'Stock Tunis : 6 dispo',
    stockCount: 6,
    voltage: 'Monophasé 230V',
    noise: '65 dB(A) à 7m',
    fuelTank: '14 L (14h aut.)',
    autonomy: '15h d\'autonomie',
    price: 3200,
    targetUse: 'Appartement & Sécurité Vitale',
    description: 'Conçu pour la sécurité vitale : réfrigérateur combiné, routeur fibre, éclairage LED & circuit d\'alarme.',
    features: ['Réservoir 14L', '15h d\'autonomie', 'Démarrage élec.', 'Régul. AVR 1%']
  },
  {
    id: 'volt-home-6-5',
    name: 'VOLT Home 6.5 Silent ATS-R',
    power: '6.5 kVA',
    powerNum: 6.5,
    atsType: 'ats-ready',
    atsLabel: 'Inclus & Précâblé ATS-R',
    stockType: 'immediat',
    stockLabel: 'Stock : 11 dispo',
    stockCount: 11,
    voltage: 'Monophasé 230V / 28A',
    noise: '62 dB(A) à 7m',
    fuelTank: '16 L (16h aut.)',
    autonomy: '12h d\'autonomie continue',
    price: 5400,
    targetUse: 'Maison Standard & 1 Split',
    description: 'Électronique de pointe compatible ATS externe. Supporte 1 grand climatiseur (18 000 BTU) + électroménager total.',
    features: ['Réservoir 16L', '12h d\'autonomie', 'Connecteur ATS-R', 'Charge Moteur AC']
  },
  {
    id: 'volt-villa-10',
    name: 'VOLT Villa 10 Silent ATS',
    power: '10.0 kVA',
    powerNum: 10.0,
    atsType: 'ats-inclus',
    atsLabel: 'Automatique Intégré',
    stockType: 'immediat',
    stockLabel: 'Stock : 4 dispo',
    stockCount: 4,
    voltage: 'Dual-Voltage Mono / Tri 400V',
    noise: '60 dB(A) Caisson Pro',
    fuelTank: '25 L (20h aut.)',
    autonomy: '11h régime nominal',
    price: 8900,
    targetUse: 'Grandes Demeures & Piscine',
    description: 'Moteur bi-cylindre refroidissement liquide. Démarrage et permutation automatique en moins de 10 secondes lors d\'une panne réseau.',
    features: ['Refroid. Eau', 'Réservoir 25L', 'Bascule < 10s', 'Multi-Climatisé'],
    isBestSeller: true
  },
  {
    id: 'volt-pro-15',
    name: 'VOLT Pro Resident 15 SS',
    power: '15.0 kVA',
    powerNum: 15.0,
    atsType: 'ats-inclus',
    atsLabel: 'Numérique Haute Précision',
    stockType: '72h',
    stockLabel: 'Stock : Sur commande 48h',
    stockCount: 2,
    voltage: 'Triphasé 400V • 1500 Tr/min',
    noise: '59 dB(A) Super Silent',
    fuelTank: '35 L - 40 L (24h aut.)',
    autonomy: '18h à pleine capacité',
    price: 12800,
    targetUse: 'Domaines Privés & Cliniques',
    description: 'Moteur industriel 3 cylindres basse rotation (1500 tr/min). Conçu pour un service continu silencieux sur domaines et cliniques.',
    features: ['1500 Tr/min', 'Réservoir 40L', 'IoT & GSM 4G', 'Protection IP54']
  }
];

export const RENTAL_PACKS: RentalPack[] = [
  {
    id: 'secours',
    title: 'Pack Secours Particulier',
    power: '6.5 kVA Silent Inverter Ready',
    category: 'Appart & Petite Villa',
    noise: '54 dB(A) @ 7m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqz6DTWb-sk9DG-eEQlUz883H7b7CYzWET5pubvq4JuJ7a5qmRStoAV7ybGGFEesdsmE66TGuhcmqJweCBKC9o5L4A_bYVZDETVbLERY2lwPq5_e9tqrC9p-dyRFsjVE15p5AQglnc2rDN8F-nhJ_rEjGrGciV7MKxx23ucpV3Q_ThyxOeSy_xx33vJfigDFe_WTd4ATk4b6cLQnc6DUcWOy7UxbXA3hG6rgo668YC0w3bonqdu0F25w',
    voltageLabel: 'Monophasé 230V / 28A',
    dailyRate: 75,
    weeklyRate: 380,
    weeklySavings: 145,
    features: [
      'Câblage souple 15m & mise en service certifiée',
      'Alimente : Frigos, TV, Éclairage LED, Wi-Fi, 1 Split',
      'Démarrage électrique assisté par batterie'
    ]
  },
  {
    id: 'serenite',
    title: 'Pack Sérénité Villa',
    power: '10 kVA Silent avec ATS Mobile',
    category: 'Grandes Demeures & Piscine',
    noise: '52 dB(A) @ 7m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyBUzFqoULgPWsLSAOHHWmndx7uiia7RERkBd7Wd_VoLMHzFYPPiUApJt29fH3mHbS_uzFQjF9wE4yeSBuzW1ypYSOCxCmFLQjlkykdzd9Z9IyfSWeqNhBTjkYzjr0EOv7N-FwKI0U-oX-Z4LHPvOAuw0o5tsvFUGzHRD6w-BoH23NzR7qS0hKAlA8xp0VGzS79oeer3UrQ7RNw2Jxe46PahUirg75LS0r_M2M4Vuk0YGw_NaB4dyZZA',
    badge: 'Recommandé Résidences',
    voltageLabel: 'Mono / Triphasé 400V Commutable',
    dailyRate: 120,
    weeklyRate: 600,
    weeklySavings: 240,
    recommended: true,
    features: [
      'Inverseur Automatique (ATS) inclus : bascule en 4 sec',
      'Supporte : Pompe piscine, 3 Climatiseurs 12000 BTU, Cuisine',
      'Autonomie 18h en charge nominale (réservoir 32L)'
    ]
  },
  {
    id: 'evenement',
    title: 'Pack Événement Privé',
    power: '15 kVA Super Silent Acoustique',
    category: 'Mariages & Réceptions',
    noise: '≤ 49 dB(A) @ 7m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPKavyl-3C1fvo1SpM8vXy8BhWvpyuPcBP1CPJT1GSMVVtbWu2w144W5IxqNkgT6R44JkBTwuLO9ZJ0jRg6ymNqTXPseoxbrdasSHzRxQ_jj8hm8JNhMZvq1jR2e7ZO2836HxAOCxQzxDxJvegVsO2U1r4J14UjxDFpru3eK4TN6WeOkmwVahGdDfS8MJxNrV7V4dpa3PYWayVIYA8k72v85nkbb5mYMhD5Uc3SxadRoDuSFoTAseqkA',
    voltageLabel: 'Triphasé 400V Haute Stabilité AVR',
    dailyRate: 190,
    weeklyRate: 950,
    weeklySavings: 380,
    features: [
      'Insonorisation double caisson acoustique (zéro bruit d\'ambiance)',
      'Spécial sonorisation pro, traiteurs, éclairage scénique & DJ',
      'Technicien de piquetage dédié sur site pendant l\'événement'
    ]
  }
];

export const INITIAL_LOAD_ITEMS: LoadItem[] = [
  {
    id: 'item-led',
    title: 'Éclairage LED + Box Fibre Wi-Fi + Téléviseurs',
    subtitle: 'Essentiel domotique, télétravail et sécurité alarme',
    kva: 0.5,
    checked: true
  },
  {
    id: 'item-fridge',
    title: 'Réfrigérateur Multi-portes & Congélateur',
    subtitle: 'Préservation de la chaîne du froid alimentaire',
    kva: 1.2,
    checked: true
  },
  {
    id: 'item-ac1',
    title: 'Climatiseur Inverter 12 000 BTU (Salon / Pièce de vie)',
    subtitle: 'Climatisation continue pendant les chaleurs estivales',
    kva: 2.2,
    checked: true
  },
  {
    id: 'item-ac2',
    title: '2ème Climatiseur Inverter (Zone Nuit / Chambres)',
    subtitle: 'Confort thermique nocturne ininterrompu',
    kva: 2.2,
    checked: false
  },
  {
    id: 'item-pump',
    title: 'Pompe à eau / Surpresseur domestique / Forage',
    subtitle: 'Alimentation continue des cuves et arrosage jardin',
    kva: 1.5,
    checked: false
  },
  {
    id: 'item-heavy',
    title: 'Équipements Lourds (Chauffe-eau instantané, Four, Piscine)',
    subtitle: 'Grande villa ou commerce (boulangerie, officine)',
    kva: 3.5,
    checked: false
  }
];

export const DEFAULT_SAV_TICKETS: SAVTicket[] = [
  {
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
    description: 'Voyant rouge anomalie phase allumé après coupure secteur à 14h10.'
  },
  {
    id: 'VOLT-2026-88409',
    client: 'Mme Sonia Cherif',
    phone: '+216 22 550 112',
    zone: 'La Marsa Nassine',
    model: 'VOLT Silent-Pro 12 kVA',
    urgency: 'Urgent',
    issue: 'Défaut de tension après reprise STEG',
    technician: 'T. Anis Riahi (Véhicule VOLT-02)',
    status: 'Pris en charge',
    timestamp: 'Il y a 45 min',
    description: 'Tension oscillant entre 190V et 210V au réarmement.'
  },
  {
    id: 'VOLT-2026-88395',
    client: 'Résidence Les Pins',
    phone: '+216 50 330 900',
    zone: 'Gammarth Supérieur',
    model: 'VOLT Sovereign 80 kVA',
    urgency: 'Critique',
    issue: 'Ravitaillement Diesel d\'urgence (Cuve < 15%)',
    technician: 'Équipe Citerne C1',
    status: 'Dépanné',
    timestamp: 'Il y a 2h',
    description: 'Livraison de 450L de gasoil 50 ppm purifié effectuée.'
  }
];

export const DEFAULT_QUOTES: ResidentialQuote[] = [
  {
    id: 'DEV-1082',
    client: 'Villa Khemir',
    phone: '+216 98 111 222',
    zone: 'Ennasr II',
    kva: '22 kVA Triphasé',
    propertyType: 'Villa individuelle avec jardin',
    formula: 'Achat & Pose Définitive',
    status: 'En attente',
    date: '27/09/2026'
  },
  {
    id: 'DEV-1083',
    client: 'Domaine Bouazizi',
    phone: '+216 20 444 555',
    zone: 'Sidi Bou Saïd',
    kva: '45 kVA Hybride',
    propertyType: 'Domaine agricole / Forage',
    formula: 'Achat & Pose Définitive',
    status: 'En attente',
    date: '27/09/2026'
  },
  {
    id: 'DEV-1084',
    client: 'Architecte H. Zid',
    phone: '+216 29 777 888',
    zone: 'La Marsa Cube',
    kva: '12 kVA Monophasé',
    propertyType: 'Duplex / Appartement avec terrasse',
    formula: 'Achat & Pose Définitive',
    status: 'Confirmé',
    date: '26/09/2026'
  },
  {
    id: 'DEV-1085',
    client: 'Clinique Dr. Baccouche',
    phone: '+216 97 333 444',
    zone: 'El Menzah VI',
    kva: '80 kVA Continu',
    propertyType: 'Commerce / Pharmacie / Cabinet',
    formula: 'Location Mensuelle',
    status: 'En attente',
    date: '26/09/2026'
  }
];

export const DETAILED_SPECS = [
  {
    title: 'VOLT Home 3.5 Silent',
    power: '3.5 kVA / 2.8 kW',
    engine: 'Monocylindre 4-Temps Diesel Refroidissement Air (418 cc)',
    voltage: '230V Monophasé - 50 Hz',
    fuelTank: '14 Litres (Consommation : ~0.9 L/h à 75% de charge)',
    autonomy: '15 heures en charge continue',
    noise: '65 dB(A) à 7 mètres',
    starting: 'Démarreur électrique avec clé + batterie Gel 12V 30Ah incluse',
    weight: '142 kg avec châssis mobile sur roulettes polyuréthane',
    protection: 'Régulateur de tension AVR ±1.0%, coupure manque d\'huile, disjoncteur thermique Schneider'
  },
  {
    title: 'VOLT Home 6.5 Silent ATS-Ready',
    power: '6.5 kVA / 5.2 kW',
    engine: 'Monocylindre Diesel Haut Rendement Injection Directe (498 cc)',
    voltage: '230V Monophasé - 50 Hz',
    fuelTank: '16 Litres (Consommation : ~1.3 L/h à 75% de charge)',
    autonomy: '12 heures d\'exploitation continue',
    noise: '64 dB(A) à 7 mètres',
    starting: 'Connecteur multipoint ATS Plug-and-Play + Démarreur électrique',
    weight: '168 kg avec isolation acoustique double épaisseur',
    protection: 'Module ATS-Ready compatible avec armoire automatique VOLT, protection surtension différentielle 30mA'
  },
  {
    title: 'VOLT Villa 10 Silent ATS',
    power: '10.0 kVA / 8.0 kW',
    engine: 'Bi-cylindre en V Diesel Refroidissement Liquide (870 cc)',
    voltage: 'Dual-Voltage : 230V Monophasé & 400V Triphasé commutable',
    fuelTank: '25 Litres avec jauge de niveau télémétrique',
    autonomy: '11 heures à régime nominal',
    noise: '62 dB(A) à 7 mètres (Canopy Premium)',
    starting: 'Inverseur de source ATS mural intégré avec temps de commutation < 10s',
    weight: '285 kg monté sur amortisseurs vibratoires néoprène',
    protection: 'Contrôleur numérique DeepSea DSE4520, préchauffage bloc moteur, chargeur maintien de batterie réseau'
  },
  {
    title: 'VOLT Pro Resident 15 Super Silent',
    power: '15.0 kVA / 12.0 kW',
    engine: 'Moteur Industriel 3-Cylindres en ligne 1500 tr/min Refroidissement Eau (1 350 cc)',
    voltage: '400V Triphasé + Neutre - 50 Hz',
    fuelTank: '40 Litres grande autonomie',
    autonomy: '18 heures à pleine capacité',
    noise: '60 dB(A) à 7 mètres (Isolation phonique phonocapte)',
    starting: 'Automatisme intégral avec synchronisation réseau STEG',
    weight: '480 kg, œillets de levage et passages pour transpalette',
    protection: 'Module GSM 4G intégré pour alertes SMS en cas de coupure STEG, disjoncteur motorisé tétrapolaire'
  }
];
