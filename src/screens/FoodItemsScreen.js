import React, { useState, useEffect,  useContext } from 'react';
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
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { CartContext } from '../../CartContext';

const FoodItemsScreen = ({ navigation }) => {
  const { shoppingCart, addToCart, removeFromCart, handleUpdateCart, clearCart } = useContext(CartContext);

  const [foodItems, setFoodItems] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      const items = await getItems('foodItems');
      setFoodItems(items);
    };
    fetchFoodItems();
  }, []);


  const showItemDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const closeModal = () => {
    setShowDetailsModal(false);
  };

  const storage = getStorage();

 const getImageDownloadUrl = async (path) => {
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, path);
    try {
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error('Error getting image download URL:', error);
      return null;
    }
  };
  
  return (
    <LinearGradient
      colors={['#ddffc9', '#ff8473',]}
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
      //This will navigate to the ShoppingCartScreen and pass the shoppingCart state as a parameter. 
      onPress={() => navigation.navigate('ShoppingCart', { cartItems: shoppingCart})}
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
      removeFromCart={removeFromCart}
      shoppingCart={shoppingCart}
      navigation={navigation} 
    />
  </Modal>
)}
    </LinearGradient>
  );
};

  
  export default FoodItemsScreen;


