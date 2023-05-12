import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import WelcomeScreen from './src/screens/WelcomeScreen';
import HeaderRight from './Header.js';
import { LogoutButton } from './src/screens/Styles';



import FoodCategoriesScreen from './src/screens/FoodCategoriesScreen';
import FoodItems from './src/screens/FoodItemsScreen';
import FoodList from  './src/screens/FoodListScreen';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen.js';
import CheckoutScreen from './src/screens/CheckOut';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import OrderConfirmationScreen from './src/screens/OrderConfirmationScreen';
import UserProfileScreen from './src/screens/UserProfile';
import CateringServices from './src/screens/CateringServices';
import FoodItemDetailsScreen from './src/screens/FoodItemDetailsScreen';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import OrderHistoryScreenAlternate from './src/screens/OrderHistoryAlternate';
import FoodCategoryDetailsScreen from './src/screens/FoodCategoryDetailsScreen';

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
        name="FoodItemDetailsScreen"
        component={FoodItemDetailsScreen}
        options={{
          headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />,
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
options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
/>
<Tabs.Screen
name="OrderHistory"
component={OrderHistoryScreen}
options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
/>
<Tabs.Screen
name="OrderHistoryScreenAlternate"
component={OrderHistoryScreenAlternate}
options={{ headerTitle: '', headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
/>
<Tabs.Screen
name="FoodList"
component={FoodList}
options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 }, tabBarItemStyle: { display: "none" } }}
/>
<Tabs.Screen
name="FoodCategoryDetailsScreen"
component={FoodCategoryDetailsScreen}
options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 }, tabBarItemStyle: { display: "none" } }}
/>
<Tabs.Screen
name="CateringServices"
component={CateringServices}
options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 }, }}
/>
</Tabs.Navigator>
);
};

export default HomeTabs;


