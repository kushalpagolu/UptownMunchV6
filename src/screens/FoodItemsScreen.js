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
      style={styles.container}>
      <Text style={styles.title}>UptownMunch</Text>
      <FlatList
        data={foodItems}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.foodItemsContainer}
      />
      <TouchableOpacity
        style={styles.viewCartButton}
        onPress={() => navigation.navigate('ShoppingCartScreen', { cartItems: shoppingCart })}>
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
    },
    foodItemsContainer: {
      paddingBottom: 16,
    },
    foodItemContainer: {
      flex: 1,
      alignItems: 'stretch',
      marginBottom: 16,
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 5,
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
    foodItemDetails: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    foodItemName: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 8,
    },
    foodItemCategory: {
      color: 'white',
      fontSize: 14,
      marginBottom: 4,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemQuantity: {
      color: '#FFF',
      fontSize: 16,
      marginRight: 5,
    },
    iconsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 10,
      left: 10,
      right: 10,
    },
    favoriteIcon: {
      paddingHorizontal: 5,
    },
    icons: {
      paddingHorizontal: 5,
    },
    viewCartButton: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      paddingHorizontal: 24,
      paddingVertical: 8,
      backgroundColor: 'dodgerblue',
      borderRadius: 8,
    },
    viewCartButtonText: {
      fontSize: 16,
      color: 'white',
    },
    
  });
  
  export default FoodItemsScreen;


