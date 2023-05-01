import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CateringServicesScreen = () => {
  return (
    <LinearGradient colors={['#FC5C7D', '#6A82FB']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Catering Services</Text>
        <Text style={styles.text}>We offer catering services for events of all sizes. Our menu includes a wide range of dishes to satisfy every palate. Contact us today to learn more!</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 32,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
});

export default CateringServicesScreen;
