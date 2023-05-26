import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CartContext } from '../../CartContext';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseConfig, app } from '../firebase';

let StripeProvider, Elements, CardField, useStripe, CardElement;
if (Platform.OS === 'web') {
  // Imports for Web
  const stripeJs = require('@stripe/react-stripe-js');
  StripeProvider = stripeJs.StripeProvider;
  Elements = stripeJs.Elements;
  CardElement = stripeJs.CardElement;
  useStripe = stripeJs.useStripe;
} else {
  // Imports for Native
  const stripeReactNative = require('@stripe/stripe-react-native');
  StripeProvider = stripeReactNative.StripeProvider;
  CardField = stripeReactNative.CardField;
  useStripe = stripeReactNative.useStripe;
}

const db = getFirestore(app);
const PUBLISHABLE_KEY = 'pk_test_51N8XmFL7AiIeRnbpNaCfv8k4L9hhL7wy4eyIZMyZmcZ8EDLpbxxnsK3TVxgjaboDodc3MVcyvMVWd2XOapQNlf0z00v6uqRPJA';

const PaymentComponent = ({ navigation, route, cartItems, clearCart, handlePay, renderItem }) => {
  const orderTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <LinearGradient colors={['#1E90FF', '#FF8C00']} style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Payment Page</Text>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Order Total: ${orderTotal.toFixed(2)}</Text>
            <Text style={styles.totalText}>Total Items: {totalItems}</Text>
          </View>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartItemsContainer}
          />
        </View>
        <View style={styles.paymentContainer}>
          {Platform.OS === 'web' ? (
            <CardElement postalCodeEnabled={true} autofocus style={styles.cardField} />
          ) : (
            <CardField postalCodeEnabled={true} autofocus style={styles.cardField} />
          )}
          <TouchableOpacity style={styles.payButton} onPress={handlePay}>
            <Text style={styles.payButtonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};


const StripeReactMobile = ({ navigation, route }) => {
  const { order } = route.params;
  const { clearCart } = useContext(CartContext);
  const stripe = useStripe();
  const { cartItems } = route.params;
 // Calculate order total
 const orderTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);


  const handlePay = async () => {
      let token;
      let error;
  
      if (Platform.OS === 'web') {
        const cardElement = stripe.elements.getElement(CardField);
        const tokenResponse = await stripe.createToken(cardElement);
        token = tokenResponse.token;
        error = tokenResponse.error;
      } else {
        const tokenResponse = await stripe.createToken();
        token = tokenResponse.token;
        error = tokenResponse.error;
      }
  
      if (error) {
        alert('Error creating token', error.message);
        return;
      }
      const ordersCollection = collection(db, 'orders');
      await addDoc(ordersCollection, order);
      clearCart();
      navigation.navigate('OrderConfirmationScreen', { order });
    };

    const renderItem = ({ item }) => {
        const imageSource = item.image_url ? { uri: item.image_url } : null;
    return (
      <KeyboardAvoidingView>
        <TouchableOpacity
        style={styles.foodItemContainer}
        >
        {imageSource && (
            <Image
            source={imageSource}
            style={[styles.image]}
            useNativeDriver={false}
            />
        )}
        <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)"]}
            style={styles.foodItemOverlay}>
            <View style={styles.foodItemDetails}>
            <View>
                <Text style={styles.foodItemName}>{item.itemName}</Text>
            </View>
            <Text style={styles.foodItemCategory}>{item.categoryName}</Text>
            <Text style={styles.itemPrice}>Price: ${item.price}</Text>
            <Text style={styles.itemQuantity}>
                Quantity: {item.quantity}
            </Text>
            </View>
        </LinearGradient>
        </TouchableOpacity>
        </KeyboardAvoidingView>
        );
    };

  return Platform.OS === 'web' ? (
    <StripeProvider apiKey={PUBLISHABLE_KEY}>
      <Elements>
        <PaymentComponent navigation={navigation} route={route} cartItems={cartItems} clearCart={clearCart} handlePay={handlePay} renderItem={renderItem} />
      </Elements>
    </StripeProvider>
  ) : (
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>  
        <PaymentComponent navigation={navigation} route={route} cartItems={cartItems} clearCart={clearCart} handlePay={handlePay} renderItem={renderItem} />
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
    padding: 10,
    elevation: 3,
  },
  foodItemName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  foodItemCategory: {
    color: 'white',
    fontSize: 16,
    marginTop: 4,
  },
  foodItemDetails: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  foodItemContainer: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 5,
    margin: 5,
  },
  foodItemOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    },
  itemCategory: {
    fontSize: 14,
    color: '#fff',
    },
    itemPrice: {
    fontSize: 14,
    color: '#fff',
    },
    itemQuantity: {
    fontSize: 14,
    color: '#fff',
    },  
  details: {
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  paymentContainer: {
    marginTop: 20,
    marginBottom: 70,
  },
  cardField: {
    height: 50,
    marginTop: 30,
    marginBottom: 40,
    color: 'white',
    backgroundColor: 'white',
  },
  payButton: {
    backgroundColor: 'blue', // change as needed
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 40,
  },
  payButtonText: {
    color: 'white', // change as needed
    fontSize: 18,
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
    color: '#fff',
  },
});

export default StripeReactMobile;
