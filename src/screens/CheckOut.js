import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './Styles';

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
    <View style={styles.checkoutcontainer}>
      <Text style={styles.checkouttitle}>Checkout</Text>
      <View style={styles.checkoutinputContainer}>
        <Text style={styles.checkoutlabel}>Name:</Text>
        <TextInput style={styles.checkoutinput} value={name} onChangeText={setName} />
      </View>
      <View style={styles.checkoutinputContainer}>
        <Text style={styles.checkoutlabel}>Address:</Text>
        <TextInput style={styles.checkoutinput} value={address} onChangeText={setAddress} />
      </View>
      <TouchableOpacity style={styles.checkoutbutton} onPress={handlePlaceOrder}>
        <Text style={styles.checkoutbuttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};



export default CheckoutScreen;
