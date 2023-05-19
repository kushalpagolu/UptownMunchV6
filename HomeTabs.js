import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {View,Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform} from 'react-native';

import WelcomeScreen from './src/screens/WelcomeScreen';
import HeaderRight from './Header.js';
import { LogoutButton } from './src/screens/Styles';



import FoodCategoriesScreen from './src/screens/FoodCategoriesScreen';
import FoodItems from './src/screens/FoodItemsScreen';
import FoodList from  './src/screens/FoodListScreen';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen.js';
import StripeReactMobile from './src/screens/StripeReactMobile';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import OrderConfirmationScreen from './src/screens/OrderConfirmationScreen';
import UserProfileScreen from './src/screens/UserProfile';
import CateringServices from './src/screens/CateringServices';
import FoodItemDetailsScreen from './src/screens/FoodItemDetailsScreen';
import OrderHistoryScreenAlternate from './src/screens/OrderHistoryAlternate';
import FoodCategoryDetailsScreen from './src/screens/FoodCategoryDetailsScreen';
import StripePaymentScreen from './src/screens/StripePaymentScreen';

const Tabs = createBottomTabNavigator();

const HomeTabs = ({ setIsLoggedIn }) => {
  return (
    <Tabs.Navigator
      initialRouteName="Welcome"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 15,
          right: 15,
          height: 55,
          borderRadius: 8,
          paddingBottom: Platform.OS === 'ios' ? 15 : 0, // add this line

        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'FoodItems') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'OrderHistoryScreenAlternate') {
            iconName = focused ? 'reorder-four' : 'reorder-four-outline';
          } else if (route.name === 'Welcome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'CateringServices') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (route.name === 'OrderHistory') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          } else if (route.name === 'FoodCategoriesScreen') {
            iconName = focused ? 'file-tray-full' : 'file-tray-full-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{
          headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />,
          headerRightContainerStyle: { paddingRight: 10 },
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="StripePayment"
        component={StripePaymentScreen}
        options={{ headerRight: () => <HeaderRight onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 }, tabBarItemStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="StripeReactMobile"
        component={StripeReactMobile}
        options={{ headerRight: () => <HeaderRight onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 }, tabBarItemStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="FoodItemDetailsScreen"
        component={FoodItemDetailsScreen}
        options={{
          headerRight: () => <HeaderRight onLogout={() => setIsLoggedIn(false)} />,
          headerRightContainerStyle: { paddingRight: 10 },
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="OrderConfirmationScreen"
        component={OrderConfirmationScreen}
        options={{
          headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />,
          headerRightContainerStyle: { paddingRight: 10 },
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{ headerRight: () => <HeaderRight onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
      />
      <Tabs.Screen
        name="FoodCategoriesScreen"
        component={FoodCategoriesScreen}
        options={{ headerRight: () => <HeaderRight onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
      />
      <Tabs.Screen
        name="Welcome"
        options={{ headerRight: () => <HeaderRight onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
        >
        {(props) => <WelcomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tabs.Screen>
      <Tabs.Screen
        name="FoodItems"
        component={FoodItems}
        options={{ headerRight: () => <HeaderRight onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
        />
      <Tabs.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{ headerRight: () => <HeaderRight onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
        />
      <Tabs.Screen
        name="OrderHistoryScreenAlternate"
        component={OrderHistoryScreenAlternate}
        options={{ headerTitle: '', headerRight: () => <HeaderRight onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
        />
      <Tabs.Screen
        name="FoodList"
        component={FoodList}
        options={{ headerRight: () => <HeaderRight onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 }, tabBarItemStyle: { display: "none" } }}
        />
      <Tabs.Screen
        name="FoodCategoryDetailsScreen"
        component={FoodCategoryDetailsScreen}
        options={{ headerRight: () => <HeaderRight onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 }, tabBarItemStyle: { display: "none" } }}
        />
      <Tabs.Screen
        name="CateringServices"
        component={CateringServices}
        options={{ headerRight: () => <HeaderRight onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 }, }}
        />
</Tabs.Navigator>
);
};

export default HomeTabs;


