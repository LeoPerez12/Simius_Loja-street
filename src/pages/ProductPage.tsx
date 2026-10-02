import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToastContext } from '../context/ToastContext';
import { formatPrice, imageUrl } from '../utils/format';
import { calculateShipping, formatCep } from '../utils/shipping';
import type { ShippingResult } from '../utils/shipping';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(Number(id));

  const { addToCart } = useCart();
  const { showToast } = useToastContext();

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name ?? '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? '');
  const [qty, setQty] = useState(1);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [cep, setCep] = useState('');
  const [shipping, setShipping] = useState<ShippingResult | null>(null);
  const [shippingError, setShippingError] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  if (!product) {
    return (
      <div className="product-page">
        <div className="product-page-inner product-page-not-found">
          <p>Produto não encontrado.</p>
          <Link to="/" className="btn btn-primary">
            Voltar para a coleção
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id, selectedSize, selectedColor, qty);
    showToast(`${product.name} adicionado à sacola`);
  };

  const handleCalculateShipping = async () => {
    setShippingError('');
    setShipping(null);
    setIsCalculating(true);
    try {
      const result = await calculateShipping(cep);
      setShipping(result);
    } catch (error) {
      setShippingError(error instanceof Error ? error.message : 'Não foi possível calcular o frete.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="product-page">
      <div className="product-page-inner">
        <nav className="breadcrumb" aria-label="Navegação">
          <Link to="/">Início</Link>
          <span>/</span>
          <Link to="/#colecao">{product.categoryLabel}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-page-grid">
          <button
            type="button"
            className="product-page-image"
            aria-label="Ver imagem em tamanho grande"
            onClick={() => setIsLightboxOpen(true)}
          >
            <img src={imageUrl(product.seed, 900, 1100)} alt={product.name} />
          </button>

          <div className="product-page-info">
            <p className="modal-category">{product.categoryLabel}</p>
            <h1 className="product-page-name">{product.name}</h1>
            <p className="product-page-price">{formatPrice(product.price)}</p>
            <p className="product-page-desc">{product.description}</p>

            {product.colors.length > 0 && (
              <>
                <p className="modal-label">Cor: {selectedColor}</p>
                <div className="color-swatches">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      className={`color-swatch ${color.name === selectedColor ? 'is-selected' : ''}`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                      title={color.name}
                      onClick={() => setSelectedColor(color.name)}
                    />
                  ))}
                </div>
              </>
            )}

            <p className="modal-label">Tamanho</p>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-chip ${size === selectedSize ? 'is-selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="qty-row">
              <p className="modal-label" style={{ marginTop: 0 }}>
                Quantidade
              </p>
              <div className="qty-stepper">
                <button aria-label="Diminuir quantidade" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span>{qty}</span>
                <button aria-label="Aumentar quantidade" onClick={() => setQty((q) => Math.min(5, q + 1))}>
                  +
                </button>
              </div>
            </div>

            <button className="btn btn-primary modal-add" onClick={handleAddToCart}>
              Adicionar à sacola
            </button>

            <div className="shipping-box">
              <p className="modal-label" style={{ marginTop: 0 }}>
                Calcular frete
              </p>
              <div className="shipping-form">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="00000-000"
                  value={cep}
                  maxLength={9}
                  onChange={(e) => setCep(formatCep(e.target.value))}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleCalculateShipping}
                  disabled={isCalculating || cep.replace(/\D/g, '').length !== 8}
                >
                  {isCalculating ? 'Calculando…' : 'Calcular'}
                </button>
              </div>

              {shippingError && <p className="shipping-error">{shippingError}</p>}

              {shipping && (
                <p className="shipping-result">
                  Entrega para <strong>{formatCep(shipping.cep)}</strong>: {formatPrice(shipping.price)} ·
                  até {shipping.days} dias úteis
                </p>
              )}

              <p className="shipping-note">
                Valor simulado para exemplo. Substitua por uma integração real de frete quando tiver.
              </p>
            </div>
          </div>
        </div>

        <div className="size-chart">
          <h2>Tabela de medidas</h2>
          <div className="size-chart-scroll">
            <table>
              <thead>
                <tr>
                  <th>Tamanho</th>
                  {product.sizeChart[0]?.chest && <th>Busto (cm)</th>}
                  {product.sizeChart[0]?.waist && <th>Cintura (cm)</th>}
                  {product.sizeChart[0]?.hip && <th>Quadril (cm)</th>}
                  {product.sizeChart[0]?.length && <th>Comprimento (cm)</th>}
                  {product.sizeChart[0]?.sleeve && <th>Manga (cm)</th>}
                </tr>
              </thead>
              <tbody>
                {product.sizeChart.map((row) => (
                  <tr key={row.size}>
                    <td>{row.size}</td>
                    {row.chest && <td>{row.chest}</td>}
                    {row.waist && <td>{row.waist}</td>}
                    {row.hip && <td>{row.hip}</td>}
                    {row.length && <td>{row.length}</td>}
                    {row.sleeve && <td>{row.sleeve}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="size-chart-note">Medidas em centímetros, tiradas com a peça deitada.</p>
        </div>
      </div>

      {isLightboxOpen && (
        <div className="image-lightbox" onClick={() => setIsLightboxOpen(false)}>
          <button
            className="image-lightbox-close"
            aria-label="Fechar"
            onClick={() => setIsLightboxOpen(false)}
          >
            ✕
          </button>
          <img
            src={imageUrl(product.seed, 1600, 2000)}
            alt={product.name}
            className="image-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
