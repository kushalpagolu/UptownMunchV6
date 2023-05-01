import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, app } from '../firebase';

const db = getFirestore(app);

const OrderHistoryScreenAlternate = () => {
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
        console.log(doc.id, " => ", doc.data());
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
      <View style={styles.orderCardContainer}>
        <View style={styles.orderCardHeader}>
          <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
          <Text style={styles.orderDate}>Order Date: {item.create_datetime.toString()}</Text>
          <Text style={styles.orderTotal}>Order Total: ${item.total_price.toFixed(2)}</Text>
          <Text style={styles.orderId}>Status: {item.status}</Text>
        </View>
        <View style={styles.orderCardBody}>
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
        </View>
      </View>
    </Animated.View>
  );

  return (
    <LinearGradient colors={['#1E90FF', '#FF8C00']} start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Order History</Text>
        <FlatList
          horizontal={false}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  orderCard: {
    width: 300,
    height:150,
    margin: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  orderCardContainer: {
    flex: 1,
    padding: 10,
  },
  orderCardHeader: {
    flexDirection: 'row',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#999',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  orderCardBody: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default OrderHistoryScreenAlternate;