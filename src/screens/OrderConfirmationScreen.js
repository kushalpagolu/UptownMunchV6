import React, { useEffect, useRef } from 'react';
import { View, Text,ScrollView, StyleSheet, Button, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';

const OrderConfirmationScreen = ({ navigation, route }) => {
  const auth = getAuth();
  const order = route.params.order;

  console.log(order)
  if (!order) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Format the date to remove the time zone information
  const formatDate = (dateString) => {
    const date = new Date(dateString);
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

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1E90FF', '#FF8C00']}
        style={StyleSheet.absoluteFillObject}
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Order Confirmation
      </Animated.Text>
      <LinearGradient
        colors={['#FF8C00', '#1E90FF']}
        style={styles.orderDetailsGradient}
      >
                <View style={styles.orderDetailsShadow}>
         <ScrollView style={styles.orderDetails}>
          <Text style={styles.orderId}>Order ID: {order.orderId}</Text>
          <Text style={styles.orderDate}>Order Date: {formatDate(order.create_datetime)}</Text>
          <Text style={styles.orderTotal}>Order Total: ${order.total_price.toFixed(2)}</Text>
          <View style={styles.foodItems}>
            {order.foodItems.map(foodItem => (
              <View key={foodItem.id}>
                <Text style={styles.foodItemName}>{foodItem.name}</Text>
                <Text style={styles.foodItemQuantity}>Quantity: {foodItem.quantity}</Text>
                <Text style={styles.foodItemPrice}>Price: ${foodItem.price}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        </View>

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  buttonContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    bottom: 20,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
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
    fontWeight: 'bold',
    position: 'absolute',
    top: 50,
  },
  orderDetailsCardGradient: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 30,
    marginBottom: 30,
  },
  orderDetails: {
    paddingTop: 30,
    borderWidth: 2,
    borderColor: '#1E90FF',
    borderRadius: 10,
    padding: 20,
    marginTop: 30,
    marginBottom: 30,
  },

  orderDetailsShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },

  orderDetailsGradient: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 16,
    marginBottom: 10,
    },
    orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    },
    foodItems: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    },
    foodItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    },
    foodItemQuantity: {
    fontSize: 14,
    },
    foodItemPrice: {
    fontSize: 14,
    },
    });
    
    export default OrderConfirmationScreen;