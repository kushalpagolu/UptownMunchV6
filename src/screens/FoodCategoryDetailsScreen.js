import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { getFoodItemsByCategory } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { auth, app,  } from '../firebase';

const FoodCategoryDetailsScreen = ({ route, navigation }) => {
  const [foodItems, setFoodItems] = useState([]);
  const { categoryName, description } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const items = await getFoodItemsByCategory(categoryName);
      setFoodItems(items);
    };

    fetchData();
  }, [categoryName]);

  const renderFoodItem = ({ item }) => {
    const imageSource = item.image_url ? { uri: item.image_url, width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 2,
     } : null;

    return (
      <TouchableOpacity style={styles.foodItemContainer}>
        {imageSource && (
          <Image source={imageSource} style={styles.foodItemImage} />
        )}
        <View style={styles.foodItemDetails}>
          <Text style={styles.foodItemName}>{item.itemName}</Text>
          <Text style={styles.foodItemPrice}>${item.price}</Text>
          <Text style={styles.foodItemDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#FF8C00', '#FFA500', '#FFDAB9']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <View style={styles.transparentBackground}>
        <Text style={styles.title}>Food Items - {categoryName}</Text>
        <Text style={styles.categoryDescription}>{description}</Text>
        <FlatList
          data={foodItems}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.foodItemsContainer}
          numColumns={2}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Welcome', { user: auth.currentUser.uid }); }}>
            <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  transparentBackground: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
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
    marginBottom: 60,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  categoryDescription: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  foodItemContainer: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 2,
    marginHorizontal: 0,
    borderWidth: 1, // Added this line
    borderColor: '#c0c0c0', // Added this line
    margin: 8, 
    padding: 8, 
  },

  foodItemImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover', 
    marginBottom: 8,
  },
  
  foodItemDetails: {
    paddingHorizontal: 4,
    flex: 1, 
  },
  foodItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodItemPrice: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  foodItemDescription: {
    fontSize: 14,
    marginTop: 4,
  },
});


export default FoodCategoryDetailsScreen;
