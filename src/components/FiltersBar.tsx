const CATEGORY_TABS = [
  { key: 'todos', label: 'Todos' },
  { key: 'moletons', label: 'Moletons' },
  { key: 'camisetas', label: 'Camisetas' },
  { key: 'calcas', label: 'Calças' },
  { key: 'acessorios', label: 'Acessórios' },
];

interface FiltersBarProps {
  category: string;
  onCategoryChange: (value: string) => void;
  isPanelOpen: boolean;
  priceMin: string;
  priceMax: string;
  onPriceMinChange: (value: string) => void;
  onPriceMaxChange: (value: string) => void;
  availableSizes: string[];
  selectedSizes: string[];
  onToggleSize: (size: string) => void;
  availableColors: string[];
  selectedColors: string[];
  onToggleColor: (color: string) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

export default function FiltersBar({
  category,
  onCategoryChange,
  isPanelOpen,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  availableSizes,
  selectedSizes,
  onToggleSize,
  availableColors,
  selectedColors,
  onToggleColor,
  onClearFilters,
  activeFilterCount,
}: FiltersBarProps) {
  return (
    <div className="filters-bar">
      <div className="filter-tabs">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.key}
            className={`filter-tab ${category === tab.key ? 'is-active' : ''}`}
            onClick={() => onCategoryChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isPanelOpen && (
        <div className="filters-panel">
          <div className="filters-group">
            <p className="filters-label">Preço</p>
            <div className="price-inputs">
              <input
                type="number"
                min="0"
                placeholder="Mín."
                value={priceMin}
                onChange={(e) => onPriceMinChange(e.target.value.replace('-', ''))}
              />
              <span>até</span>
              <input
                type="number"
                min="0"
                placeholder="Máx."
                value={priceMax}
                onChange={(e) => onPriceMaxChange(e.target.value.replace('-', ''))}
              />
            </div>
          </div>

          <div className="filters-group">
            <p className="filters-label">Tamanho</p>
            <div className="filters-chip-list">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  className={`size-chip ${selectedSizes.includes(size) ? 'is-selected' : ''}`}
                  onClick={() => onToggleSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="filters-group">
            <p className="filters-label">Cor</p>
            <div className="filters-chip-list">
              {availableColors.map((color) => (
                <button
                  key={color}
                  className={`filters-color-chip ${selectedColors.includes(color) ? 'is-selected' : ''}`}
                  onClick={() => onToggleColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {activeFilterCount > 0 && (
            <button className="filters-clear" onClick={onClearFilters}>
              Limpar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}
