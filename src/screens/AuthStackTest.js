import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import LoginForm from './LoginScreen';
import SignupScreen from './SignupScreen';

const AuthStackTest = createStackNavigator({
    Login: {
      screen: LoginForm,
      navigationOptions: {
        headerShown: false,
      },
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: {
        headerTitle: 'Sign Up',
      },
    },
  });
  
  console.log(AuthStackTest); // log the AuthStack object to the console
  console.log(SignupScreen); // log the SignupScreen object to the console
  
  export default AuthStackTest;
  
