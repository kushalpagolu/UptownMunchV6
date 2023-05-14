import React from 'react';
import {View,Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const AuthTabs = createBottomTabNavigator();

const AuthTabNavigator = ({ setIsLoggedIn }) => {
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
          paddingBottom: Platform.OS === 'ios' ? 15 : 0, // add this line

        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;
          if (route.name === 'Login') {
            iconName = focused ? 'sign-in-alt' : 'sign-in-alt';
            iconColor = focused ? '#4db8ff' : '#888';
          } else if (route.name === 'Signup') {
            iconName = focused ? 'user-plus' : 'user-plus';
            iconColor = focused ? '#4db8ff' : '#888';
          }

          return <FontAwesome5 name={iconName} size={size} color={iconColor} />;
        },
      })}
    >
      <AuthTabs.Screen name="Login" options={{ headerShown: false }}>
        {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </AuthTabs.Screen>
      <AuthTabs.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
    </AuthTabs.Navigator>
  );
};

export default AuthTabNavigator;
