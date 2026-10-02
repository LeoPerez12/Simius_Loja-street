import { CATEGORIES } from '../data/products';
import CategoryCard from './CategoryCard';

interface CategoriesProps {
  onSelectCategory: (filter: string) => void;
}

export default function Categories({ onSelectCategory }: CategoriesProps) {
  return (
    <section className="categories" id="categorias">
      <div className="section-head">
        <h2>Categorias</h2>
      </div>
      <div className="category-grid">
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category.filter}
            name={category.name}
            seed={category.seed}
            onClick={() => onSelectCategory(category.filter)}
          />
        ))}
      </div>
    </section>
  );
}
