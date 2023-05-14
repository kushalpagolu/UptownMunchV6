import React, { useContext } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LogoutButton } from './src/screens/Styles';
import { CartContext } from './CartContext';  // Import CartContext

const HeaderRight = ({ onLogout }) => {
  const navigation = useNavigation();
  const { shoppingCart, addToCart, removeFromCart, handleUpdateCart, clearCart } = useContext(CartContext); // Use the CartContext

  return (
    <View style={{ flexDirection: 'row', paddingRight: 15 }}>
      <Ionicons
        name="cart-outline"
        size={35}
        color={'blue'}
        onPress={() => navigation.navigate('ShoppingCart', { cartItems: shoppingCart })}
        style={{ paddingRight: 25 }}
      />
      <LogoutButton onLogout={onLogout} />
    </View>
  );
};

export default HeaderRight;
