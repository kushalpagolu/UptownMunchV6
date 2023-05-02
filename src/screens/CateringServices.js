
/*
the code to fetch cateringServices collection from your firebase and modify the code to display the cateringItems which have the fields categoryName, itemName, image_url, description, price and weight fields from cateringServices collection. 
Use three column grids to display the items and make them scrollable with Animation and add LinearGradient to the screen. The code should be compatible with web and mobile platforms:

*/
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { getItems } from "../firebase";
import { LinearGradient } from "expo-linear-gradient";

const CateringServices = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getItems("cateringServices").then((data) => {
      setItems(data);
      setIsLoading(false);
    });
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <>
      <LinearGradient colors={["#FC5C7D", "#6A82FB"]} style={styles.gradient}>
        <View style={styles.container}>
          <Text style={styles.title}>Catering Services</Text>
          <Text style={styles.text}>
            We offer catering services for events of all sizes. Our menu
            includes a wide range of dishes to satisfy every palate. Contact us
            today to learn more!
          </Text>
        </View>
      </LinearGradient>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        horizontal={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          items.map((item, i) => (
            <View key={i} style={styles.item}>
              <Image source={{ uri: item.image_url }} style={styles.image} />
              <View style={styles.content}>
                <Text style={styles.title}>{item.itemName}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.weight}>{item.weight}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  item: {
    width: "33.33%",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: "red",
  },
  weight: {
    fontSize: 16,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContainer: {
    marginTop: 20,
  },
  scrollContent: {
    flexDirection: "row",
  },
});

export default CateringServices;

