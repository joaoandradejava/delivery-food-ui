export const BASE_API: string = "http://localhost:8080";
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
