import React, { useContext, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { LogoutButton } from './src/screens/Styles';
import { CartContext } from './CartContext';
import * as Animatable from 'react-native-animatable';

const HeaderRight = ({ onLogout }) => {
  const navigation = useNavigation();
  const { shoppingCart, cartItems } = useContext(CartContext);
  const totalItems = shoppingCart.reduce((total, item) => total + item.quantity, 0);
  const cartIconRef = useRef();
  const badgeRef = useRef();

  useEffect(() => {
    cartIconRef.current.swing(2000);
    badgeRef.current.bounce(1000);
  }, [totalItems]);

  return (
    <View style={{ flexDirection: 'row', paddingRight: 15 }}>
      <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart', { cartItems: shoppingCart })}>
        <Animatable.View ref={cartIconRef}>
          <View style={styles.cartIcon}>
            <Avatar
              icon={{ name: 'shopping-cart', type: 'font-awesome', color: 'blue', size: 35, paddingRight: 15,}}
              overlayContainerStyle={{ backgroundColor: 'transparent' }}
              size={35}
            />
            <Animatable.View ref={badgeRef} style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </Animatable.View>
          </View>
        </Animatable.View>
      </TouchableOpacity>
      <LogoutButton onLogout={onLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  cartIcon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    backgroundColor: 'blue',
    right: 3,
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  badgeText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HeaderRight;
