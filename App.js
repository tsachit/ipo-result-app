import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faCogs } from '@fortawesome/free-solid-svg-icons';

import { SettingsProvider } from './components/context/SettingsContext';

import Home from './components/screens/Home';
import Settings from './components/screens/Settings';

const Tab = createBottomTabNavigator();
const defaultOptions = {
  headerStyle: {
    backgroundColor: '#2196f3',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

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
            <Tab.Navigator 
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName = faHome;
                  if (route.name === 'Settings') {
                    iconName = faCogs;
                  }
                  // You can return any component that you like here!
                  return <FontAwesomeIcon icon={iconName} color={color} />
                }
              })}>
              <Tab.Screen name="Home" component={Home} options={defaultOptions}/>
              <Tab.Screen name="Settings" component={Settings} options={defaultOptions}/>
            </Tab.Navigator>
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
