
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Platform, TouchableOpacity, Image, LayoutAnimation } from 'react-native';
import { getItems } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';


const FoodCategoriesScreen = () => {
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [animatedItemStyle, setAnimatedItemStyle] = useState({});

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
  
  const handleItemPress = (itemId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedItemId(itemId);
    setAnimatedItemStyle({ transform: [{ scale: 1.1 }] });
  };

  const handleBackPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedItemId(null);
    setAnimatedItemStyle({});
  };
  
  
  const renderCategoryItem = ({ item }) => {
    const iconColor = item.type === "veg" ? "#4CAF50" : "#F44336";
    return (
      <TouchableOpacity
        onPress={() => handleItemPress(item.id)}
        style={[
          styles.itemContainer,
          selectedItemId === item.id ? animatedItemStyle : null,
        ]}
      >
        <MaterialIcons
          name="fastfood"
          size={50}
          color={iconColor}
          style={styles.itemIcon}
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  

  const renderSelectedItem = () => {
    const selectedItem = data.find((item) => item.id === selectedItemId);
    return (
      <View style={styles.selectedItemContainer}>
       
        <View style={styles.selectedItemTextContainer}>
          <Text style={styles.selectedItemName}>{selectedItem.name}</Text>
          <Text style={styles.selectedItemDescription}>{selectedItem.description}</Text>
        </View>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backtbuttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#FF8C00', '#FFA500', '#FFDAB9']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}>
      <Text style={styles.title}>UptownMunch</Text>
      {selectedItemId ?
        renderSelectedItem() :
        <FlatList
          data={data}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          numColumns={2} />}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
    paddingHorizontal: Platform.OS === 'web' ? 0 : 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  itemIcon: {
    alignSelf: "center",
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
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
  selectedItemContainer: {
    flex: 1,
  },
  backButton: {
    backgroundColor: 'blue',
    padding: 4,
    borderRadius: 6,
    marginTop: 6,
  },
  backtbuttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 9,
    fontWeight: 'bold',
  },
  selectedItemImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  selectedItemTextContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  selectedItemName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  selectedItemDescription: {
    fontSize: 18,
  },
  });
  
  export default FoodCategoriesScreen;
  
