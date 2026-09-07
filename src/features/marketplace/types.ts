// Domain models for the 1Fi Marketplace.
// These mirror the shape a real catalogue/EMI service would return.

import type { ProductImageKey } from './assets/images';

export interface ProductSummary {
  id: string;
  name: string;
  brand: string;
  category: string;
  /** Key into the bundled product imagery. A real API would send image URLs. */
  imageKey: ProductImageKey;
  /** Lowest price across variants, in paise-free rupees. */
  startingPrice: number;
  mrp: number;
  /** Lowest no-cost EMI available, precomputed for the listing card. */
  lowestEmiPerMonth: number;
  lowestEmiMonths: number;
  tags: string[];
}

export interface ProductVariant {
  id: string;
  /** e.g. "128 GB · Midnight" */
  label: string;
  attributes: Record<string, string>;
  price: number;
  mrp: number;
  inStock: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageKey: ProductImageKey;
  description: string;
  highlights: string[];
  specs: ProductSpec[];
  variants: ProductVariant[];
}

export interface EmiPlan {
  id: string;
  months: number;
  monthlyAmount: number;
  /** Total the user repays. Equals price when it's a no-cost plan. */
  totalPayable: number;
  interestRate: number;
  noCost: boolean;
  processingFee: number;
  recommended?: boolean;
}

export interface EmiQuote {
  productId: string;
  variantId: string;
  principal: number;
  plans: EmiPlan[];
}
