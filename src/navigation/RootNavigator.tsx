import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ShopStack } from './ShopStack';
import { TabBar } from './TabBar';
import { RootTabParamList } from './types';
import {
  HomePlaceholderScreen,
  EmiDuesPlaceholderScreen,
  LimitPlaceholderScreen,
  ProfilePlaceholderScreen,
} from '../screens/misc/PlaceholderScreens';
import { colors } from '../theme';

const Tab = createBottomTabNavigator<RootTabParamList>();

const navTheme = {
  dark: false,
  colors: {
    primary: colors.primary,
    background: colors.screen,
    card: colors.card,
    text: colors.ink,
    border: colors.border,
    notification: colors.primary,
  },
  fonts: {
    regular: { fontFamily: 'PlusJakartaSans_400Regular', fontWeight: '400' as const },
    medium: { fontFamily: 'PlusJakartaSans_500Medium', fontWeight: '500' as const },
    bold: { fontFamily: 'PlusJakartaSans_700Bold', fontWeight: '700' as const },
    heavy: { fontFamily: 'PlusJakartaSans_800ExtraBold', fontWeight: '800' as const },
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.screen } }}
      >
        <Tab.Screen name="Home" component={HomePlaceholderScreen} />
        <Tab.Screen name="Shop" component={ShopStack} />
        <Tab.Screen name="EmiDues" component={EmiDuesPlaceholderScreen} />
        <Tab.Screen name="Limit" component={LimitPlaceholderScreen} />
        <Tab.Screen name="Profile" component={ProfilePlaceholderScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
