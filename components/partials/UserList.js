import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

import { SettingsContext } from '../context/SettingsContext';
const UserList = () => {
  const { settings: { users } } = useContext(SettingsContext);

  const handleEdit = () => {
    console.log('Edit');
  };

  const handleDelete = () => {
    console.log('Delete');
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>Accounts</Text>
      {users.map(({ name, boid }) => (
        <View style={styles.row} key={`${name}-${boid}`}>
          <View>
            <Text style={styles.detail}>Name: {name}</Text>
            <Text style={styles.detail}>BOID: {boid}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={handleEdit} style={styles.button}>
              <Text><FontAwesomeIcon icon={ faPencilAlt } color='#2196f3' /></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.button}>
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
  sectionHeading: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center'
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
