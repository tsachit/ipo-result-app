import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { SettingsProvider } from './components/context/SettingsContext';

import Home from './components/screens/Home';
import Settings from './components/screens/Settings';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <>
      {Platform.OS === 'web' ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.heading}>
            This app is not supported on web!
          </Text>
        </View>
      ) : (
        <SettingsProvider>
          <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="Settings" component={Settings} />
            </Drawer.Navigator>
          </NavigationContainer>
        </SettingsProvider>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default App;
