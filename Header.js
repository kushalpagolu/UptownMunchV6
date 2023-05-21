import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Platform, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { LogoutButton } from './src/screens/Styles';
import { CartContext } from './CartContext';
import * as Animatable from 'react-native-animatable';

const HeaderRight = ({ onLogout }) => {
  const navigation = useNavigation();
  const { shoppingCart, cartItems } = useContext(CartContext);
  const totalItems = shoppingCart.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={{ flexDirection: 'row', paddingRight: 15 }}>
      <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart', { cartItems: shoppingCart })}>
        <Animatable.View animation="pulse" duration={2000} iterationCount="infinite">
          <View style={styles.cartIcon}>
            <Avatar
              rounded
              icon={{ name: 'shopping-cart', type: 'font-awesome', color: 'blue', size: 35, paddingRight: 15,}}
              overlayContainerStyle={{ backgroundColor: 'transparent' }}
              size={35}
            />
            {shoppingCart.length > 0 && (
              <Animatable.View style={styles.badge} animation="pulse" duration={2000} iterationCount="infinite">
                <Text style={styles.badgeText}>{totalItems}</Text>
              </Animatable.View>
            )}
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
    right: 3,
    backgroundColor: 'red',
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default HeaderRight;
