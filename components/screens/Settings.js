import React, { useContext, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { SettingsContext } from '../context/SettingsContext';
import UserForm from '../partials/UserForm';
import UserList from '../partials/UserList';

const Settings = ({ navigation }) => {
  const { settings: { users } } = useContext(SettingsContext);
  const [addUser, setAddUser] = useState(false);

  // useEffect(() => {

  // }, [addUser, users]);

  return (
    <View style={styles.container}>
      {addUser ? <UserForm navigation={navigation} setAddUser={setAddUser} /> : <UserList />}
      { !addUser && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setAddUser(true)}
          style={styles.touchableOpacityStyle}>
            <FontAwesomeIcon icon={ faPlus } color="#fff" />
          {/* <Image
            // FAB using TouchableOpacity with an image
            // For online image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            // For local image
            //source={require('./images/float-add-icon.png')}
            style={styles.floatingButtonStyle}
          /> */}
        </TouchableOpacity>
      )}
      
      {/* <ScrollView style={styles.listArea}>
        <Items
          key={`forceupdate-todo-${forceUpdateId}`}
          done={false}
          onPressItem={(id) => console.log(db, id, forceUpdate)}
        />
        <Items
          done
          key={`forceupdate-done-${forceUpdateId}`}
          onPressItem={(id) => console.log(db, id, forceUpdate)}
        />
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#2196f3',
    borderRadius: 50
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    color: 'red',
  },
});

export default Settings;
