import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import ShoppingCartScreen from './ShoppingCartScreen';
import {closeModal} from './FoodItemsScreen'

const FoodItemDetailsScreen = ({ item, onClose, onAddToCart, onRemoveFromCart, shoppingCart, navigation }) => {
  if (!item) {
    return null;
  }
  const [showDetailsModal, setShowDetailsModal] = useState(true);

  const imageSource = item.image_url ? { uri: item.image_url } : null;
  const itemQuantity =
    shoppingCart.find((cartItem) => cartItem.id === item.id)?.quantity || 0;

  return (
    <LinearGradient colors={["#1E90FF", "#FF8C00"]} style={styles.gradient}>
      <View style={styles.container}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.categoryName}>{item.categoryName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.itemQuantity}>Quantity: {itemQuantity}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => onRemoveFromCart(item)}
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
        {itemQuantity >  (<TouchableOpacity
            //onPress={() => navigation.navigate("ShoppingCartScreen", { cartItems: shoppingCart })}
            style={[styles.button, { backgroundColor: "green" }]}>
            <Text style={styles.buttonText}>Add to Cart({shoppingCart.reduce((total, item) => total + item.quantity, 0)})</Text>
          </TouchableOpacity>)}
        <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: "gray" }]}>
          <Text style={styles.buttonText}>Close</Text>
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
      justifyContent: 'center',
      alignItems: 'center',
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
    closeButton: {
      marginTop: 32,
      paddingHorizontal: 24,
      paddingVertical: 8,
      backgroundColor: 'dodgerblue',
      borderRadius: 8,
    },
    buttonsContainer: {
      flexDirection: "row",
      marginTop: 32,
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
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginHorizontal: 4,
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
  });
  
  export default FoodItemDetailsScreen;
  