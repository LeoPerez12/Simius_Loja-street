import { useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { searchProducts } from '../utils/search';
import type { Product } from '../types';
 
export function useProductFilters(searchQuery: string) {
  const [category, setCategoryRaw] = useState('todos');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const setCategory = (value: string) => {
    setCategoryRaw(value);
    setSizes([]);
    setColors([]);
  };

  const productsInCategory = useMemo(
    () => (category === 'todos' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)),
    [category]
  );

  const availableSizes = useMemo(
    () => Array.from(new Set(productsInCategory.flatMap((p) => p.sizes))),
    [productsInCategory]
  );

  const availableColors = useMemo(
    () => Array.from(new Set(productsInCategory.flatMap((p) => p.colors.map((c) => c.name)))),
    [productsInCategory]
  );

  const toggleSize = (size: string) => {
    setSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  const toggleColor = (color: string) => {
    setColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
  };

  const clearAll = () => {
    setCategoryRaw('todos');
    setPriceMin('');
    setPriceMax('');
    setSizes([]);
    setColors([]);
  };

  const filtered: Product[] = useMemo(() => {
    const searchMatches = searchQuery.trim()
      ? new Set(searchProducts(searchQuery, PRODUCTS.length).map((p) => p.id))
      : null;

    return PRODUCTS.filter((product) => {
      if (category !== 'todos' && product.category !== category) return false;
      if (searchMatches && !searchMatches.has(product.id)) return false;
      if (priceMin && product.price < Number(priceMin)) return false;
      if (priceMax && product.price > Number(priceMax)) return false;
      if (sizes.length > 0 && !product.sizes.some((s) => sizes.includes(s))) return false;
      if (colors.length > 0 && !product.colors.some((c) => colors.includes(c.name))) return false;
      return true;
    });
  }, [category, priceMin, priceMax, sizes, colors, searchQuery]);

  const activeFilterCount =
    (category !== 'todos' ? 1 : 0) + (priceMin ? 1 : 0) + (priceMax ? 1 : 0) + sizes.length + colors.length;

  return {
    filtered,
    category,
    setCategory,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    sizes,
    toggleSize,
    colors,
    toggleColor,
    clearAll,
    activeFilterCount,
    availableSizes,
    availableColors,
  };
}
