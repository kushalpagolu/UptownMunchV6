import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './src/screens/Styles';


import WelcomeScreen from './src/screens/WelcomeScreen';
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
import { LogoutButton } from './src/screens/Styles';
import OrderHistoryScreenAlternate from './src/screens/OrderHistoryAlternate';
import FoodCategoryDetailsScreen from './src/screens/FoodCategoryDetailsScreen';

const AuthStack = createNativeStackNavigator();
const AuthTabs = createBottomTabNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ShoppingCartStack = createNativeStackNavigator();

function ShoppingCartStackScreen() {
  return (
    <ShoppingCartStack.Navigator>
      <ShoppingCartStack.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
      />
      <ShoppingCartStack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
      />
    </ShoppingCartStack.Navigator>
  );
}


function AuthTabNavigator({ setIsLoggedIn }) {
  return (
    <AuthTabs.Navigator screenOptions={{ headerShown: false }}>
      <AuthTabs.Screen
        name="Login"
        options={{ headerShown: false }}
      >
        {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </AuthTabs.Screen>
      <AuthTabs.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </AuthTabs.Navigator>
  );
}

function HomeTabs({ setIsLoggedIn }) {
  return (
    <Tabs.Navigator
      initialRouteName="Welcome"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'FoodList') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Welcome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'CateringService') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (route.name === 'OrderHistory') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 }, tabBarItemStyle: { display: "none" },
      }}

      />
     <Tabs.Screen name="OrderConfirmationScreen"
          component={OrderConfirmationScreen}
          options={{
        headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />,
        headerRightContainerStyle: { paddingRight: 10 },
        //tabBarStyle: { display: "none" }, // hide the tab bar
        tabBarItemStyle: { display: "none" }, // hide the tab icon and label
      }}
      />
      <Tabs.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
      />
      <Tabs.Screen
        name="FoodCategoriesScreen"
        component={FoodCategoriesScreen}
        options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
      />
      <Tabs.Screen
        name="Welcome"
        options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
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
        options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
      />
      <Tabs.Screen
        name="FoodList"
        component={FoodList}
        options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 },tabBarItemStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="FoodCategoryDetailsScreen"
        component={FoodCategoryDetailsScreen}
        options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 },tabBarItemStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="CateringServices"
        component={CateringServices}
        options={{ headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 }, }}
      />
</Tabs.Navigator>
    
  );
}


function HomeStackScreen({ setIsLoggedIn }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        options={{ headerShown: false }}
      >
        {(props) => <HomeTabs {...props} setIsLoggedIn={setIsLoggedIn} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <AuthStack.Navigator initialRouteName="AuthTabs">
          <AuthStack.Screen name="AuthTabs">
            {(props) => <AuthTabNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
          </AuthStack.Screen>
        </AuthStack.Navigator>
      ) : (
        <HomeStackScreen setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
}
