import { PRODUCTS } from '../data/products';
import type { Product } from '../types';

// tira acentos e deixa tudo minúsculo, pra comparar sem se importar com maiúscula/acento
const normalize = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

// distância de Levenshtein: quantas letras precisam mudar pra uma palavra virar a outra
function levenshtein(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let i = 0; i < rows; i++) matrix[i][0] = i;
  for (let j = 0; j < cols; j++) matrix[0][j] = j;

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // apagar letra
        matrix[i][j - 1] + 1, // adicionar letra
        matrix[i - 1][j - 1] + cost // trocar letra
      );
    }
  }

  return matrix[a.length][b.length];
}

// quanto maior a palavra, mais erro de digitação ela tolera
function maxAllowedDistance(word: string): number {
  if (word.length <= 3) return 0;
  if (word.length <= 6) return 1;
  return 2;
}

function wordMatches(word: string, searchableText: string): boolean {
  if (searchableText.includes(word)) return true;
  return searchableText
    .split(' ')
    .some((textWord) => levenshtein(word, textWord) <= maxAllowedDistance(word));
}

/**
 * Busca produtos tolerando erro de digitação.
 * Cada palavra do que a pessoa digitou precisa "bater" (exata ou perto)
 * com alguma palavra do nome/categoria do produto.
 */
export function searchProducts(query: string, limit = 6): Product[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const queryWords = normalizedQuery.split(' ').filter(Boolean);

  const scored = PRODUCTS.map((product) => {
    const searchable = normalize(`${product.name} ${product.categoryLabel}`);
    let score = 0;

    if (searchable === normalizedQuery) score += 100;
    else if (searchable.startsWith(normalizedQuery)) score += 50;
    else if (searchable.includes(normalizedQuery)) score += 30;

    const matchedWords = queryWords.filter((word) => wordMatches(word, searchable));
    score += matchedWords.length * 10;

    return { product, score, matchedAll: matchedWords.length === queryWords.length };
  });

  return scored
    .filter((item) => item.matchedAll)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.product);
}
