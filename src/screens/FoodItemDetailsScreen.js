import React, { useContext, useEffect, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated,  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../../CartContext';

const FoodItemDetailsScreen = ({ item, onClose }) => {
  const { shoppingCart, addToCart, removeFromCart } = useContext(CartContext);
  const navigation = useNavigation();

  const animatedValue = new Animated.Value(0);
  const currentValue = 0;


  const setInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
    extrapolate: 'clamp',
  });

  const rotateYAnimatedStyle = {
    transform: [{ rotateY: setInterpolate }],
  };

  const flipAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 180,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    flipAnimation();
  }, []);

  const imageSource = item.image_url ? { uri: item.image_url } : null;
  const itemQuantity = shoppingCart.find((cartItem) => cartItem.id === item.id)?.quantity || 0;

  return (
    <LinearGradient colors={['#1E90FF', '#FF8C00']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        {imageSource && (
          <Animated.Image
            source={imageSource}
            style={[rotateYAnimatedStyle, styles.image]}
            useNativeDriver={false}
          />
        )}
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text style={styles.categoryName}>{item.categoryName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.itemQuantity}>Quantity: {itemQuantity}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => removeFromCart(item)}
            style={[styles.button, { backgroundColor: 'dodgerblue' }]}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addToCart(item)}
            style={[styles.button, { backgroundColor: 'dodgerblue' }]}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        {itemQuantity > 0 && (
          <TouchableOpacity
            onPress={() => {
              onClose();
              navigation.navigate('ShoppingCart', {
                cartItems: shoppingCart,
              });
            }}
            style={styles.viewCartButton}
          >
            <Text style={styles.viewCartButtonText}>
              Cart({shoppingCart.reduce((total, item) => total + item.quantity, 0)})
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onClose} style={styles.viewCartButton}>
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
fontWeight: 'bold',
marginTop: 16,
},
buttonsContainer: {
flexDirection: 'row',
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
color: 'white',
padding: 8,
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