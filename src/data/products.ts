import type { Category, Product } from '../types';

export const CATEGORIES: Category[] = [
  { name: 'Moletons', filter: 'moletons', seed: 'simius-moletom' },
  { name: 'Camisetas', filter: 'camisetas', seed: 'simius-camiseta' },
  { name: 'Calças', filter: 'calcas', seed: 'simius-calca' },
  { name: 'Acessórios', filter: 'acessorios', seed: 'simius-acessorio' },
];

const TOPS_SIZE_CHART = [
  { size: 'P', chest: '54', length: '68', sleeve: '60' },
  { size: 'M', chest: '58', length: '70', sleeve: '62' },
  { size: 'G', chest: '62', length: '72', sleeve: '64' },
  { size: 'GG', chest: '66', length: '74', sleeve: '66' },
];

const BOTTOMS_SIZE_CHART = [
  { size: '38', waist: '76', hip: '96', length: '100' },
  { size: '40', waist: '80', hip: '100', length: '101' },
  { size: '42', waist: '84', hip: '104', length: '102' },
  { size: '44', waist: '88', hip: '108', length: '103' },
];

// máximo de 6 produtos por enquanto
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Moletom Oversized Heavyweight',
    category: 'moletons',
    categoryLabel: 'Moletons',
    price: 259.9,
    seed: 'simius-moletom-1',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#121212' },
      { name: 'Cinza Chumbo', hex: '#4b4b4b' },
      { name: 'Off-White', hex: '#efece6' },
    ],
    sizeChart: TOPS_SIZE_CHART,
    description:
      'Malha 400g, gola careca reforçada e caimento solto. Uma peça pra usar sem pensar duas vezes.',
  },
  {
    id: 2,
    name: 'Moletom Zíper College',
    category: 'moletons',
    categoryLabel: 'Moletons',
    price: 289.9,
    seed: 'simius-moletom-2',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#121212' },
      { name: 'Verde Musgo', hex: '#4a5240' },
    ],
    sizeChart: TOPS_SIZE_CHART,
    description:
      'Zíper frontal em metal, bolsos canguru e capuz forrado. Construção pesada, acabamento limpo.',
  },
  {
    id: 4,
    name: 'Camiseta Box Fit Básica',
    category: 'camisetas',
    categoryLabel: 'Camisetas',
    price: 129.9,
    seed: 'simius-camiseta-1',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#121212' },
      { name: 'Branco', hex: '#ffffff' },
      { name: 'Bege', hex: '#d8cdbb' },
    ],
    sizeChart: TOPS_SIZE_CHART,
    description: 'Corte quadrado, ombro caído e malha 100% algodão 180g. Base pra qualquer combinação.',
  },
  {
    id: 5,
    name: 'Camiseta Manga Longa Ribbed',
    category: 'camisetas',
    categoryLabel: 'Camisetas',
    price: 149.9,
    seed: 'simius-camiseta-2',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { name: 'Preto', hex: '#121212' },
      { name: 'Cinza Mescla', hex: '#a9a9a3' },
    ],
    sizeChart: TOPS_SIZE_CHART,
    description: 'Malha canelada com elastano, gola careca alta e punho justo. Feita pra layering.',
  },
  {
    id: 7,
    name: 'Calça Cargo Tactical',
    category: 'calcas',
    categoryLabel: 'Calças',
    price: 259.9,
    seed: 'simius-calca-1',
    sizes: ['38', '40', '42', '44'],
    colors: [
      { name: 'Preto', hex: '#121212' },
      { name: 'Verde Militar', hex: '#5b6151' },
    ],
    sizeChart: BOTTOMS_SIZE_CHART,
    description: 'Seis bolsos funcionais, sarja reforçada e ajuste por cadarço na barra. Feita pra durar.',
  },
  {
    id: 10,
    name: 'Boné Aba Curva Structured',
    category: 'acessorios',
    categoryLabel: 'Acessórios',
    price: 99.9,
    seed: 'simius-acessorio-1',
    sizes: ['Único'],
    colors: [
      { name: 'Preto', hex: '#121212' },
      { name: 'Off-White', hex: '#efece6' },
    ],
    sizeChart: [{ size: 'Único', length: 'Ajustável de 54 a 60cm de circunferência' }],
    description: 'Estrutura firme, aba curva pré-moldada e fecho de metal ajustável.',
  },
];

export const getProduct = (id: number): Product | undefined =>
  PRODUCTS.find((product) => product.id === id);
