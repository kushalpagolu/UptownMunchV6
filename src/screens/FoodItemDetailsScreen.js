import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import ShoppingCart from './ShoppingCartScreen';
//import {closeModal} from './FoodItemsScreen'
import { useNavigation } from '@react-navigation/native';

const FoodItemDetailsScreen = ({ item, onClose, onAddToCart, removeFromCart, shoppingCart }) => {
  if (!item) {
    return null;
  }
  const navigation = useNavigation();

  const imageSource = item.image_url ? { uri: item.image_url } : null;
  const itemQuantity =
    shoppingCart.find((cartItem) => cartItem.id === item.id)?.quantity || 0;

  return (
    <LinearGradient colors={["#1E90FF", "#FF8C00"]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.categoryName}>{item.categoryName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.itemQuantity}>Quantity: {itemQuantity}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => removeFromCart(item)}
            style={[styles.button, { backgroundColor: "dodgerblue" }]}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onAddToCart(item)}
            style={[styles.button, { backgroundColor: "dodgerblue" }]}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        {itemQuantity > 0 && (<TouchableOpacity
            onPress={() => { onClose(); navigation.navigate("ShoppingCart", {  cartItems: shoppingCart, removeFromCart: removeFromCart })}}
            style={[styles.viewCartButton,]}>
            <Text style={styles.viewCartButtonText}>Cart({shoppingCart.reduce((total, item) => total + item.quantity, 0)})</Text>
          </TouchableOpacity>)}
        <TouchableOpacity onPress={onClose} style={[styles.viewCartButton]}>
          <Text style={styles.viewCartButtonText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 500,
    height: 400,
    resizeMode: 'cover',
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  categoryName: {
    fontSize: 18,
    color: 'gray',
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    marginTop: 16,
    paddingHorizontal: 32,
    textAlign: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  itemQuantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  buttonsContainer: {
  flexDirection: "row",
  marginTop: 16,
  },
  button: {
  paddingHorizontal: 8,
  paddingVertical: 8,
  borderRadius: 8,
  marginHorizontal: 4,
  marginBottom: 16,
  },
  buttonText: {
  fontSize: 16,
  color: "white",
  padding: 8,
  },
  closeButtonText: {
  fontSize: 16,
  color: 'white',
  },
  viewCartButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'dodgerblue',
    marginHorizontal: 4,
    marginBottom: 16,
  },
  viewCartButtonText: {
    fontSize: 16,
    color: 'white',
    padding: 8,

  },
  });
  
  export default FoodItemDetailsScreen;