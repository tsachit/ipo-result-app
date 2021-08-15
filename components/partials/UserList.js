import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import { deleteUserOnDB } from '../../lib/database';

import { SettingsContext } from '../context/SettingsContext';
const UserList = ({setEditUser}) => {
  const { settings: { users }, setSettings } = useContext(SettingsContext);

  const confirmDelete = (id) => {
    // delete in db
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete it?',
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          const updatedUsers = [ ...users ];
          const userIndex = updatedUsers.findIndex(u => u.id === id);

          updatedUsers.splice(userIndex, 1);
          deleteUserOnDB(id,
            () => {
              setSettings({ users: updatedUsers });
            },
            (error) => setErrors({ message: error})
          );
        } }
      ]
    );
  };


  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.heading}>Accounts</Text>
      {users.map(({ id, name, boid }) => (
        <View style={styles.row} key={id}>
          <View>
            <Text style={styles.detail}>Name: {name}</Text>
            <Text style={styles.detail}>BOID: {boid}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => setEditUser(id)} style={styles.button}>
              <Text><FontAwesomeIcon icon={ faPencilAlt } color='#2196f3' /></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmDelete(id)} style={styles.button}>
              <Text><FontAwesomeIcon icon={ faTrash } color='red' /></Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  detail: {
    color: "#000",
    fontSize: 17,
  },
  actions: {
    flexDirection: "row",
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  button: {
    marginLeft: 20,
    color: 'green'
  },
  edit: {
    backgroundColor: 'green'
  },
  delete: {
    color: 'red'
  },
});

export default UserList
