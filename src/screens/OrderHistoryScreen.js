import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, app } from '../firebase';

const db = getFirestore(app);

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      console.log(user.uid)

      if (!user) {
        console.log("User not logged in.");
        return;
      }

      const ordersCollection = collection(db, 'orders');
      const q = query(ordersCollection, where('created_by', "==", user.uid));

      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
      });

      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }, [fadeAnim]);

  const renderItem = ({ item }) => (
    <Animated.View key={item.id} style={[styles.orderCard, { opacity: fadeAnim }]}>
       <LinearGradient
        colors={['#ee0979', '#ff6a00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
      <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
      <Text style={styles.orderDate}>Order Date: {item.create_datetime.toString()}</Text>
      <Text style={styles.orderTotal}>Order Total: ${item.total_price.toFixed(2)}</Text>
      <Text style={styles.orderId}>Status: {item.status}</Text>
      {item.foodItems.map((foodItem, index) => (
        <View key={index}>
          <Text style={styles.orderId}>
            Item Name: {foodItem.name}
          </Text>
          <Text style={styles.orderId}>
            Quantity: {foodItem.quantity.toFixed(2)}
          </Text>
        </View>
      ))}
      </LinearGradient>
    </Animated.View>
  );

  return (
    <LinearGradient colors={['#1E90FF', '#FF8C00']} start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Order History</Text>
        <FlatList
          horizontal={true}
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.orderHistoryContainer}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  orderHistoryContainer: {
    paddingTop: 20,
  },
  orderCard: {
    backgroundColor: '#FFF',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 2,
    width: null,
  },
  orderId: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 16,
    marginBottom: 8,
  },
  orderTotal: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
});


export default OrderHistoryScreen;
