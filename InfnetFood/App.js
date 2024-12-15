import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/MainTab/Home';
import Pedidos from './components/MainTab/Pedidos';
import Perfil from './components/MainTab/Perfil/Perfil';
import Cart from './components/MainTab/CartScreen';
import Login from './components/Login';
import ProductList from './components/MainTab/ProductList'
import Checkout from './components/MainTab/Checkout';
import { OrderProvider } from './components/OrderContext';
import SettingsScreen from './components/MainTab/Perfil/SettingsScreen'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const MainStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export default function App() {
  const [theme, setTheme] = useState(DefaultTheme); 




const Tabs = ({ route }) => {
  const { email, initialScreen} = route.params || {};

  return (
    <MainTab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Pedidos') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato', 
        tabBarInactiveTintColor: 'gray', 
      })}
    >
      <MainTab.Screen 
        name="Home" 
        component={Home} 
        options={{ 
          title: 'Início',
          headerShown: false 
        }} 
      />
      <MainTab.Screen 
        name="Pedidos" 
        component={Pedidos} 
        options={{ 
          title: 'Meus Pedidos',
          headerShown: false 
        }} 
      />
      <MainTab.Screen 
        name="Perfil" 
        component={Perfil} 
        options={{ 
          title: 'Perfil',
          headerShown: false 
        }} 
      />
    </MainTab.Navigator>
  );
};

return (
  <OrderProvider>
    <NavigationContainer theme={theme}>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen name="Login" component={Login} />
        <MainStack.Screen name="Checkout" component={Checkout} />
        <MainStack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <MainStack.Screen name="ProductList" component={ProductList} />
        <MainStack.Screen name="Cart" component={Cart} />
        <MainStack.Screen name="Settings">
          {(props) => <SettingsScreen {...props} setTheme={setTheme} />} 
        </MainStack.Screen>
      </MainStack.Navigator>
    </NavigationContainer>
  </OrderProvider>
);
}
