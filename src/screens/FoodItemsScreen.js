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
  
    
  const renderFoodItem = ({ item }) => {
    const itemCategory = item.itemCategory.categoryName || '';

    const imageSource = item.image_url ? { uri: item.image_url } : null;
    const itemQuantity = shoppingCart.find((cartItem) => cartItem.id === item.id)?.quantity || 0;

    return (
      <TouchableOpacity
        style={styles.foodItemContainer}
        onPress={() => showItemDetails(item)}>
        {imageSource && (
          <Image source={imageSource} style={styles.foodItemImage} />
        )}
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)"]}
          style={styles.foodItemOverlay}
        >
          <View style={styles.foodItemDetails}>
            <Text style={styles.foodItemName}>{item.itemName}</Text>
            <Text style={styles.foodItemCategory}>{item.categoryName}</Text>
          </View>
          <View style={styles.iconsContainer}>
            <Ionicons
              name="heart-outline"
              size={30}
              color="#FFF"
              style={styles.favoriteIcon}
            />
            <View style={styles.quantityContainer}>
              {itemQuantity > 0 && (
                <TouchableOpacity onPress={() => removeFromCart(item)}>
                  <AntDesign name="minuscircleo" size={30} color="#FFF" style={styles.icons}/>
                </TouchableOpacity>
              )}
              {itemQuantity > 0 && (
                <Text style={styles.itemQuantity}>{itemQuantity}</Text>
              )}
              <TouchableOpacity onPress={() => addToCart(item)}>
              <AntDesign name="pluscircleo" size={30} color="#FFF" style={styles.icons}/>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
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
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.foodItemsContainer}
        numColumns={2} 
      />
     <TouchableOpacity
  style={styles.viewCartButton}

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


