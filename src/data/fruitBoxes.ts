// src/data/fruitBoxes.ts
export interface FruitBox {
  id: string;
  tier: 'small' | 'medium' | 'large';
  name: string;
  description: string;
  items: string[];
  weightKg: number;
  priceNum: number;
  priceDisplay: string;
  imageUrl: string;
  serves?: string;
}

export const fruitBoxes: FruitBox[] = [
  {
    id: 'fruit-box-small',
    tier: 'small',
    name: 'Small Fruit Box',
    description: 'A handpicked selection of 4–5 seasonal fruits. Perfect for individuals or small households.',
    items: ['Bananas (6 pcs)', 'Apples (4 pcs)', 'Oranges (4 pcs)', 'Guava (2 pcs)'],
    weightKg: 2,
    priceNum: 299,
    priceDisplay: '₹299',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/raasa-organic.firebasestorage.app/o/fruit%2Fsmall-box.jpg?alt=media',
    serves: '1–2 people',
  },
  {
    id: 'fruit-box-medium',
    tier: 'medium',
    name: 'Medium Fruit Box',
    description: 'A generous mix of 6–7 seasonal fruits to keep the whole family healthy through the week.',
    items: ['Bananas (12 pcs)', 'Apples (6 pcs)', 'Grapes (500 g)', 'Papaya (1 pc)', 'Pomegranate (2 pcs)', 'Pears (4 pcs)'],
    weightKg: 4,
    priceNum: 549,
    priceDisplay: '₹549',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/raasa-organic.firebasestorage.app/o/fruit%2Fmedium-box.jpg?alt=media',
    serves: '3–4 people',
  },
  {
    id: 'fruit-box-large',
    tier: 'large',
    name: 'Large Fruit Box',
    description: 'Our biggest box — loaded with 8–10 varieties of the freshest seasonal fruits for the whole family.',
    items: ['Bananas (18 pcs)', 'Apples (8 pcs)', 'Grapes (1 kg)', 'Watermelon (1 pc)', 'Mango (4 pcs)', 'Kiwi (4 pcs)', 'Pineapple (1 pc)', 'Oranges (6 pcs)'],
    weightKg: 8,
    priceNum: 999,
    priceDisplay: '₹999',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/raasa-organic.firebasestorage.app/o/fruit%2Flarge-box.jpg?alt=media',
    serves: '5–6 people',
  },
];
