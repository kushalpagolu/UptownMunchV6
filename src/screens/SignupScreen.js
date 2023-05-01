import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Platform, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import db, { auth } from '../firebase';

// Get a reference to the users collection
const usersCollection = collection(db, 'users');

const SignupForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError(''); // Reset the error state

      const auth = getAuth();
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Save user data to the users collection
      const newUser = doc(usersCollection);
      await setDoc(newUser, {
        address: '',
        email: email,
        first_name: '',
        id: result.user.uid,
        last_name: '',
        password: password,
        phone: '',
        profile_picture: '',
        username: '',
      });
      // Show success alert with registered email
    if (Platform.OS === 'web') {
      window.alert(`Success: Successfully Registered\n${email}`);
    } else {
      Alert.alert('Success', `Successfully Registered\n${email}`, [{ text: 'OK' }]);
    }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: Platform.OS === 'android' ? true : false,
    }).start();
  };

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <LinearGradient colors={['#ee0979', '#ff6a00']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
        <View style={styles.form}>
          <Text style={styles.logoText}>UptownMunch</Text>
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
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Sign Up'}</Text>
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
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
  },
  logoText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
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

export default SignupForm;