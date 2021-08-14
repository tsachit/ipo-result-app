import React, { useContext } from 'react';
import { Button, View } from 'react-native';

import { SettingsContext } from '../context/SettingsContext';

const Home = ({ navigation }) => {
  const { settings: { users } } = useContext(SettingsContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Settings')}
        title="Check the result"
      />
    </View>
  );
}

export default Home;
