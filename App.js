import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from './src/screens/Styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


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
    <AuthTabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 15,
          right: 15,
          height: 60,
          borderRadius: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;

          if (route.name === 'Login') {
            iconName = focused ? 'sign-in-alt' : 'sign-in-alt';
            iconColor = focused ? '#4db8ff' : '#888';
          } else if (route.name === 'Signup') {
            iconName = focused ? 'user-plus' : 'user-plus';
            iconColor = focused ? '#ff4d4d' : '#888';
          }

          return <FontAwesome5 name={iconName} size={size} color={iconColor} />;
        },
      })}
    >
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
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 15,
          right: 15,
          height: 60,
          borderRadius: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let maticonName;
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
        options={{ headerTitle: '',headerRight: () => <LogoutButton onLogout={() => setIsLoggedIn(false)} />, headerRightContainerStyle: { paddingRight: 10 } }}
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
          <AuthStack.Screen name="AuthTabs" options={{ headerShown: false }}>
            {(props) => <AuthTabNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
          </AuthStack.Screen>
        </AuthStack.Navigator>
      ) : (
        <HomeStackScreen setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
}
