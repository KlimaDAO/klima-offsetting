export function multiplier(coin: string) {
  const m =
    coin === "USDC" ? 6 : coin === "KLIMA" || coin === "sKLIMA" ? 9 : 18;
  return m;
}
