import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopHomeScreen } from '../screens/shop/ShopHomeScreen';
import { ProductDetailScreen } from '../features/marketplace/screens/ProductDetailScreen';
import { EmiCheckoutScreen } from '../features/marketplace/screens/EmiCheckoutScreen';
import { OrderConfirmedScreen } from '../features/marketplace/screens/OrderConfirmedScreen';
import { ShopStackParamList } from './types';

const Stack = createNativeStackNavigator<ShopStackParamList>();

export function ShopStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShopHome" component={ShopHomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="EmiCheckout" component={EmiCheckoutScreen} />
      <Stack.Screen
        name="OrderConfirmed"
        component={OrderConfirmedScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
