<pre>
```
In order to build a cross-platform application using the latest React Native programming that targets Web, iOS, and Android platforms, you can use Expo with React Native for the web. Here are the steps to set up your development environment on your MacBook with the M2 chip, running the zsh shell:

## Install Expo CLI

First, install Expo CLI globally using yarn:

```bash
yarn global add expo-cli
```

## Create a new Expo project

Create a new project using Expo CLI:

```bash
expo init YourProjectName
```

Select a template from the options provided. For your requirement, choose "tabs (TypeScript)" or "tabs (JavaScript)".

Change the working directory to your new project:

```bash
cd YourProjectName
```

## Add React Native for the web

Install React Native for the web using yarn:

```bash
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

```bash
expo start
```

This command will open a new window in your default web browser, showing the Expo DevTools. You can now test your application on iOS, Android, and web platforms.

## Connect to the Firebase backend

To use Firebase in your application, first install the required packages:

```bash
expo install firebase
```

## Additional Commands

```bash
yarn add react-native-gesture-handler
```

```bash
react-native link react-native-gesture-handler
```

```bash
yarn add react-native-safe-area-context
```

```bash
react-native link react-native-safe-area-context
```

```bash
yarn add react-navigation-tabs
```

```bash
yarn add @expo/vector-icons
```

```bash
yarn add expo-linear-gradient
```

```bash
yarn add react-native-reanimated@~2.14.4
```

```bash
yarn start --clear-cache
```

```bash
yarn start
```

```bash
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
```


App.js file defines a stack navigator (HomeStack) and a bottom tab navigator (TabNavigator). It also defines a switch navigator (AppNavigator) that switches between the AuthBottomTabNavigator and TabNavigator based on the initial route name (initialRouteName: 'Auth').

Finally, the AppContainer wraps the AppNavigator component to enable navigation.

Assuming that all the other dependencies and screens are correctly implemented, your navigation should work as intended.

To remove the react-navigation packages using yarn, you can use the following command in your terminal:

```bash
yarn remove react-navigation react-navigation-stack react-navigation-tabs
```

To install @react-navigation/native package, you can use the following command:

```bash
yarn add @react-navigation/native
```

After that, you also need to install the required dependencies for the navigation library by running the following command:

```bash
expo install react-native-screens react-native-safe-area-context
```

Finally, you need to link the native modules by running the following command:

```bash
npx pod-install ios
```

Note: make sure to remove the import statements for the react-navigation packages in your code and replace them with the appropriate imports from @react-navigation/native.

```bash
watchman watch-del '/Users/kushalpagolu/Desktop/XcodeApps/UptownMunch' ; watchman watch-project '/Users/kushalpagolu/Desktop/XcodeApps/UptownMunch'
```

```bash
yarn add @react-native-community/masked-view@0.1.11 @react-navigation/native@6.1.6 @react-navigation/stack@6.3.16
```

```bash
npm install @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated react-native-screens
```

react-native-web@0.19.4 - expected version: react-native-web@0.18.10

```bash
npx expo-env-info
```

```bash
depcheck
```

```bash
watchman watch-del '/Users/kushalpagolu/Desktop/ExpoApps/UptownMunch' ; watchman watch-project '/Users/kushalpagolu/Desktop/ExpoApps/UptownMunch'
```
```
</pre>

great, can you give me code to fetch cateringServices collection from my firebase and modify the code to display the cateringItems which have the fields categoryName, itemName, image_url, description, price and weight fields from cateringServices collection. Use three column grids to display the items and make them scrollable with Animation and add LinearGradient to the screen. Here is my firebase.js setup
