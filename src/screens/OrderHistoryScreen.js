import React, { useState, useEffect, memo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, app } from '../firebase';

const db = getFirestore(app);

const formatDate = (timestamp) => {
  const date = timestamp.toDate();
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const OrderItem = memo(({ item }) => (
  <View style={styles.orderCard}>
    <LinearGradient
      colors={['#FED9B7', '#0081A7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
      <Text style={styles.orderDate}>Order Date: {formatDate(item.create_datetime)}</Text>
      <Text style={styles.orderTotal}>Order Total: ${item.total_price.toFixed(2)}</Text>
      <Text style={styles.orderStatus}>Status: {item.status}</Text>
      {item.foodItems.map((foodItem, index) => (
        <View key={index} style={styles.foodItemContainer}>
          <Text style={styles.foodItemName}>
            Item Name: {foodItem.name}
          </Text>
          <Text style={styles.foodItemQuantity}>
            Quantity: {foodItem.quantity.toFixed(2)}
          </Text>
        </View>
      ))}
    </LinearGradient>
  </View>
));

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;

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

  const renderItem = ({ item }) => <OrderItem item={item} />;

  return (
    <LinearGradient colors={['#A6C0FE', '#ff8473']} start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} style={styles.gradient}>
      <View style={styles.container}>
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
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingTop: 50,
    width: '100%',
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
    padding: 10,
    margin: 20,
    borderRadius: 10,
    elevation: 2,
    width: null,
    marginBottom: 80,
    
  },
  orderId: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    marginBottom: 8,
  },
  orderTotal: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'auto',
  },
  foodItemContainer: {
    flexDirection: 'column',
    marginBottom: 8,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodItemQuantity: {
    fontSize: 14,
  },
  orderStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});


export default OrderHistoryScreen;
