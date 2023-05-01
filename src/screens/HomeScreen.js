import React, { useState, useEffect } from 'react';
//import { TouchableOpacity } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import { FlatList, ActivityIndicator } from 'react-native-web';
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { auth } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Animated, Easing } from 'react-native';


const HomeScreen = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'menuItems')),
      (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMenuItems(items);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  
    return () => unsubscribe();
  }, []);
  
  const handleSearch = (text) => {
    setSearch(text);
  };

  const handleFilter = (criteria) => {
    // Filter the menu items based on the given criteria
    // Update the menuItems state with the filtered items
  };

  const handleSort = (criteria) => {
    // Sort the menu items based on the given criteria
    // Update the menuItems state with the sorted items
  };

  const handleRefresh = () => {
    setLoading(true);
    getDocs(collection(db, 'menuItems'))
      .then((querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMenuItems(items);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Text style={styles.menuItemTitle}>{item.title}</Text>
      <Text style={styles.menuItemDescription}>{item.description}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={handleRefresh}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar placeholder="Search for menu items" onChangeText={handleSearch} value={search} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Menu Items</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.filterButton} onPress={() => handleFilter('')}>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortButton} onPress={() => handleSort('')}>
            <Text style={styles.sortButtonText}>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={menuItems.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No menu items found</Text>}
                refreshing={loading}
                onRefresh={handleRefresh}
              />
            </View>
          );
        };
        
        const styles = StyleSheet.create({
          // Define your styles here
        });
        
        export default HomeScreen;
        
