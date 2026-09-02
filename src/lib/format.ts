// Indian-format currency helpers. Kept framework-free so they're easy to test.

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatMoney(value: number): string {
  return inr.format(Math.round(value));
}

/** "₹79,900" without the currency word spacing quirks, for tight layouts. */
export function formatMoneyCompact(value: number): string {
  return `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(
    Math.round(value),
  )}`;
}

export function formatPerMonth(value: number): string {
  return `${formatMoneyCompact(value)}/mo`;
}

export function discountPercent(mrp: number, price: number): number {
  if (mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
