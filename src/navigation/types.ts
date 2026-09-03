import type { NavigatorScreenParams } from '@react-navigation/native';

export type ShopStackParamList = {
  ShopHome: undefined;
  ProductDetail: { productId: string };
  EmiCheckout: {
    productId: string;
    variantId: string;
    planId: string;
  };
  OrderConfirmed: {
    productId: string;
    variantId: string;
    planId: string;
  };
};

export type RootTabParamList = {
  Home: undefined;
  Shop: NavigatorScreenParams<ShopStackParamList>;
  EmiDues: undefined;
  Limit: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootTabParamList {}
  }
}
