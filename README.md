## iPhone Demo


https://github.com/kushalpagolu/UptownMunchV6/assets/61297615/1c11ed43-516e-4c88-8a20-ec55a73594d6



# UptownMunchV6
A food ordering app with end to end functionality on web and mobile.

UptownMunch is a cross-platform React Native application built using Expo CLI. This application is a food ordering app. In this readme, you'll find instructions on how to set up and run the project, as well as guidance for creating your own React Native app using the same steps.

This is a React Native app that demonstrates the use of different components and features.

**Prerequisites**

To run this project, you'll need the following tools installed on your machine:

**Node.js** (v12 or newer) - Download Node.js. I installed the LST version from the website.

**Expo CLI** - Install using npm install -g expo-cli or yarn global add expo-cli. Try to use _**yarn**_ because npm might cause so many dependency errors, you might end up loosing interest.

**A code editor** (e.g., Visual Studio Code, Atom, or Sublime Text) - I am using VSCode for the extensions.

**Install watchman**


Clone the repository to your local machine if you want to start with this code as your starting point.

```
git clone https://github.com/yourusername/your-repo.git

```

Then navigate to the root folder of the app.


```
cd UptownMunchV6
```

### If you want to start with your own fresh application, please follow the below steps.

In order to build a cross-platform application using the latest React Native programming that targets Web, iOS, and Android platforms, you can use **Expo** with React Native for the web. 

Steps to set up your development environment on your MacBook with the M2 chip, running on zsh shell:

## Install Expo CLI

First, install Expo CLI globally using yarn:

```
yarn global add expo-cli
```

## Create a New Expo project

Create a new project using Expo CLI:

```
expo init YourProjectName
```

Select a template from the options provided. For your requirement, choose "tabs (TypeScript)" or "tabs (JavaScript)". Select a **blank template** for convenience.

Change the working directory to your new project:

```
cd YourProjectName

```

## Add React Native for the web

Install React Native for the web using yarn:

```
yarn add react-native-web

```

## Modify the app.json file

Open the project in Visual Studio Code or any IDE you prefer and modify the app.json file to include a web-specific configuration:

```

{
  "expo": {
    ...
    "platforms": ["ios", "android", "web"],
    ...
  }
}

```

## Start the development server

Start the development server for your application:

```
expo start
```
or 

```
yarn start 

```

## You can open iOS, Android, or web from following the instructions (type i or a or w), or run them directly with the commands below.

```
- yarn android
- yarn ios
- yarn web

// These commands will open a new window in your default web browser, showing the Expo DevTools. You can now test your application on iOS, Android, and web platforms.

```

## Connect to the Firebase backend

To use Firebase in your application, first install the required packages:

```
expo install firebase
```
or

```
yarn add firebase

```

## Additional Commands



```
react-native link react-native-gesture-handler //only use if the code does not work as expected.

```


```
react-native link react-native-safe-area-context //only use if the code does not work as expected.
```


```
yarn start --clear-cache
```


```
yarn add @babel/core@^7.20.0
yarn add @expo/vector-icons@^13.0.0
yarn add expo@~48.0.15
yarn add expo-linear-gradient@^12.1.2
yarn add expo-status-bar@~1.4.4
yarn add firebase@^9.21.0
yarn add react@18.2.0
yarn add react-dom@18.2.0
yarn add react-native@0.71.7
yarn add react-native-elements@^3.4.3
yarn add react-native-gesture-handler@~2.9.0
yarn add react-native-web@~0.18.10
yarn add react-native-gesture-handler

//you can find all the modules needed in package.json

```



To install @react-navigation/native package, you can use the following command:

```
yarn add @react-navigation/native
```

After that, you also need to install the required dependencies for the navigation library by running the following command:

```
expo install react-native-screens react-native-safe-area-context

```

Finally, you need to link the native modules by running the following command:

```
npx pod-install ios
```

Note: make sure to remove the import statements for the react-navigation packages in your code and replace them with the appropriate imports from @react-navigation/native.

Run this command for syncing up the packages.

```
watchman watch-del '/Users/Name/Desktop/XcodeApps/UptownMunch' ; watchman watch-project '/Users/Name/Desktop/XcodeApps/UptownMunch'
```

```
yarn add @react-native-community/masked-view@0.1.11 @react-navigation/native@6.1.6 @react-navigation/stack@6.3.16
```

```
yarn add @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated react-native-screens
```

***Note:*** react-native-web@0.19.4 - expected version: react-native-web@0.18.10 for working well with navigation v6 on web and mobile.

```
npx expo-env-info
```

To check the dependencies of packages

