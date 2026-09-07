import { ImageSourcePropType } from 'react-native';

/**
 * Product imagery is bundled with the app (not fetched) so the marketplace
 * renders the same on every device and offline. A real catalogue API would
 * return URLs instead; the `imageKey` on each product maps here.
 */
export type ProductImageKey =
  | 'iphone-15'
  | 'macbook-air'
  | 'sony-headphones'
  | 'ather-scooter'
  | 'samsung-s24'
  | 'dyson-vacuum';

export const PRODUCT_IMAGES: Record<ProductImageKey, ImageSourcePropType> = {
  'iphone-15': require('../../../../assets/products/iphone-15.jpg'),
  'macbook-air': require('../../../../assets/products/macbook-air.jpg'),
  'sony-headphones': require('../../../../assets/products/sony-headphones.jpg'),
  'ather-scooter': require('../../../../assets/products/ather-scooter.jpg'),
  'samsung-s24': require('../../../../assets/products/samsung-s24.jpg'),
  'dyson-vacuum': require('../../../../assets/products/dyson-vacuum.jpg'),
};

export function resolveProductImage(key: ProductImageKey): ImageSourcePropType {
  return PRODUCT_IMAGES[key];
}
