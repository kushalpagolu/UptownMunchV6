# UptownMunchV6
A food ordering app with end to end functionality on web and mobile.

UptownMunch is a cross-platform React Native application built using Expo CLI. This application food ordering app. In this readme, you'll find instructions on how to set up and run the project, as well as guidance for creating your own React Native app using the same steps.

This is a React Native app that demonstrates the use of different components and features. The app has two screens: a home screen and a detail screen.

**Prerequisites**

To run this project, you'll need the following tools installed on your machine:

**Node.js** (v12 or newer) - Download Node.js

**Expo CLI** - Install using npm install -g expo-cli or yarn global add expo-cli

**A code editor** (e.g., Visual Studio Code, Atom, or Sublime Text)

**Install watchman**


Clone the repository to your local machine if you want to start with this code as your starting point.

```
git clone https://github.com/yourusername/your-repo.git

```

In order to build a cross-platform application using the latest React Native programming that targets Web, iOS, and Android platforms, you can use Expo with React Native for the web. 

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
expo install react-native-web
```

## Modify the app.json file

Open the project in Visual Studio Code and modify the app.json file to include a web-specific configuration:

```json
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

- # you can open iOS, Android, or web from here, or run them directly with the commands below.
```
- yarn android
- yarn ios
- yarn web
These commands will open a new window in your default web browser, showing the Expo DevTools. You can now test your application on iOS, Android, and web platforms.

```

## Connect to the Firebase backend

To use Firebase in your application, first install the required packages:

```
expo install firebase
```

## Additional Commands

```
yarn add react-native-gesture-handler
```

```
react-native link react-native-gesture-handler //only use if the code does not work as expected.
```

```
yarn add react-native-safe-area-context
```

```
react-native link react-native-safe-area-context //only use if the code does not work as expected.
```



```
yarn add @expo/vector-icons
```

```
yarn add expo-linear-gradient
```



```
yarn start --clear-cache
```

```
yarn start
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
npm install @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated react-native-screens
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

The **react-native-gesture-handler** library is designed primarily for mobile platforms like iOS and Android, and it might not work perfectly on the web platform out of the box. To have a consistent experience across mobile and web platforms, you can use the **react-native-web-swiper** library, which is designed to work with React Native for Web.

You can install the react-native-web-swiper library by running:

```
yarn add react-native-web-swiper

```

or

```
npm install react-native-web-swiper

```

```

yarn add react-native-gesture-handler // careful with dependenies.

```


**Project Structure **

Here's a brief overview of the key files in this project:

**package.json** - Contains the project's metadata, dependencies, and scripts.

**app.json** - Contains the app configuration, such as the display name, icons, and splash screen.

**firebase.json** - Contains the Firebase configuration for integrating Firebase services like Firestore or Firebase Authentication.

**App.js** - The main entry point of your app, where the main app component is defined and rendered.


**App.js** 

The **App.js** file defines a stack navigator (HomeStack) and a bottom tab navigator (TabNavigator). It also defines a switch navigator (**AppNavigator**) that switches between the **AuthBottomTabNavigator** and **TabNavigator** based on the initial route name (initialRouteName: 'Auth').


_**Note: Assuming that all the other dependencies and screens are correctly implemented, your navigation should work as intended.**_

The app has several screens/components, including a Welcome screen, Food Categories screen, Food Items screen, Food List screen, Shopping Cart screen, Checkout screen, Order History screen, Order Confirmation screen, User Profile screen, Catering Services screen, Food Item Details screen, Signup screen, and Login screen.


The App component renders the navigation structure of the app. If the user is not logged in, it renders an **AuthStack.Navigator** with a **AuthTabNavigator** component that contains LoginScreen and SignupScreen screens. Otherwise, it renders a **HomeStackScreen** component that contains a HomeTabs component that displays the main screens of the app.
Authentication: When a user is not logged in (isLoggedIn state is false), app directs them to the authentication stack (AuthStack), which consists of the Login and Signup screens. Once logged in, isLoggedIn state changes to true and the user is directed to the main app screens.

Main App Screens: These screens become available after a successful login. They include a home screen (WelcomeScreen), a profile screen (UserProfileScreen), a food items screen (FoodItems), an order history screen (OrderHistoryScreen), a food categories screen (FoodCategoriesScreen), and a shopping cart screen (ShoppingCartScreen). These screens are organized into a tab navigation format, which means users can switch between them by tapping on the corresponding tab icon.

The **HomeTabs** component uses the **createBottomTabNavigator** to render the bottom tab navigation bar. It has several screens with corresponding icons, such as the FoodCategoriesScreen screen with a food tray icon, and the Profile screen with a person icon. The ShoppingCart screen has a customized tab bar icon that is hidden, and its corresponding Checkout screen is accessible from the ShoppingCart screen.

The ShoppingCartScreen and CheckoutScreen screens have customized headers that include a logout button, and their navigation options include the ability to pass setIsLoggedIn function to log out the user.

The file also includes the ShoppingCartStackScreen component that contains ShoppingCartScreen and CheckoutScreen screens and has customized headers and navigation options.

Finally, the **AppContainer** wraps the **AppNavigator** component to enable navigation.



From your App.js file, I can see that your application is organized into several key sections. You are using react-navigation for handling navigation in your application and react-native for building your UI. You've also incorporated a variety of screens to handle different functionalities, including authentication, food item selection, shopping cart, and order history, among others. Here's a brief overview of your app's structure:




Shopping Cart: You've designed a separate navigation stack (ShoppingCartStack) for the shopping cart, which includes the ShoppingCartScreen and CheckoutScreen.

Logout: You've placed a logout button on every screen which sets isLoggedIn to false and returns the user to the login screen.
