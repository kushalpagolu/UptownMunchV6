import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Modal, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, app, getFirestore, collection, doc, setDoc } from '../firebase';
import { MaterialIcons } from '@expo/vector-icons';

const UserProfileScreen = ({ navigation }) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
      //setName(auth.currentUser.displayName);
      setEmail(auth.currentUser.email);
    }
  }, []);

  const handleSave = async () => {
    if (first_name === '' || last_name === '' || email === '' || addressLine1 === '' || addressLine2 ==='' || city==='' || state ==='' || zipcode ==='' || phone ==='') {
      setErrorMessage('Please fill in all the details.');
      return;
    }
    try {
      const db = getFirestore(app);
      const userRef = doc(collection(db, 'users'), auth.currentUser.uid);

      await setDoc(userRef, {
        userId: auth.currentUser.uid,
        email,
        first_name: first_name,
        last_name: 'last_name',
        phone,
        profile_picture: profilePicture,
        address: {
          line1: addressLine1,
          line2: addressLine2,
          city,
          state,
          zipcode,
        },
      });

      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        setSuccessModalVisible(true);
        rotation.setValue(0);
      });
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient colors={['#1E90FF', '#FF8C00']} style={styles.gradient}>
      <View style={styles.container}>
      <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setFirstName}
          value={first_name}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setLastName}
          value={last_name}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Address Line 1"
          onChangeText={setAddressLine1}
          value={addressLine1}
        />
        <TextInput
          style={styles.input}
          placeholder="Address Line 2"
          onChangeText={setAddressLine2}
          value={addressLine2}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          onChangeText={setCity}
          value={city}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          onChangeText={setState}
          value={state}
        />
        <TextInput
          style={styles.input}
          placeholder="Zipcode"
          onChangeText={setZipcode}
          value={zipcode}
        />
        <TextInput
              style={styles.input}
              placeholder="Phone"
              onChangeText={setPhone}
              value={phone}
            />
        <TextInput
          style={styles.input}
          placeholder="Profile Picture URL"
          onChangeText={setProfilePicture}
          value={profilePicture}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText} onPress={() => {
          navigation.navigate('Welcome', { user: auth.currentUser });
        }} >     Back   </Text>
        </TouchableOpacity>
      
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
gradient: {
flex: 1,
},
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
padding: 16,
},
input: {
  height: 40,
  width: '100%',
  borderWidth: 1,
  borderColor: '#fff',
  borderRadius: 10,
  paddingHorizontal: 10,
  marginBottom: 16,
  color: '#fff',
},
button: {
  height: 40,
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  padding:6,
},
buttonText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#1E90FF',
},
errorText: {
  color: 'red',
  marginBottom: 8,
  fontSize: 16,
},
centeredView: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
marginTop: 22,
},
modalView: {
margin: 20,
backgroundColor: 'white',
borderRadius: 20,
padding: 35,
alignItems: 'center',
shadowColor: '#000',
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 4,
elevation: 5,
},
modalText: {
marginBottom: 15,
textAlign: 'center',
fontSize: 18,
fontWeight: 'bold',
color: '#4CAF50',
},
});

export default UserProfileScreen;