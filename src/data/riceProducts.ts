// src/data/riceProducts.ts
export interface RiceProduct {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  sku: string;
  weightKg: number;
  priceNum: number;
  priceDisplay: string;
  imageUrl: string;
  badge?: string;
  origin?: string;
}

export const riceProducts: RiceProduct[] = [
  {
    id: 'sona-masoori-5kg',
    name: 'Sona Masoori',
    subtitle: 'Premium Raw Rice',
    description: 'Light, fluffy, and low in starch. Ideal for everyday cooking, idli, dosa, and biryanis. Sourced directly from Andhra Pradesh farms.',
    sku: 'RICE-SM-5',
    weightKg: 5,
    priceNum: 350,
    priceDisplay: '₹350',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/raasa-organic.firebasestorage.app/o/rice%2Fsona-masoori.jpg?alt=media',
    badge: 'Bestseller',
    origin: 'Andhra Pradesh',
  },
  {
    id: 'ponni-raw-5kg',
    name: 'Ponni Raw',
    subtitle: 'Traditional South Indian Rice',
    description: 'Soft-cooked, mildly aromatic rice beloved in Tamil Nadu. Perfect for sambar rice, curd rice, and daily meals.',
    sku: 'RICE-PR-5',
    weightKg: 5,
    priceNum: 320,
    priceDisplay: '₹320',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/raasa-organic.firebasestorage.app/o/rice%2Fponni-raw.jpg?alt=media',
    origin: 'Tamil Nadu',
  },
  {
    id: 'basmati-premium-5kg',
    name: 'Basmati Premium',
    subtitle: 'Long Grain Aromatic Rice',
    description: 'Extra-long, aged basmati grains with a rich aroma. The perfect choice for biryanis, pulao, and festive dishes.',
    sku: 'RICE-BP-5',
    weightKg: 5,
    priceNum: 650,
    priceDisplay: '₹650',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/raasa-organic.firebasestorage.app/o/rice%2Fbasmati.jpg?alt=media',
    badge: 'Premium',
    origin: 'Dehradun',
  },
  {
    id: 'red-rice-2kg',
    name: 'Red Matta Rice',
    subtitle: 'Nutritious Kerala Rice',
    description: 'Rich in fibre and antioxidants. The traditional Keralite staple, excellent with fish curry, vegetable stews, and kanji.',
    sku: 'RICE-RM-2',
    weightKg: 2,
    priceNum: 220,
    priceDisplay: '₹220',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/raasa-organic.firebasestorage.app/o/rice%2Fred-matta.jpg?alt=media',
    badge: 'Healthy',
    origin: 'Kerala',
  },
];
