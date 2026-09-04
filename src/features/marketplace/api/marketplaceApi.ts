import { EmiQuote, ProductDetail, ProductSummary } from '../types';
import { mockServer } from './mockServer';

/**
 * The only surface the app talks to for marketplace data. Today it delegates to
 * an in-memory mock; pointing it at a real service is a one-file change here.
 */
export const marketplaceApi = {
  getProducts(): Promise<ProductSummary[]> {
    return mockServer.listProducts();
  },

  getProduct(id: string): Promise<ProductDetail> {
    return mockServer.getProduct(id);
  },

  getEmiQuote(productId: string, variantId: string): Promise<EmiQuote> {
    return mockServer.getEmiQuote(productId, variantId);
  },
};

export type MarketplaceApi = typeof marketplaceApi;
