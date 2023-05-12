import { View, Text, FlatList, StyleSheet, Platform, TouchableOpacity, Image, LayoutAnimation } from 'react-native';
import { useNavigation } from '@react-navigation/native';


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
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
    paddingHorizontal: Platform.OS === 'web' ? 4 : 16,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  swiperContainer: {
    flex: 1,
    marginBottom: 10,
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 100,
    height: '100%',
    paddingHorizontal: 20,
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    marginBottom: 12,
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
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 8,
    marginRight: 20,
  },
  gradientContainer: {
    flex: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginRight: 20,
    width: 300,
  },

  itemDetailsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cartItem: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetailsContainer: {
    flex: 1,
  },

  itemRemoveButton: {
    padding: 5,
  },

  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 20,
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
    color: 'white',
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
    marginBottom: 80,
    paddingBottom: 8,
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
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'center',  
    backgroundColor: 'dodgerblue',
    marginBottom: 16,
  },
  
  backButtonText: {
    fontSize: 16,
    color: 'white',
  },
  fooditemsscreencontainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  fooditemsscreentitle: {
    fontSize: 24,
    marginBottom: 16,
  },
  foodItemsContainer: {
    paddingBottom: 16,
    marginBottom: 26,

  },
  foodItemContainer: {
    flex: 1,
    //alignItems: 'stretch',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 5,
    margin: 5,
    paddingBottom: 50
  },
  foodItemImage: {
    width: '100%',
    height: 200,
  },
  foodItemOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  foodItemDetails: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  foodItemName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  foodItemCategory: {
    color: 'white',
    fontSize: 14,
    marginBottom: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemQuantity: {
    color: '#FFF',
    fontSize: 16,
    marginRight: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  favoriteIcon: {
    paddingHorizontal: 5,
  },
  icons: {
    paddingHorizontal: 5,
  },
  viewCartButton: {
    position: 'absolute',
    bottom: 66,
    right: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: 'dodgerblue',
    borderRadius: 8,
    paddingBottom: 8,
    marginBottom: 30,
  },
  viewCartButtonText: {
    fontSize: 16,
    color: 'white',
  },
  // ... any other styles you want to share across screens
});

export default styles;
