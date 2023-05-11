import React, { useContext } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LogoutButton } from './src/screens/Styles';
import { CartContext } from './App';  // Import CartContext

const HeaderRight = ({ onLogout }) => {
  const navigation = useNavigation();
  const { shoppingCart, addToCart, removeFromCart, handleUpdateCart, clearCart } = useContext(CartContext); // Use the CartContext

  return (
    <View style={{ flexDirection: 'row', paddingRight: 10 }}>
      <Ionicons
        name="cart-outline"
        size={25}
        onPress={() => navigation.navigate('ShoppingCart', { cartItems: shoppingCart, removeFromCart: removeFromCart, onUpdateCart: handleUpdateCart })}
      />
      <LogoutButton onLogout={onLogout} />
    </View>
  );
};

export default HeaderRight;
