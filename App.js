import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthTabNavigator from './AuthTabNavigator';
import HomeStackScreen from './HomeStackScreen';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {auth, saveFavorites, loadFavorites} from './src/firebase'
import { CartContext } from './CartContext';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);

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

const addToFavorites = (item) => {
  //console.log('Favorites saved Item!', item);
  const itemIndex = favorites.findIndex((favoriteItem) => favoriteItem.id === item.id);
  //console.log(itemIndex)
  //console.log('Favorites in AaddToFavorites', favorites)

  if (itemIndex === -1) {
    setFavorites([...favorites, item]);
    handleSaveFavorites();
  }
};


const removeFromFavorites = (item) => {
  const newFavorites = favorites.filter(
    (favoriteItem) => favoriteItem.id !== item.id
  );

  setFavorites(newFavorites);
  handleSaveFavorites();
};

const handleSaveFavorites = async () => {
  // Assuming you have a state or prop for the user's id
  const userId = auth.currentUser.uid
  await saveFavorites(userId, favorites);
};

const handleLoadFavorites = async () => {
  // Assuming you have a state or prop for the user's id
  console.log('Favorites in handleLoadFavorites', favorites)
  const userId = auth.currentUser.uid
  const loadedFavorites = await loadFavorites(userId);
  setFavorites(loadedFavorites);
};

return (
<CartContext.Provider value={{ shoppingCart, addToCart, removeFromCart, handleUpdateCart, setShoppingCart, clearCart, setFavorites, favorites, addToFavorites, removeFromFavorites, handleSaveFavorites, handleLoadFavorites }}>
  <NavigationContainer>
    {!isLoggedIn ? 
      ( <AuthTabNavigator setIsLoggedIn={setIsLoggedIn} handleLoadFavorites={handleLoadFavorites} /> ) : ( <HomeStackScreen setIsLoggedIn={setIsLoggedIn} /> ) 
    }
  </NavigationContainer>
</CartContext.Provider>
);
};

export default App;