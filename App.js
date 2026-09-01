import { Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  createBottomTabScreen,
} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import { colors } from './src/styles/theme';

const RootTabs = createBottomTabNavigator({
  screenOptions: {
    headerStyle: { backgroundColor: colors.primary },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: '700' },
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.textSecondary,
    tabBarStyle: {
      backgroundColor: colors.card,
      borderTopColor: colors.border,
    },
  },
  screens: {
    Home: createBottomTabScreen({
      screen: HomeScreen,
      options: {
        title: 'Explorar',
        headerTitle: 'Explorador de Países',
        tabBarIcon: ({ focused }) => (
          <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>
            {'\uD83C\uDF0D'}
          </Text>
        ),
      },
    }),
    Favorites: createBottomTabScreen({
      screen: FavoritesScreen,
      options: {
        title: 'Favoritos',
        headerTitle: 'Mis Favoritos',
        tabBarIcon: ({ focused }) => (
          <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>
            {'\u2B50'}
          </Text>
        ),
      },
    }),
  },
});

const Navigation = createStaticNavigation(RootTabs);

export default function App() {
  return <Navigation />;
}
