import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarrosselDestaque from '../components/CarrosselDestaque';
import Categories from '../components/Categories';
import FiltersBar from '../components/FiltersBar';
import ProductGrid from '../components/ProductGrid';
import { useProductFilters } from '../hooks/useProductFilters';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('busca') ?? '';
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const {
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
  } = useProductFilters(searchQuery);

  const handleSelectCategory = (value: string) => {
    setCategory(value);
    document.getElementById('colecao')?.scrollIntoView({ behavior: 'smooth' });
  };

  // quando chega uma busca pela URL (?busca=...), desce direto pra coleção
  useEffect(() => {
    if (searchQuery) {
      document.getElementById('colecao')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchQuery]);

  return (
    <>
      <CarrosselDestaque />
      <Categories onSelectCategory={handleSelectCategory} />

      <section className="products" id="colecao">
        <div className="section-head">
          <h2>Coleção atual</h2>

          <button className="filters-toggle" onClick={() => setIsFiltersOpen((open) => !open)}>
            Filtros
            {activeFilterCount > 0 && <span className="filters-count">{activeFilterCount}</span>}
          </button>
        </div>

        {searchQuery && (
          <p className="search-result-label">
            Resultados para: <strong>{searchQuery}</strong>
          </p>
        )}

        <FiltersBar
          category={category}
          onCategoryChange={setCategory}
          isPanelOpen={isFiltersOpen}
          priceMin={priceMin}
          priceMax={priceMax}
          onPriceMinChange={setPriceMin}
          onPriceMaxChange={setPriceMax}
          availableSizes={availableSizes}
          selectedSizes={sizes}
          onToggleSize={toggleSize}
          availableColors={availableColors}
          selectedColors={colors}
          onToggleColor={toggleColor}
          onClearFilters={clearAll}
          activeFilterCount={activeFilterCount}
        />

        <ProductGrid products={filtered} />
      </section>
    </>
  );
}
