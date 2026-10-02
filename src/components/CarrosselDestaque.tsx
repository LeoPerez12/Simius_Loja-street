import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { formatPrice, imageUrl } from '../utils/format';

interface CarrosselDestaqueProps {
  /** ids dos produtos que aparecem no carrossel, na ordem desejada */
  featuredIds?: number[];
}

const DEFAULT_FEATURED_IDS = [1, 7, 4];

export default function CarrosselDestaque({ featuredIds = DEFAULT_FEATURED_IDS }: CarrosselDestaqueProps) {
  const navigate = useNavigate();

  const slides = featuredIds
    .map((id) => PRODUCTS.find((product) => product.id === id))
    .filter((product): product is (typeof PRODUCTS)[number] => Boolean(product));

  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goTo = (index: number) => {
    setCurrent((index + slides.length) % slides.length);
  };

  useEffect(() => {
    if (slides.length <= 1 || isHovered) return;
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [slides.length, isHovered]);

  if (slides.length === 0) return null;

  const product = slides[current];

  return (
    <section className="featured-carousel" aria-label="Produtos em destaque">
      <div
        className="featured-backdrop"
        style={{ backgroundImage: `url(${imageUrl(product.seed, 1600, 900)})` }}
        aria-hidden="true"
      />
      <div className="featured-backdrop-tint" aria-hidden="true" />

      <div className="featured-carousel-inner">
        <button
          className="featured-arrow featured-arrow-prev"
          aria-label="Destaque anterior"
          onClick={() => goTo(current - 1)}
        >
          ‹
        </button>

        <div className="featured-slide">
          <div
            className="featured-image"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(`/produto/${product.id}`)}
          >
            <img src={imageUrl(product.seed, 900, 1000)} alt={product.name} />
          </div>

          <div className="featured-info">
            <span className="featured-category">{product.categoryLabel}</span>
            <h2 className="featured-name">{product.name}</h2>
            <p className="featured-price">{formatPrice(product.price)}</p>
            <button className="btn btn-primary" onClick={() => navigate(`/produto/${product.id}`)}>
              Comprar
            </button>
          </div>
        </div>

        <button
          className="featured-arrow featured-arrow-next"
          aria-label="Próximo destaque"
          onClick={() => goTo(current + 1)}
        >
          ›
        </button>

        <div className="featured-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`featured-dot ${index === current ? 'is-active' : ''}`}
              aria-label={`Ir para destaque ${index + 1}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
