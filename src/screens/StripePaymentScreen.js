import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList, Image, Button, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { firebaseConfig, app,  } from '../firebase';
import { CartContext } from '../../CartContext';
import Stripe from 'react-native-stripe-api';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, addDoc, doc,  } from 'firebase/firestore';
import {
  StripeProvider, CardField
} from '@stripe/stripe-react-native';

const db = getFirestore(app);

const apiKey = 'your_stripe_publishable_key';
const stripe = new Stripe(apiKey);

const StripePaymentScreen = ({ navigation, route }) => {
  const { order } = route.params;
  const {clearCart} = useContext(CartContext);
  const { cartItems } = route.params;

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
      const tokenRef = db.ref('stripeTokens').push();
      await tokenRef.set({
        token: stripeToken,
        // other information you want to save
      });
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
  

  const renderItem = ({ item, showItemDetails, shoppingCart, addToCart, removeFromCart, rotateYAnimatedStyle }) => {
    const imageSource = item.image_url ? { uri: item.image_url } : null;
    return (
      <TouchableOpacity
      style={styles.foodItemContainer}
      >
      {imageSource && (
        <Animated.Image
          source={imageSource}
          style={[rotateYAnimatedStyle, styles.foodItemImage]}
          useNativeDriver={false}
        />
      )}
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)"]}
        style={styles.foodItemOverlay}
      >
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
      );
    };

    return (
      <LinearGradient colors={['#1E90FF', '#FF8C00']} style={styles.itemContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Payment Page</Text>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartItemsContainer}
          />
          
          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
            <Text style={styles.label}>Card Number:</Text>
            <TextInput
              style={styles.payInput}
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="number-pad"
              maxLength={16}
            />
            </View>
            <View style={styles.inputRow}>
            <Text style={styles.label}>Expiry(mm/yyyy):</Text>
            <TextInput
              style={styles.payInputSmall}
              value={expMonth}
              onChangeText={setExpMonth}
              keyboardType="number-pad"
              maxLength={2}
            />
            <TextInput
              style={styles.payInputSmall}
              value={expYear}
              onChangeText={setExpYear}
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>CVC:</Text>
            <TextInput
              style={styles.payInputSmall}
              value={cvc}
              onChangeText={setCvc}
              keyboardType="number-pad"
              maxLength={3}
            />
  </View>
<View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
    <Text style={styles.buttonText}>Back</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.payButton} onPress={handlePay}>
    <Text style={styles.buttonText}>Pay</Text>
  </TouchableOpacity>
</View>
      </View>
    </View>
  </LinearGradient>
);

};

const styles = StyleSheet.create({
  foodItemContainer: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 5,
    margin: 5,
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
  itemContainer: {
    flex: 1,
    },
    container: {
    flex: 1,
    padding: 10,
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    },
    cartItemContainer: {
    marginBottom: 10,
    borderRadius: 5,
    },
    gradientContainer: {
    padding: 10,
    borderRadius: 5,
    },
    itemDetailsContainer: {
    marginLeft: 10,
    alignItems: 'flex-start',
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginBottom: 12,
    },
    foodItemImage: {
      width: '100%',
      height: 200,
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
      inputContainer: {
        marginTop: 20,
      },
      inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
      },
      label: {
        fontSize: 16,
        color: '#fff',
        marginRight: 10,
      },
      payInput: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 30,
        paddingHorizontal: 10,
        width: '50%',
      },
      payInputSmall: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 30,
        width: '15%',
      },
      buttonContainer: {
        justifyContent: 'space-between',
        marginBottom: 70,

      },
      backButton: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'center',  
        backgroundColor: 'dodgerblue',
        marginBottom: 16,
      }, 
      backButtonText: {
        fontWeight: 'bold',
        color: 'white',
      },
      payButton: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'center',  
        backgroundColor: 'dodgerblue',
        marginBottom: 16,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
});


export default StripePaymentScreen;

                    
