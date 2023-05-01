import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import { auth } from '../firebase';
import OrderConfirmationScreen from './OrderConfirmationScreen';
import {firebaseConfig, app} from '../firebase';

const db = getFirestore(app);

const ShoppingCartScreen = ({ navigation, order }) => {
 // const [order, setOrder] = useState(null);
  const cartItems = navigation.getParam('cartItems', []);
  // Get setOrder from the context
  //const { setOrder } = useContext(OrderContext);

  const renderItem = ({ item }) => (
    <LinearGradient
      colors={['#f7b733', '#fc4a1a']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.cartItem}>
      <Text style={styles.itemName}>{item.itemName}</Text>
      <Text style={styles.itemCategory}>{item.categoryName}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <TouchableOpacity style={styles.itemQuantity} onPress={() => {}}>
        <Text>Quantity: {item.quantity}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

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
    <LinearGradient colors={['#1E90FF', '#FF8C00']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Shopping Cart</Text>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cartItemsContainer}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${orderTotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  cartItemsContainer: {
    paddingHorizontal: 16,
  },
  cartItem: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  itemCategory: {
    fontSize: 14,
    color: 'white',
  },
  itemPrice: {
    fontSize: 16,
    color: 'white',
    marginTop: 4,
  },
  itemQuantity: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: 'dodgerblue',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  checkoutButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ShoppingCartScreen;
