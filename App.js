import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native-paper';


import FoodCategoriesScreen from './src/screens/FoodCategoriesScreen';
import FoodItems from './src/screens/FoodItemsScreen';
import FoodList from './src/screens/FoodListScreen';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen.js';
import CheckoutScreen from './src/screens/CheckOut';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import OrderConfirmationScreen from './src/screens/OrderConfirmationScreen';
import UserProfileScreen from './src/screens/UserProfile';
import CateringServicesScreen from './src/screens/CateringServices';
import WelcomeScreen from './src/screens/WelcomeScreen';
import FoodItemDetailsScreen from './src/screens/FoodItemDetailsScreen';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';


const AuthStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Profile" component={UserProfileScreen} />
      <Tabs.Screen name="FoodList" component={FoodList} />
      <Tabs.Screen name="CateringService" component={CateringServicesScreen} />
      <Tabs.Screen name="OrderHistory" component={OrderHistoryScreen} />
    </Tabs.Navigator>
  );
}

function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerRight: () => (
            <Button
              onPress={() => navigation.replace('Auth')}
              mode="contained"
              compact
              style={{ marginRight: 10 }}
            >
              Logout
            </Button>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen name="Login">
            {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </AuthStack.Screen>
          <AuthStack.Screen name="Signup" component={SignupScreen} />
        </AuthStack.Navigator>
      ) : (
        <HomeStackScreen />
      )}
    </NavigationContainer>
  );
}