import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthTabNavigator from './AuthTabNavigator';
import HomeStackScreen from './HomeStackScreen';
import { LogoutButton } from './src/screens/Styles';


const ShoppingCartStack = createNativeStackNavigator();

export const CartContext = createContext();


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);

  const clearCart = () => {
    setShoppingCart([]);
  };

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

const handleUpdateCart = (updatedCart) => {
setShoppingCart(updatedCart);
};

return (
<CartContext.Provider value={{ shoppingCart, addToCart, removeFromCart, handleUpdateCart, clearCart }}>
<NavigationContainer>
{!isLoggedIn ? (
<AuthTabNavigator setIsLoggedIn={setIsLoggedIn} />
) : (
<HomeStackScreen setIsLoggedIn={setIsLoggedIn} />
)}
</NavigationContainer>
</CartContext.Provider>
);
};

export default App;