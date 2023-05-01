import { StyleSheet } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';

export const LogoutButton = ({ onLogout }) => (
  <TouchableOpacity
    style={styles.logoutbutton}
    onPress={onLogout}
  >
    <Text style={styles.logoutbuttonText}>Logout</Text>
  </TouchableOpacity>
);

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {children}
  </TouchableOpacity>
);


export const CircleButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.circleButton}>
    <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  circleButton: {
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'absolute',
    bottom: 20,
    right: 20,
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
  logoutbutton: {
    backgroundColor: 'blue',
    padding: 6,
    borderRadius: 8,
    marginTop: 8,
  },
  logoutbuttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
  shoppingcarttitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  shoppingcartgradient: {
    flex: 1,
  },
  shoppingcartcontainer: {
    flex: 1,
  },
  cartItemsContainer: {
    paddingHorizontal: 16,
  },
  cartItem: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  itemCategory: {
    fontSize: 14,
    color: 'white',
  },
  itemPrice: {
    fontSize: 16,
    color: 'white',
    marginTop: 4,
  },
  itemQuantity: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: 'dodgerblue',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  checkoutButtonText: {
    fontSize: 16,
    color: 'white',
  },
  checkoutcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  checkouttitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  checkoutinputContainer: {
    marginBottom: 16,
  },
  checkoutlabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  checkoutinput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  checkoutbutton: {
    backgroundColor: '#6C3483',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 32,
  },
  checkoutbuttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  // ... any other styles you want to share across screens
});

export default styles;
