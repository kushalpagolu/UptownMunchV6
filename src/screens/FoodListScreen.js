import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, FlatList} from "react-native";
import firebase from 'firebase/app';
import { getItems, getFoodItemsByCategory } from '../firebase';
import FoodItemDetailsScreen from './FoodItemDetailsScreen';
import { initializeApp, getApps } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { auth, app,  } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { CartContext } from '../../CartContext';
import { getFirestore, collection, addDoc, doc,  } from 'firebase/firestore';

const FoodListScreen = ({ navigation }) => {
  const [foodCategories, setFoodCategories] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { shoppingCart, addToCart, removeFromCart, handleUpdateCart, clearCart } = useContext(CartContext);

  const db = getFirestore(app);

  const groupByCategory = (items) => {
    return items.reduce((result, item) => {
      (result[item.categoryName] = result[item.categoryName] || []).push(item);
      return result;
    }, {});
  };

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems('foodItems');
      const groupedItems = groupByCategory(items);
      const categoriesWithItems = Object.keys(groupedItems).map((key) => ({
        name: key,
        foodItems: groupedItems[key],
      }));
      setFoodCategories(categoriesWithItems);
    };
    fetchItems();
  }, []);

  const storage = getStorage();

  const showItemDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const closeModal = () => {
    setShowDetailsModal(false);
  };

  const getImageDownloadUrl = async (path) => {
    const storageRef = ref(storage);
    const imageRef = ref(storageRef, path);
    try {
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error('Error getting image download URL:', error);
      return null;
    }
  };

  const renderFoodItem = (item) => {
    const imageSource = item.image_url ? { uri: item.image_url } : null;
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.foodItem}
        onPress={() => showItemDetails(item)}>
        {imageSource && (
          <Image source={imageSource} style={styles.foodItemImage} />
        )}
        <Text style={styles.foodName}>{item.itemName}</Text>
        <Text style={styles.foodPrice}>$ {item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ddffc9', '#ff8473']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.container}>
        <FlatList
          data={foodCategories}
          keyExtractor={(category) => category.name}
          renderItem={({ item: category }) => (
            <View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <ScrollView horizontal={true} contentContainerStyle={styles.foodItemsContainer}>
                {category.foodItems.map((item) => renderFoodItem(item))}
              </ScrollView>
            </View>
          )}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Welcome', { user: auth.currentUser.uid }); }}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {showDetailsModal && (
        <Modal transparent visible={showDetailsModal}>
          <FoodItemDetailsScreen
            item={selectedItem}
            onClose={closeModal}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
            shoppingCart={shoppingCart}
            navigation={navigation}
          />
        </Modal>
      )}
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  foodItemsContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  foodItem: {
    marginRight: 10,
    width: 150,
    alignItems: "center",
  },
  foodItemImage: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  buttonContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    bottom: 20,
    alignSelf: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 10,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  categoryName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 10,
  },  
  foodName: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 4,
    color: "#000",
  },
  
  foodItemCategory: {
    fontSize: 14,
    color: "#888",
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4caf50",
    marginVertical: 4,
  },
  gradient: {
    flex: 1,
  },
});

export default FoodListScreen;
