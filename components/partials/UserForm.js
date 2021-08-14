import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

import { userValidation, isFormValid, isFieldValid } from '../../lib/validation';

import { SettingsContext } from '../context/SettingsContext';
import InputText from './InputText';

const UserForm = ({ navigation, setAddUser }) => {
  const { settings: { users }, setSettings } =  useContext(SettingsContext);
  const [name, setName] = useState('');
  const [boid, setBOID] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = { name, boid };
    if (isFormValid(params, userValidation, errors, setErrors)) {
      // create to db
      console.log('saving to db ...');
      setSettings({ users: [ ...users, { name, boid }]});
      setAddUser(false);
    }
  };

  const handleChange = (field, value) => isFieldValid(field, value, userValidation, errors, setErrors);

  return (
    <View>
      <Text style={styles.heading}>Add Details</Text>
      <InputText
        key='name'
        onChange={(event) => handleChange('name', event.target.value)}
        onChangeText={(val) => setName(val)}
        placeholder='Name'
        value={name}
        error={errors.name}/>
      <InputText
        key='boid'
        onChange={(event) => handleChange('boid', event.target.value)}
        onChangeText={(val) => setBOID(val)}
        placeholder='BOID'
        value={boid}
        error={errors.boid}/>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setAddUser(false)} style={styles.cancelButton}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Button
          onPress={handleSubmit}
          title="Submit"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    height: 48,
    marginTop: 16,
    marginBottom: 8,
    padding: 8,
    flex: 1,
  },
  inputError: {
    borderColor: "red",
  },
  buttonContainer: {
    width: '100%',
    height: '30%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: "row",
  },
  cancelButton: {
    textTransform: 'uppercase',
    backgroundColor: '#e0e0e0',
    padding: 8,
  },
  cancel: {
    backgroundColor: "#e0e0e0",
  },
  error: {
    color: 'red',
  }
});

export default UserForm
