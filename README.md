# UptownMunchV6
A food ordering app with end to end functionality on web and mobile.


In order to build a cross-platform application using the latest React Native programming that targets Web, iOS, and Android platforms, you can use Expo with React Native for the web. 

Steps to set up your development environment on your MacBook with the M2 chip, running on zsh shell:

## Install Expo CLI

First, install Expo CLI globally using yarn:

```
yarn global add expo-cli
```

## Create a new Expo project

Create a new project using Expo CLI:

```
expo init YourProjectName
```

Select a template from the options provided. For your requirement, choose "tabs (TypeScript)" or "tabs (JavaScript)".

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

This command will open a new window in your default web browser, showing the Expo DevTools. You can now test your application on iOS, Android, and web platforms.

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
react-native link react-native-gesture-handler
```

```
yarn add react-native-safe-area-context
```

```
react-native link react-native-safe-area-context
```

```
yarn add react-navigation-tabs
```

```
yarn add @expo/vector-icons
```

```
yarn add expo-linear-gradient
```

```
yarn add react-native-reanimated@~2.14.4
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
yarn add react-native-reanimated@~3.1.0
yarn add react-native-safe-area-context@4.5.0
yarn add react-native-screens@~3.20.0
yarn add react-native-web@~0.18.10
yarn add react-navigation@^4.4.4
yarn add react-navigation-stack@^2.10.4
yarn add react-navigation-tabs@^2.11.2
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


**App.js** file defines a stack navigator (HomeStack) and a bottom tab navigator (TabNavigator). It also defines a switch navigator (AppNavigator) that switches between the AuthBottomTabNavigator and TabNavigator based on the initial route name (initialRouteName: 'Auth').


Assuming that all the other dependencies and screens are correctly implemented, your navigation should work as intended.

The app has several screens/components, including a Welcome screen, Food Categories screen, Food Items screen, Food List screen, Shopping Cart screen, Checkout screen, Order History screen, Order Confirmation screen, User Profile screen, Catering Services screen, Food Item Details screen, Signup screen, and Login screen.


The App component renders the navigation structure of the app. If the user is not logged in, it renders an **AuthStack.Navigator** with a **AuthTabNavigator** component that contains LoginScreen and SignupScreen screens. Otherwise, it renders a **HomeStackScreen** component that contains a HomeTabs component that displays the main screens of the app.


The **HomeTabs** component uses the createBottomTabNavigator to render the bottom tab navigation bar. It has several screens with corresponding icons, such as the FoodCategoriesScreen screen with a food tray icon, and the Profile screen with a person icon. The ShoppingCart screen has a customized tab bar icon that is hidden, and its corresponding Checkout screen is accessible from the ShoppingCart screen.

The ShoppingCartScreen and CheckoutScreen screens have customized headers that include a logout button, and their navigation options include the ability to pass setIsLoggedIn function to log out the user.

The file also includes the ShoppingCartStackScreen component that contains ShoppingCartScreen and CheckoutScreen screens and has customized headers and navigation options.

Finally, the AppContainer wraps the AppNavigator component to enable navigation.


The **react-native-gesture-handler** library is designed primarily for mobile platforms like iOS and Android, and it might not work perfectly on the web platform out of the box. To have a consistent experience across mobile and web platforms, you can use the **react-native-web-swiper** library, which is designed to work with React Native for Web.

You can install the react-native-web-swiper library by running:

'''
yarn add react-native-web-swiper

'''

or

'''
npm install react-native-web-swiper

'''

yarn add react-native-gesture-handler // careful with dependenies.
