import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Image, FlatList, Alert, TouchableOpacity, Animated, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getItems } from '../firebase';
import FoodItemDetailsScreen from './FoodItemDetailsScreen';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import ShoppingCartScreen from './ShoppingCartScreen';
import firebase from 'firebase/app';
import 'firebase/storage';
import styles from './Styles';
import { renderFoodItem } from './FoodItem';


const FoodItemsScreen = ({ navigation }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      const items = await getItems('foodItems');
      setFoodItems(items);
    };
    fetchFoodItems();
  }, []);

  const addToCart = (item) => {
    const itemIndex = shoppingCart.findIndex((cartItem) => cartItem.id === item.id);
  
    if (itemIndex > -1) {
      const newShoppingCart = [...shoppingCart];
      newShoppingCart[itemIndex].quantity += 1;
      setShoppingCart(newShoppingCart);
    } else {
      setShoppingCart([...shoppingCart, { ...item, quantity: 1 }]);
    }
  };
  const removeFromCart = (item) => {
    const itemIndex = shoppingCart.findIndex((cartItem) => cartItem.id === item.id);

    if (itemIndex > -1) {
      const newShoppingCart = [...shoppingCart];
      newShoppingCart[itemIndex].quantity -= 1;

      if (newShoppingCart[itemIndex].quantity === 0) {
        newShoppingCart.splice(itemIndex, 1);
      }

      setShoppingCart(newShoppingCart);
    }
  };

  const showItemDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const closeModal = () => {
    setShowDetailsModal(false);
  };

  const getImageDownloadUrl = async (path) => {
    const storageRef = firebase.storage().ref("foodItems");
    const imageRef = storageRef.child(path);
    try {
      const url = await imageRef.getDownloadURL();
      return url;
    } catch (error) {
      console.error('Error getting image download URL:', error);
      return null;
    }
  };
  
  
  return (
    <LinearGradient
      colors={['#FF8C00', '#FFA500', '#FFDAB9']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.fooditemsscreencontainer}>
      <Text style={styles.fooditemsscreentitle}>UptownMunch</Text>
      <FlatList
        data={foodItems}
        renderItem={(props) => renderFoodItem({ ...props, showItemDetails, shoppingCart, addToCart, removeFromCart })}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.foodItemsContainer}
        numColumns={2} 
      />
     <TouchableOpacity style={styles.viewCartButton}
      //This will navigate to the ShoppingCartScreen and pass the shoppingCart state as a parameter. With the changes we made to the ShoppingCartScreen earlier, it will correctly receive and use the cartItems passed from this screen through the route.params object.
      onPress={() => navigation.navigate('ShoppingCart', { cartItems: shoppingCart })}
      >
    <Text style={styles.viewCartButtonText}> View Cart ({shoppingCart.reduce((total, item) => total + item.quantity, 0)})
    </Text>
    </TouchableOpacity>

      {showDetailsModal && (
  <Modal transparent visible={showDetailsModal}>
    <FoodItemDetailsScreen
      item={selectedItem}
      onClose= {closeModal}
      onAddToCart={addToCart}
      onRemoveFromCart={removeFromCart}
      shoppingCart={shoppingCart}
      navigation={navigation} 
    />
  </Modal>
)}
    </LinearGradient>
  );
};

  
  export default FoodItemsScreen;


