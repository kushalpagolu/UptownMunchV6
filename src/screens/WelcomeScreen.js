// WelcomeScreen.js

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from './Styles';

const WelcomeScreen = ({ navigation, setIsLoggedIn }) => {
  return (
      <LinearGradient
        colors={['#ee0979', '#ff6a00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('FoodCategoriesScreen')}>
            <Ionicons name="fast-food-outline" size={98} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={98} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FoodList')}>
            <Ionicons name="restaurant-outline" size={98} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FoodItems')}>
            <Ionicons name="cart-outline" size={98} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CateringServices')}>
            <Ionicons name="pizza-sharp" size={98} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
  );
};

export default WelcomeScreen;
