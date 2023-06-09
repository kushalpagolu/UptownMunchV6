import React, {useContext} from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { CartContext } from '../../CartContext';
import { auth, getItems, loadFavorites, saveFavorites } from '../firebase';
import { getAuth } from 'firebase/auth';

export const renderFoodItem = ({ item, showItemDetails, shoppingCart, addToCart, removeFromCart, addToFavorites, removeFromFavorites, favorites, rotateYAnimatedStyle }) => {
  const itemCategory = item.itemCategory.categoryName || '';
  const imageSource = item.image_url ? { uri: item.image_url } : null;
  const itemQuantity = shoppingCart.find((cartItem) => cartItem.id === item.id)?.quantity || 0;
  
  return (
    <TouchableOpacity
      style={styles.foodItemContainer}
      onPress={() => showItemDetails(item)}>
      {imageSource && (
        <Animated.Image
          source={imageSource}
          style={[rotateYAnimatedStyle, styles.foodItemImage]}
        />
      )}
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)"]}
        style={styles.foodItemOverlay}
      >
        <View style={styles.foodItemDetails}>
          <View style={styles.topRow}>
            <Text style={styles.foodItemName}>{item.itemName}</Text>
            <Ionicons
              name={favorites.find((favoriteItem) => favoriteItem.id === item.id) ? "heart" : "heart-outline"}
              size={28}
              color="#FFF"
              style={styles.favoriteIcon}
              onPress={() => {
                const isFavorite = favorites.find((favoriteItem) => favoriteItem.id === item.id);
                if(isFavorite){
                    removeFromFavorites(item);
                } else {
                    addToFavorites(item);
                }
            }}
            />
          </View>
          <Text style={styles.foodItemCategory}>{item.categoryName}</Text>
          <View style={styles.bottomRow}>
            <View style={styles.iconsContainer}>
              <View style={styles.quantityContainer}>
                {itemQuantity > 0 && (
                  <TouchableOpacity onPress={() => removeFromCart(item)}>
                    <AntDesign name="minuscircleo" size={25} color="#FFF" style={styles.icons}/>
                  </TouchableOpacity>
                )}
                {itemQuantity > 0 && (
                  <Text style={styles.itemQuantity}>{itemQuantity}</Text>
                )}
                <TouchableOpacity onPress={() => addToCart(item)}>
                  <AntDesign name="pluscircleo" size={25} color="#FFF" style={styles.icons}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  foodItemContainer: {
    flex: 1,
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 5,
    margin: 5,
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
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodItemName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  foodItemCategory: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  favoriteIcon: {
    paddingHorizontal: 5,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  iconsContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  },
  quantityContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  },
  itemQuantity: {
  color: 'white',
  paddingHorizontal: 5,
  },
  icons: {
  paddingHorizontal: 5,
  },
  viewCartButton: {
  position: 'absolute',
  bottom: 66,
  right: 16,
  paddingHorizontal: 24,
  paddingVertical: 8,
  backgroundColor: 'dodgerblue',
  borderRadius: 8,
  paddingBottom: 8,
  },
  viewCartButtonText: {
  fontSize: 16,
  color: 'white',
  },
  });