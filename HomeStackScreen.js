import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './HomeTabs';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = ({ setIsLoggedIn }) => {
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
};

export default HomeStackScreen;