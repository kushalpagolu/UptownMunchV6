import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { auth } from '../firebase';
import OrderConfirmationScreen from './OrderConfirmationScreen';
import {firebaseConfig, app} from '../firebase';
import styles from './Styles';
import Swiper from 'react-native-web-swiper';
import { Swipeable } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
 

const db = getFirestore(app);

const ShoppingCartScreen = ({ navigation, route }) => {
  const { cartItems: initialCartItems, removeFromCart, onUpdateCart } = route.params;
  const [cartItems, setCartItems] = useState(initialCartItems);

useFocusEffect(
  React.useCallback(() => {
    setCartItems(initialCartItems);
  }, [initialCartItems])
);


  const handleRemoveFromCart = (itemToRemove) => {
    removeFromCart(itemToRemove);
    const updatedCartItems = cartItems.filter(item => item.id !== itemToRemove.id);
    setCartItems(updatedCartItems);
    if (onUpdateCart) {
      onUpdateCart(updatedCartItems);
    }
  };
  

  const renderItem = ({ item }) => {
    const rightSwipeActions = () => {
      return (
        <View style={styles.deleteBox}>
          <Text style={styles.deleteText}>Deleted</Text>
        </View>
      );
    };
  
    return (
      <Swipeable
        renderRightActions={rightSwipeActions}
        onSwipeableRightOpen={() => {
          console.log(`Removing item ${item.itemName} from the cart.`);
          handleRemoveFromCart(item);
        }}
      >
        <LinearGradient
          colors={['#f7b733', '#fc4a1a']}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.cartItem}
        >
          <Text style={styles.itemName}>{item.itemName}</Text>
          <Text style={styles.itemCategory}>{item.categoryName}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
          <TouchableOpacity style={styles.itemQuantity} onPress={() => {}}>
            <Text>Quantity: {item.quantity}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Swipeable>
    );
  };
  // Calculate order total
  const orderTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle checkout
  const handleCheckout = async () => {
    try {
      const user = auth.currentUser;
      const now = new Date();
      const uuidv4 = require("uuid/v4")
      const generateOrderId = () => {
        const random10Digits = Math.floor(Math.random() * 10000000000);
        return `UptownMunch-${random10Digits.toString().padStart(10, '0')}`;
      };
  
      const id = generateOrderId();
  
      if (!user) {
        // Prompt the user to log in
        console.log("User not logged in.");
        return;
      }
  
      if (cartItems.length === 0) {
        // Show alert based on the platform
        if (Platform.OS === 'web') {
          window.alert('Your cart is empty. Add items to the cart to place an order.');
        } else {
          Alert.alert('Your cart is empty', 'Add items to the cart to place an order.');
        }
        return;
      }
  
      const order = {
        orderId: id,
        create_datetime: now,
        created_by: user.uid,
        status: "Pending",
        total_price: orderTotal,
        foodItems: cartItems.map(item => ({
          id: item.id,
          name: item.itemName,
          quantity: item.quantity,
          price: item.price,
        })),
      };
  
      const ordersCollection = collection(db, 'orders');
  
      await addDoc(ordersCollection, order);
    // Clear the cart and navigate to the OrderConfirmationScreen
      navigation.setParams({ cartItems: [] });
      navigation.navigate('OrderConfirmationScreen', { order });
  
    } catch (error) {
      console.log(error);
    }
  };
  
  // Set the order in the context

  return (
    <LinearGradient colors={['#1E90FF', '#FF8C00']} style={styles.shoppingcartgradient}>
      <View style={styles.container}>
        <Text style={styles.shoppingcarttitle}>Shopping Cart</Text>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cartItemsContainer}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${orderTotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('FoodItems')}>
  <Text style={styles.backButtonText}>Back</Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};



export default ShoppingCartScreen;
