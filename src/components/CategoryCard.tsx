import { imageUrl } from '../utils/format';

interface CategoryCardProps {
  name: string;
  seed: string;
  onClick: () => void;
}

export default function CategoryCard({ name, seed, onClick }: CategoryCardProps) {
  return (
    <button className="category-card" onClick={onClick}>
      <img src={imageUrl(seed, 500, 620)} alt={name} loading="lazy" />
      <span className="category-label">{name}</span>
    </button>
  );
}
