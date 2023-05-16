import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, Platform, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, app } from '../firebase';
import { getAuth } from 'firebase/auth';

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

const OrderItem = ({ item }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: Platform.OS !== 'web', 
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.orderCard, { opacity: fadeAnim }]}>
      <LinearGradient
        colors={['#D7EDE1', '#38A2D6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
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
      </LinearGradient>
    </Animated.View>
  );
};

const OrderHistoryScreenAlternate = ({ navigation }) => {
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

      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchOrders();
  }, []);

  const renderItem = ({ item }) => <OrderItem item={item} />;

  return (
    <LinearGradient colors={['#A6C0FE', '#ff8473']} start={{ x: 0, y: 0 }}
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
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Welcome', { user: auth.currentUser.uid }); }}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
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
  buttonContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    bottom: 20,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 40
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
  container: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  orderCard: {
    width: 360,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#64E9FF',
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
    alignItems: 'center',
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