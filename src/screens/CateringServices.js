import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground, FlatList, TouchableOpacity } from "react-native";
import { getItems } from "../firebase";
import { LinearGradient } from "expo-linear-gradient";
import { auth, app,  } from '../firebase';

const CateringServices = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getItems("cateringServices").then((data) => {
      setItems(data);
      setIsLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => {
    const imageSource = item.img_url ? { uri: item.img_url } : null;
    return (
      <View style={styles.item}>
        <ImageBackground source={imageSource} style={styles.image} imageStyle={styles.imageContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.itemName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.weight}>{item.weight}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <LinearGradient colors={["#FC5C7D", "#6A82FB"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Catering Services</Text>
        <Text style={styles.text}>
          We offer catering services for events of all sizes. Our menu
          includes a wide range of dishes to satisfy every palate. Contact us
          today to learn more!
        </Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // sets number of columns
            columnWrapperStyle={styles.row}  // places them into rows
          />
          
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Welcome', { user: auth.currentUser.uid }); }}>
            <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flex: 1,
    margin: 5,
    height: 260,
    marginBottom: 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  imageContent: {
    borderRadius: 10,
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: "80%",
    alignSelf: "center",
    },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'white',
  },
  description: {
    fontSize: 12,
    fontWeight: "bold",
    color: 'white',
  },
  price: {
    fontSize: 14,
    color: 'white',
    fontWeight: "bold",
  },
  weight: {
    fontSize: 14,
    color: 'white',
    fontWeight: "bold",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'white',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  buttonContainer: {
    paddingBottom: 20,
    bottom: 20,
    alignSelf: 'center',
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
    marginTop: 20,
  },
    buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
});

export default CateringServices;

