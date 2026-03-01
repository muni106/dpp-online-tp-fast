export interface Product {
  id: string;
  name: string;
  brand: string;
  volume: string;
  image: string;
  origin: { country: string; region: string; producer: string };
  expiry: string;
  status: 'fresh' | 'expiring' | 'expired' | 'consumed' | 'recycled';
  organic: boolean;
  certifications: string[];
  nutrition: {
    energy: string; fat: string; saturatedFat: string; sugar: string; protein: string; salt: string;
  };
  ingredients: string;
  allergens: string[];
  sustainability: {
    co2: number; recyclability: number; animalWelfare: number; localSourcing: number; packaging: number;
  };
  batch: string;
  serial: string;
  journey: JourneyStep[];
  reviews: Review[];
}

export interface JourneyStep {
  label: string;
  detail: string;
  date: string;
  completed: boolean;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  category: string;
}

export const mockProducts: Product[] = [
  {
    id: 'milk-001',
    name: 'Alpine Fresh Whole Milk',
    brand: 'Bergbauer',
    volume: '1L',
    image: 'milk-carton-1',
    origin: { country: 'Austria', region: 'Tyrol', producer: 'Hof Annabella' },
    expiry: '2026-02-28',
    status: 'fresh',
    organic: true,
    certifications: ['EU Organic', 'FSC', 'Carbon Neutral'],
    nutrition: { energy: '272 kJ', fat: '3.6g', saturatedFat: '2.3g', sugar: '4.8g', protein: '3.4g', salt: '0.1g' },
    ingredients: 'Pasteurised whole milk (3.6% fat)',
    allergens: ['Milk'],
    sustainability: { co2: 85, recyclability: 92, animalWelfare: 90, localSourcing: 95, packaging: 88 },
    batch: 'BRG-2026-0131',
    serial: 'TP-AT-00482917',
    journey: [
      { label: 'Farm Origin', detail: 'Hof Annabella, Tyrol, Austria', date: '2026-01-28', completed: true },
      { label: 'Processing', detail: 'Tetra Pak Plant, Innsbruck', date: '2026-01-29', completed: true },
      { label: 'Quality Check', detail: 'Passed all 12 quality tests', date: '2026-01-29', completed: true },
      { label: 'Distribution', detail: 'Regional warehouse, Vienna', date: '2026-01-30', completed: true },
      { label: 'In Store', detail: 'SPAR Mariahilfer Straße', date: '2026-01-31', completed: true },
      { label: 'At Home', detail: 'Purchased by you', date: '2026-02-01', completed: false },
    ],
    reviews: [
      { id: 'r1', user: 'Maria S.', avatar: 'MS', rating: 5, text: 'Best milk I\'ve ever tasted! So creamy and fresh.', date: '2026-01-25', category: 'Taste' },
      { id: 'r2', user: 'Thomas K.', avatar: 'TK', rating: 4, text: 'Love the sustainable packaging. Great initiative!', date: '2026-01-20', category: 'Sustainability' },
      { id: 'r3', user: 'Anna L.', avatar: 'AL', rating: 5, text: 'Knowing exactly where my milk comes from is amazing.', date: '2026-01-18', category: 'Sustainability' },
    ],
  },
  {
    id: 'juice-001',
    name: 'Sunny Grove Orange Juice',
    brand: 'NaturPur',
    volume: '1L',
    image: 'juice-carton-1',
    origin: { country: 'Spain', region: 'Valencia', producer: 'Finca Sol' },
    expiry: '2026-02-15',
    status: 'expiring',
    organic: false,
    certifications: ['Rainforest Alliance', 'FSC'],
    nutrition: { energy: '180 kJ', fat: '0.1g', saturatedFat: '0g', sugar: '8.4g', protein: '0.7g', salt: '0g' },
    ingredients: '100% squeezed orange juice from concentrate',
    allergens: [],
    sustainability: { co2: 70, recyclability: 90, animalWelfare: 100, localSourcing: 40, packaging: 85 },
    batch: 'NP-2026-0125',
    serial: 'TP-ES-00193847',
    journey: [
      { label: 'Farm Origin', detail: 'Finca Sol, Valencia, Spain', date: '2026-01-20', completed: true },
      { label: 'Processing', detail: 'Tetra Pak Plant, Barcelona', date: '2026-01-22', completed: true },
      { label: 'Quality Check', detail: 'Passed all tests', date: '2026-01-22', completed: true },
      { label: 'Distribution', detail: 'Central warehouse, Munich', date: '2026-01-24', completed: true },
      { label: 'In Store', detail: 'REWE Hauptbahnhof', date: '2026-01-25', completed: true },
      { label: 'At Home', detail: 'Purchased by you', date: '2026-01-26', completed: false },
    ],
    reviews: [
      { id: 'r4', user: 'Julia M.', avatar: 'JM', rating: 4, text: 'Really refreshing, tastes like real oranges!', date: '2026-01-22', category: 'Taste' },
      { id: 'r5', user: 'Peter W.', avatar: 'PW', rating: 3, text: 'Good juice but wish it was organic.', date: '2026-01-19', category: 'Taste' },
    ],
  },
  {
    id: 'oat-001',
    name: 'Nordic Oat Drink',
    brand: 'HavreGård',
    volume: '1L',
    image: 'oat-milk-carton',
    origin: { country: 'Sweden', region: 'Skåne', producer: 'Lundgren Farm' },
    expiry: '2026-03-15',
    status: 'fresh',
    organic: true,
    certifications: ['EU Organic', 'FSC', 'Vegan Society', 'Carbon Neutral'],
    nutrition: { energy: '195 kJ', fat: '1.5g', saturatedFat: '0.2g', sugar: '3.2g', protein: '1.0g', salt: '0.1g' },
    ingredients: 'Water, oats (11%), rapeseed oil, calcium, salt, vitamins (D2, B12, riboflavin)',
    allergens: ['Gluten (oats)'],
    sustainability: { co2: 95, recyclability: 92, animalWelfare: 100, localSourcing: 80, packaging: 90 },
    batch: 'HG-2026-0201',
    serial: 'TP-SE-00739182',
    journey: [
      { label: 'Farm Origin', detail: 'Lundgren Farm, Skåne, Sweden', date: '2026-01-30', completed: true },
      { label: 'Processing', detail: 'Tetra Pak Plant, Lund', date: '2026-02-01', completed: true },
      { label: 'Quality Check', detail: 'Passed all tests', date: '2026-02-01', completed: true },
      { label: 'Distribution', detail: 'Nordic warehouse, Malmö', date: '2026-02-03', completed: true },
      { label: 'In Store', detail: 'ICA Maxi', date: '2026-02-05', completed: true },
      { label: 'At Home', detail: 'Not purchased yet', date: '', completed: false },
    ],
    reviews: [
      { id: 'r6', user: 'Erik N.', avatar: 'EN', rating: 5, text: 'Perfect for coffee, froths beautifully!', date: '2026-02-03', category: 'Taste' },
      { id: 'r7', user: 'Sara B.', avatar: 'SB', rating: 5, text: 'Carbon neutral AND delicious. Win-win!', date: '2026-02-01', category: 'Sustainability' },
    ],
  },
];
