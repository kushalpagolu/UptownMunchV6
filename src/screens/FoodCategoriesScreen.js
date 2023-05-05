
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Platform, TouchableOpacity, Button, Image, LayoutAnimation } from 'react-native';
import { getItems } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { auth, app,  } from '../firebase';


const FoodCategoriesScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const user = auth.currentUser;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getItems('foodCategories');
        setData(items);
      } catch (error) {
        console.log('Error retrieving data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleItemPress = (categoryName) => {
    navigation.navigate('FoodCategoryDetailsScreen', { categoryName });
  };

  const renderCategoryItem = ({ item }) => {
    const iconColor = item.type === 'veg' ? '#4CAF50' : '#F44336';
    return (
      <TouchableOpacity
        onPress={() => handleItemPress(item.categoryName)}
        style={styles.itemContainer}
      >
        <MaterialIcons
          name="fastfood"
          size={50}
          color={iconColor}
          style={styles.itemIcon}
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemName}>{item.categoryName}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };  
  
  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={['#FF8C00', '#FFA500', '#FFDAB9']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.container}
      >
        <Text style={styles.title}>UptownMunch</Text>
        <FlatList
          data={data}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Welcome', { user: auth.currentUser.uid }); }}>
            <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        </View>

      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
    paddingHorizontal: Platform.OS === 'web' ? 0 : 16,
    paddingTop: 16,
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
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flex: 1,
    marginHorizontal: 4,
    paddingBottom: 20,

  },
  itemIcon: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,

  },
  itemDescription: {
    fontSize: 14,
    flexShrink: 1,

  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  itemTextContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  transparentBackground: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: 'transparent',
  },
  outerContainer: {
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 30,
    paddingBottom: 30,
    bottom: 20,
    alignSelf: 'center',
  },
});

export default FoodCategoriesScreen;
