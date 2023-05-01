// WelcomeScreen.js

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ee0979', '#ff6a00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <TouchableOpacity onPress={() => navigation.navigate('FoodCategories')}>
          <Ionicons name="fast-food-outline" size={98} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <Ionicons name="person-circle-outline" size={98} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FoodList')}>
          <Ionicons name="restaurant-outline" size={98} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FoodItems')}>
          <Ionicons name="cart-outline" size={98} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
