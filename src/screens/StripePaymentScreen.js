// StripePaymentScreen.js

// StripePaymentScreen.js

import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { firebaseConfig, app } from '../firebase';
import { CartContext } from '../../CartContext';
import Stripe from 'react-native-stripe-api';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import styles from './Styles';  // Update this with your actual path
import { AntDesign } from '@expo/vector-icons'; 

const db = getFirestore(app);

const apiKey = 'your_stripe_publishable_key';
const stripe = new Stripe(apiKey);

const StripePaymentScreen = ({ navigation, route }) => {
    const { shoppingCart, addToCart, handleUpdateCart, } = useContext(CartContext);

  const { order } = route.params;
  const {clearCart, removeFromCart} = useContext(CartContext);
  const { cartItems: initialCartItems, onUpdateCart,  } = route.params;
  const [cartItems, setCartItems] = useState(initialCartItems);

useFocusEffect(
  React.useCallback(() => {
    setCartItems(initialCartItems);
  }, [initialCartItems])
);
  
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePay = async () => {
    try {
      const stripeToken = await stripe.createToken({
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: cvc,
      });

      // TODO: Send the stripeToken to your server to create a charge
      // If the payment is successful, save the order and clear the cart

      const ordersCollection = collection(db, 'orders');
      await addDoc(ordersCollection, order);

      clearCart();

      // If the payment is successful, navigate to the OrderConfirmationScreen
      navigation.navigate('OrderConfirmationScreen', { order });
    } catch (error) {
      Alert.alert('Payment failed', error.message);
    }
  };
  
  const renderItem = ({ item }) => {
    const imageSource = item.image_url ? { uri: item.image_url } : null;
    return (
        <View style={styles.cartItemContainer}>
          <LinearGradient
            colors={['#f7b733', '#fc4a1a']}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.gradientContainer}
          >
            {imageSource && (
              <Image source={imageSource} style={styles.itemImage} />
            )}
            <View style={styles.itemDetailsContainer}>
              <Text style={styles.itemName}>{item.itemName}</Text>
              <Text style={styles.itemCategory}>{item.categoryName}</Text>
              <Text style={styles.itemPrice}>Price: ${item.price}</Text>
              <Text style={styles.itemQuantity}>
                Quantity: {item.quantity}
              </Text>
            </View>
          </LinearGradient>
        </View>
      );
    };

    return (
     <LinearGradient colors={['#1E90FF', '#FF8C00']} style={styles.itemContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Checkout</Text>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.inputContainer}>
                <Text style={styles.label}>Card Number</Text>
        <TextInput
         style={styles.payInput}
         value={cardNumber}
         onChangeText={setCardNumber}
         keyboardType="number-pad"
         maxLength={16}
       />
       <Text style={styles.label}>Expiry Month</Text>
      <TextInput
        style={styles.payInput}
        value={expMonth}
        onChangeText={setExpMonth}
        keyboardType="number-pad"
        maxLength={2}
      />

      <Text style={styles.label}>Expiry Year</Text>
      <TextInput
        style={styles.payInput}
        value={expYear}
        onChangeText={setExpYear}
        keyboardType="number-pad"
        maxLength={4}
      />

      <Text style={styles.label}>CVC</Text>
      <TextInput
        style={styles.payInput}
        value={cvc}
        onChangeText={setCvc}
        keyboardType="number-pad"
        maxLength={3}
      />

      <TouchableOpacity style={styles.payButton} onPress={handlePay}>
        <Text style={styles.buttonText}>Pay</Text>
      </TouchableOpacity>
      </View>
      </View>
    </LinearGradient>
);
};


export default StripePaymentScreen;

   
