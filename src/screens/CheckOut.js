import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CheckoutScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const { items } = route.params;

  const handlePlaceOrder = async () => {
    try {
      const order = {
        name,
        address,
        items,
        timestamp: new Date().toISOString(),
      };
      console.log('Placing order:', { name, address, items });
      // Here you can write code to save the order to the database
      const orderId = await firestore().collection('orders').add(order);
  
      // Navigate to the order confirmation screen and pass the order ID as a parameter
      navigation.navigate('OrderConfirmation', { orderId });
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address:</Text>
        <TextInput style={styles.input} value={address} onChangeText={setAddress} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#6C3483',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CheckoutScreen;
