import React, { useContext, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { SettingsContext } from '../context/SettingsContext';
import UserForm from '../partials/UserForm';
import UserList from '../partials/UserList';

const Settings = () => {
  const { settings: { users } } = useContext(SettingsContext);
  // take to user add form if there isn't any users
  const [addUser, setAddUser] = useState(users.length <= 0);
  const [editUser, setEditUser] = useState(null);

  const resetForm = () => {
    setAddUser(false);
    setEditUser(null);
  };

  const showForm = addUser || Boolean(editUser);

  return (
    <View style={styles.container}>
      {showForm ? (<UserForm editUser={editUser} resetForm={resetForm} />) : (
        <>
          <UserList setEditUser={setEditUser} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setAddUser(true)}
            style={styles.touchableOpacityStyle}>
            <FontAwesomeIcon icon={ faPlus } color="#fff" />
          </TouchableOpacity>
        </>
      )}
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
