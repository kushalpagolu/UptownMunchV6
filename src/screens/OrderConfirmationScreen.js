import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';

const OrderConfirmationScreen = ({ navigation, route }) => {
  const auth = getAuth();
  const order = route.params.order;
  console.log(order)

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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1E90FF', '#FF8C00']}
        style={styles.gradient}
      >
        <Text style={styles.title}>Order Confirmation</Text>
      </LinearGradient>
      <View style={styles.orderDetails}>
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
      </View>
      <Button title="Back" onPress={() => {
        navigation.navigate('Welcome', { user: auth.currentUser.uid });
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width:'80%'
  },
  gradient: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  orderDetails: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
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
