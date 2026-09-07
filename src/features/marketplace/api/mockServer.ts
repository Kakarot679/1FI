import { CATALOGUE } from '../data/catalogue';
import { buildEmiPlans } from '../data/emiEngine';
import { EmiQuote, ProductDetail, ProductSummary } from '../types';

/**
 * Stands in for a backend. Every method returns a Promise, waits a realistic
 * amount of time and can be told to fail so the UI's loading/error states are
 * exercised. Swap this module for a real `fetch` client without touching the
 * hooks or screens that consume it.
 */

const LATENCY_MS = 650;

/**
 * Toggles so the loading / error states can be demonstrated without a real
 * network. In dev these are mirrored onto `globalThis.__onefiMock` so they can
 * be flipped from a debugger / RN console:
 *   __onefiMock.failListing = true
 */
export const mockConfig = {
  failListing: false,
  failDetail: false,
  failQuote: false,
};

if (__DEV__) {
  (globalThis as Record<string, unknown>).__onefiMock = mockConfig;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function toSummary(product: ProductDetail): ProductSummary {
  const inStock = product.variants.filter((v) => v.inStock);
  const pool = inStock.length ? inStock : product.variants;
  const cheapest = pool.reduce((a, b) => (a.price <= b.price ? a : b));
  const plans = buildEmiPlans(cheapest.price);
  const noCost = plans.filter((p) => p.noCost);
  const emiPlan = (noCost.length ? noCost : plans).reduce((a, b) =>
    a.monthlyAmount <= b.monthlyAmount ? a : b,
  );

  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    art: product.art,
    startingPrice: cheapest.price,
    mrp: cheapest.mrp,
    lowestEmiPerMonth: emiPlan.monthlyAmount,
    lowestEmiMonths: emiPlan.months,
    tags: buildTags(product),
  };
}

function buildTags(product: ProductDetail): string[] {
  const tags: string[] = [];
  const anyDiscount = product.variants.some((v) => v.mrp > v.price);
  if (anyDiscount) tags.push('Deal');
  if (buildEmiPlans(product.variants[0].price).some((p) => p.noCost)) {
    tags.push('No-cost EMI');
  }
  if (product.variants.every((v) => !v.inStock)) tags.push('Sold out');
  return tags;
}

export const mockServer = {
  async listProducts(): Promise<ProductSummary[]> {
    await wait(LATENCY_MS);
    if (mockConfig.failListing) {
      throw new ApiError('Unable to load the marketplace');
    }
    return CATALOGUE.map(toSummary);
  },

  async getProduct(id: string): Promise<ProductDetail> {
    await wait(LATENCY_MS);
    if (mockConfig.failDetail) {
      throw new ApiError('Unable to load this product');
    }
    const product = CATALOGUE.find((p) => p.id === id);
    if (!product) throw new ApiError('Product not found', 404);
    return product;
  },

  async getEmiQuote(productId: string, variantId: string): Promise<EmiQuote> {
    await wait(LATENCY_MS - 200);
    if (mockConfig.failQuote) {
      throw new ApiError('Unable to fetch EMI plans');
    }
    const product = CATALOGUE.find((p) => p.id === productId);
    const variant = product?.variants.find((v) => v.id === variantId);
    if (!product || !variant) throw new ApiError('Variant not found', 404);

    return {
      productId,
      variantId,
      principal: variant.price,
      plans: buildEmiPlans(variant.price),
    };
  },
};

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}
