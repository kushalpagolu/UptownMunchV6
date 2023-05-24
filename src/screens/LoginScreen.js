import React, { useState, useContext } from 'react';
import {View,Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { CartContext } from '../../CartContext';
//import { auth } from '../firebase.js';
import sharedStyles from './Styles.js';

const LoginScreen = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();

  const { handleLoadFavorites } = useContext(CartContext); 

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      //pass the authenticated object
      await handleLoadFavorites();

    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
       // setError('Enter a valid email and password.'); // Update error state
        showAlert('Enter a valid email and password.');
      } else {
       // setError(error.message); // Update error state
        showAlert(error.message);
      }
    }
  };
  
  const showAlert = (message) => {
    // Use the browser's built-in alert() function for web
    if (Platform.OS === 'web') {
      alert(message);
    } else {
      Alert.alert(
        'Error',
        message,
        [
          { text: 'OK', onPress: () => {} },
        ],
        { cancelable: true }
      );
    }
  };
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <LinearGradient
        colors={['#ee0979', '#ff6a00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        <View style={styles.form}>
        <Image
          source={require('../../assets/UptownMunch.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: '100%',
    height: 250,
    marginBottom: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
});

export default LoginScreen;
