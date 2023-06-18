export const BASE_API: string = "http://localhost:8080";
export const CAMPO_OBRIGATORIO = "Este campo é obrigatório";
export const EMAIL_INVALIDO = "Email inválido";
export const TELEFONE_INVALIDO = "Número de telefone inválido";
export function CAMPO_VALOR_MINIMO_O(field: string, minimo: number) {
  return `O ${field} deve ter pelo menos ${minimo} caracteres`;
}

export function CAMPO_VALOR_MINIMO_A(field: string, minimo: number) {
  return `A ${field} deve ter pelo menos ${minimo} caracteres`;
}

export function CAMPO_VALOR_MAXIMO_O(field: string, maximo: number) {
  return `O ${field} deve ter no máximo ${maximo} caracteres`;
}

export function CAMPO_VALOR_MAXIMO_A(field: string, maximo: number) {
  return `A ${field} deve ter no máximo ${maximo} caracteres`;
}

let timeoutId: any;

export function formatarDinheiro(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function fazerUmaBuscaComDeterminadoTempo(
  func: any,
  tempo: number = 500
) {
  clearTimeout(timeoutId); // Limpa o timeout anterior, se existir

  timeoutId = setTimeout(async () => {
    await func();
  }, tempo);
}