```
depcheck
```

To remove packages example the react-navigation packages using yarn, you can use the following command in your terminal:

```
yarn remove react-navigation react-navigation-stack react-navigation-tabs
```



**Project Structure **

Here's a brief overview of the key files in this project:

**package.json** - Contains the project's metadata, dependencies, and scripts.

**app.json** - Contains the app configuration, such as the display name, icons, and splash screen.

**firebase.json** - Contains the Firebase configuration for integrating Firebase services like Firestore or Firebase Authentication.

**App.js** - The main entry point of your app, where the main app component is defined and rendered.

The **App.js** file defines a stack navigator (HomeStack) and a bottom tab navigator (AuthTabNavigator). **NavigationContainer** also defines navigation that switches between the **AuthBottomTabNavigator** and **HomeStack** based on the initial state of the **isLoggedIn** which is set to 'false'.

App.js file is used to create a shopping cart context with React. The context is used to share the shopping cart's state and various functions that manipulate it (like addToCart, removeFromCart, handleUpdateCart, and clearCart) across the entire application, which is a great way to manage global state.

This context is provided to all child components within the CartContext.Provider. This includes the entire application because the provider is wrapping your NavigationContainer.


The ***addToCart*** function checks if the item already exists in the cart. If it does, it increments the quantity of the item, and if it doesn't, it adds a new item to the cart with a quantity of 1.

The ***removeFromCart*** function decreases the quantity of an item in the cart by 1. If the quantity of the item reaches 0, it removes the item from the cart.

The ***clearCart*** function simply clears all items from the cart.

The ***handleUpdateCart*** function is used to directly set the shopping cart with a new cart.

_**Note: Assuming that all the other dependencies are correctly installed, navigation should work as intended.**_

The app has several screens/components, including a Welcome screen, Food Categories screen, Food Items screen, Food List screen, Shopping Cart screen, Checkout screen, Order History screen, Order Confirmation screen, User Profile screen, Catering Services screen, Food Item Details screen, Signup screen, and Login screen.

The App component renders the navigation structure of the app. If the user is not logged in, it renders a **NavigationContainer** with a **AuthTabNavigator** component that contains **LoginScreen** and **SignupScreen** screens. Otherwise, it renders a **HomeStackScreen** component that contains a **HomeTabs** component that displays the main screens of the app. The **isLoggedIn** state is used to switch between AuthTabNavigator and HomeStackScreen, which are authentication (login/register) screens and main app screens, respectively.


**Authentication:** When a user is not logged in (isLoggedIn state is false), app directs them to the authentication stack (AuthTabNavigator), which consists of the Login and Signup screens. Once logged in, isLoggedIn state changes to true and the user is directed to the main app screens.

_**Home App Screens:**_ These screens become available after a successful login. They include a welcome screen (WelcomeScreen), a profile screen (UserProfileScreen), a food items screen (FoodItems), an order history screen (OrderHistoryScreen), a food categories screen (FoodCategoriesScreen), and a shopping cart screen (ShoppingCartScreen). These screens are organized into a tab navigation format, which means you can switch between them by tapping on the corresponding tab icon.

The **HomeTabs** component uses the **createBottomTabNavigator** to render the bottom tab navigation bar. It has icons, such as the FoodCategoriesScreen screen with a food tray icon, and the Profile screen with a person icon. The ShoppingCart screen has a customized tab bar icon that is hidden, and its corresponding Checkout screen is accessible from the ShoppingCart screen.

Most of the screens have customized headers that include a **shopping cart icon** which can navigate to the Cart at any point and a **logout button**, and their navigation options include the ability to pass setIsLoggedIn function to log out the user.

The file also includes the ShoppingCartStackScreen component that contains ShoppingCartScreen and CheckoutScreen screens and has customized headers and navigation options.

Finally, the **AppContainer** wraps the **AppNavigator** component to enable navigation.


## Demo Video


https://github.com/kushalpagolu/UptownMunchV6/assets/61297615/d710c5b3-0733-445c-9998-b171652c4ecb


## Android Demo

***Note: The navigation looks bad in this demo as the webm compression did not work out as expected.***

[android_demo.webm](https://github.com/kushalpagolu/UptownMunchV6/assets/61297615/52128e0c-a145-44a6-a37b-2cf2a03a37cf)


## Future Enhancements.

1. Making the Linear Gradient consistent across the screens in the app.
2. Add functionality for favorite button.
3. Improve navigation and try to eliminate the warnings related to "Non-serializable values were found in the navigation state".



eas build --profile development --platform android

npx expo start --dev-client


eas build --profile development-simulator --platform ios
