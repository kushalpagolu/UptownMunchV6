import React, { useRef } from 'react';
import { Animated, Platform, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

const Tab = createBottomTabNavigator();

const AuthTabNavigator = ({ setIsLoggedIn }) => {
  const loginAnimation = useRef(new Animated.Value(1)).current;
  const signupAnimation = useRef(new Animated.Value(1)).current;

  const animate = (animation) => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 100,
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: Platform.OS !== 'web', 
      }).start();
    });
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 15,
          right: 15,
          height: 60,
          borderRadius: 8,
          paddingBottom: Platform.OS === 'ios' ? 15 : 0,
        },
        tabBarButton: ({ accessibilityState, onPress, onLongPress, children }) => {
          let scale;
          let iconColor;
          let iconName;
          let labelColor;

          if (route.name === 'Login') {
            iconName = 'sign-in-alt';
            iconColor = labelColor = accessibilityState.selected ? '#4db8ff' : '#888';
            scale = loginAnimation;
          } else if (route.name === 'Signup') {
            iconName = 'user-plus';
            iconColor = labelColor = accessibilityState.selected ? '#4db8ff' : '#888';
            scale = signupAnimation;
          }

          const transform = [{ scale }];

          return (
            <View
              onStartShouldSetResponder={() => true}
              onResponderRelease={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Animated.View style={{ transform }}>
                  <FontAwesome5 name={iconName} size={24} color={iconColor} />
                </Animated.View>
                <Animated.View style={{ transform, marginTop: 4 }}>
                  <Text style={{ color: labelColor }}>{route.name}</Text>
                </Animated.View>
              </View>
            </View>
          );
          
        }
      })}
    >
      <Tab.Screen 
        name="Login"
        listeners={{
          tabPress: () => animate(loginAnimation),
        }}
      >
        {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
      <Tab.Screen 
        name="Signup" 
        component={SignupScreen}
        listeners={{
          tabPress: () => animate(signupAnimation),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthTabNavigator;

