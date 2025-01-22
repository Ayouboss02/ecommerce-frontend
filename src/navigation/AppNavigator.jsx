import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../features/catalog/screens/HomeScreen';
import CatalogScreen from '../features/catalog/screens/CatalogScreen';
import ProductDetailScreen from '../features/catalog/screens/ProductDetailScreen';
import CartScreen from '../features/basket/screens/CartScreen';
import CheckoutScreen from '../features/basket/screens/CheckoutScreen';
import OrdersScreen from '../features/orders/screens/OrdersScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';
import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CatalogStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="CatalogHome" component={CatalogScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);

const CartStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="CartHome" component={CartScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => {
  const cartItemsCount = useSelector(state => state.cart.items.length);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Catalog':
              iconName = 'view-grid';
              break;
            case 'Cart':
              iconName = 'cart';
              break;
            case 'Orders':
              iconName = 'clipboard-list';
              break;
            case 'Profile':
              iconName = 'account';
              break;
            default:
              iconName = 'circle';
          }

          return (
            <>
              <Icon name={iconName} size={size} color={color} />
              {route.name === 'Cart' && cartItemsCount > 0 && (
                <Badge style={{ position: 'absolute', top: -5, right: -10 }}>
                  {cartItemsCount}
                </Badge>
              )}
            </>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Catalog" component={CatalogStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : (
        <Stack.Screen name="Main" component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
};
