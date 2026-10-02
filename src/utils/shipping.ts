export interface ShippingResult {
  cep: string;
  price: number;
  days: number;
}

export const formatCep = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

/**
 * Simulação simples de frete a partir do CEP.
 * Não é uma integração real com transportadora — troque por uma API
 * (Correios, Melhor Envio, etc) quando tiver isso disponível.
 */
export async function calculateShipping(cep: string): Promise<ShippingResult> {
  const digits = cep.replace(/\D/g, '');

  if (digits.length !== 8) {
    throw new Error('Digite um CEP válido com 8 números.');
  }

  // pequena espera simulando uma consulta de verdade
  await new Promise((resolve) => setTimeout(resolve, 700));

  const firstDigit = Number(digits[0]);
  const price = 19.9 + firstDigit * 2.5;
  const days = 3 + (firstDigit % 4);

  return { cep: digits, price, days };
}
