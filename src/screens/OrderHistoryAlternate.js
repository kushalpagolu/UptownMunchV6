import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, app,  } from '../firebase';

const db = getFirestore(app);

const formatDate = (timestamp) => {
 // console.log('Timestamp:', timestamp);
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


const OrderHistoryScreenAlternate = () => {
  const [orders, setOrders] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));

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
        //console.log(doc.id, " => ", doc.data());
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
          <Text style={styles.orderDate}>Order Date: {formatDate(item.create_datetime)}</Text>
          <Text style={styles.orderTotal}>Order Total: ${item.total_price.toFixed(2)}</Text>
        </View>
        <View style={styles.orderCardBody}>
        <Text style={styles.orderId}>Status: {item.status}</Text>
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
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  orderCard: {
    width: 360,
    margin: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFF',
    padding: 10,
  },
  orderCardContainer: {
    flex: 1,
    padding: 10,
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  orderInfo: {
    flexDirection: 'column',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  orderCardBody: {
    flex: 1,
    flexDirection: 'column',
  },
  orderHistoryContainer: {
    paddingBottom: 20,
  },
  foodItemContainer: {
    flexDirection: 'column',
    marginBottom: 5,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodItemQuantity: {
    fontSize: 14,
  },
});


export default OrderHistoryScreenAlternate;