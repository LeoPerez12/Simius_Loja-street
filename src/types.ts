export interface ProductColor {
  name: string;
  hex: string;
}

export interface SizeMeasurement {
  size: string;
  /** largura do busto/peito, em cm */
  chest?: string;
  /** comprimento da peça, em cm */
  length?: string;
  /** comprimento da manga, em cm (camisetas/moletons) */
  sleeve?: string;
  /** cintura, em cm (calças/shorts) */
  waist?: string;
  /** quadril, em cm (calças/shorts) */
  hip?: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  categoryLabel: string;
  price: number;
  seed: string;
  sizes: string[];
  colors: ProductColor[];
  sizeChart: SizeMeasurement[];
  description: string;
}

export interface Category {
  name: string;
  filter: string;
  seed: string;
}

export interface CartItem {
  id: number;
  size: string;
  color: string;
  qty: number;
}
