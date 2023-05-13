import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Platform, Modal, Animated, Easing, KeyboardAvoidingView, ScrollView  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, app, getFirestore, collection, doc, setDoc, uploadImageToFirebase } from '../firebase';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

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
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const [errorMessage, setErrorMessage] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      //setName(auth.currentUser.displayName);
      setEmail(auth.currentUser.email);
    }
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };
  const handleSave = async () => {
    console.log('Saving user profile...', first_name, last_name, email, addressLine1, addressLine2, city, state, zipcode, phone);
    if (first_name === '' || last_name === '' || email === '' || addressLine1 === '' || addressLine2 ==='' || city==='' || state ==='' || zipcode ==='' || phone ==='') {
      setErrorMessage('Please fill in all the details.');
      return;
    }
    const imageUrl = await uploadImageToFirebase(profilePicture, 'users', auth.currentUser.uid);
  
    try {
      const db = getFirestore(app);
      const userRef = doc(collection(db, 'users'), auth.currentUser.uid);
  
      await setDoc(userRef, {
        userId: auth.currentUser.uid,
        email,
        first_name: first_name,
        last_name: last_name,
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
  
      // Start the animation only after saving the profile successfully
      Animated.timing(rotation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start(() => {
        setSuccessModalVisible(true);
        rotation.setValue(0);
      });
  
      // Clear the error message if the save is successful
      setErrorMessage('');
  
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

    return (
      <LinearGradient colors={['#A6C0FE', '#ff8473']} style={styles.gradient}>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView style={styles.container}>

          <View style={styles.profileImageContainer}>
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={styles.profileImage} />
            ) : (
              <View style={styles.emptyProfileImage}>
                <MaterialIcons name="person" size={100} color="#FFFFFF" />
              </View>
            )}
            <TouchableOpacity style={styles.smallButton} onPress={pickImage}>
              <Text style={styles.smallButtonText}>Select Profile Picture</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="First Name"
              onChangeText={setFirstName}
              value={first_name}
            />
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Last Name"
              onChangeText={setLastName}
              value={last_name}
            />
        </View>

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
       

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Welcome', { user: auth.currentUser.uid }); }}>
            <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

      
        </KeyboardAvoidingView>
    </ScrollView>
    <Modal
  transparent={true}
  visible={successModalVisible}
>
  <Animated.View
  style={[
    styles.successModalContent,
    { transform: [{ rotate: spin }] },
  ]}
>
  <Text style={styles.successText}>Profile saved successfully!</Text>
<TouchableOpacity
  style={styles.closeButton}
  onPress={() => setSuccessModalVisible(false)}
>
  <Text style={styles.closeButtonText}>Close</Text>
</TouchableOpacity>

</Animated.View>
</Modal>
  </LinearGradient>
  );
};

const styles = StyleSheet.create({
gradient: {
flex: 1,
},
scrollContainer: {
  flexGrow: 1,
  paddingBottom: 30,
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
saveButton: {
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 10,
  paddingVertical: 10,
  marginBottom: 16,
  paddingBottom: 10,
},
button: {
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 10,
  paddingVertical: 10,
  marginBottom: 36,
  paddingBottom: 10,
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
profileImage: {
  width: 100,
  height: 100,
  borderRadius: 50,
  marginBottom: 16,
},
keyboardAvoidingView: {
  flex: 1,
},
profileImageContainer: {
  alignItems: 'center',
  marginBottom: 16,
},
emptyProfileImage: {
  width: 100,
  height: 100,
  borderRadius: 50,
  borderWidth: 1,
  borderColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 16,
},
smallButton: {
  height: 30,
  width: 180,
  backgroundColor: '#fff',
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 10,
  marginBottom: 16,
},
smallButtonText: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#1E90FF',
},
inputRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16,
},
inputHalf: {
  width: '50%',
},
successModalContent: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  marginTop: '50%',
},
successText: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 20,
},
closeButton: {
  backgroundColor: '#1E90FF',
  borderRadius: 5,
  paddingHorizontal: 10,
  paddingVertical: 5,
},
closeButtonText: {
  color: 'white',
  fontWeight: 'bold',
},

});

export default UserProfileScreen;