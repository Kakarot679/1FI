import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopHomeScreen } from '../screens/shop/ShopHomeScreen';
import { ProductDetailScreen } from '../features/marketplace/screens/ProductDetailScreen';
import { EmiCheckoutScreen } from '../features/marketplace/screens/EmiCheckoutScreen';
import { OrderConfirmedScreen } from '../features/marketplace/screens/OrderConfirmedScreen';
import { ShopStackParamList } from './types';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<ShopStackParamList>();

export function ShopStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // Opaque card so the previous screen never shows through during the
        // push transition (notably on web, where screens aren't clipped).
        contentStyle: { backgroundColor: colors.screen },
        animation: 'slide_from_right',
      }}
    >
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
