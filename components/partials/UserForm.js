import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";

import { userValidation, isFormValid, isFieldValid } from '../../lib/validation';

import { SettingsContext } from '../context/SettingsContext';
import InputText from './InputText';

import { createUserOnDB, updateUserOnDB } from '../../lib/database';

const UserForm = ({ editUser, resetForm }) => {
  const { settings: { users }, setSettings } =  useContext(SettingsContext);
  const [name, setName] = useState('');
  const [boid, setBOID] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(editUser) {
      const user = users.find(u => u.id === editUser);
      setName(user.name);
      setBOID(user.boid.toString());
    }
  }, [editUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = { name, boid };
    if (isFormValid(params, userValidation, errors, setErrors)) {
      if(editUser) {
        const updatedUsers = [ ...users ];
        const userIndex = updatedUsers.findIndex(u => u.id === editUser);
        updatedUsers[userIndex] = { id: editUser, name, boid};
        updateUserOnDB(
          editUser, name, boid,
          () => {
            setSettings({ users: updatedUsers });
            resetForm();
          },
          (error) => setErrors({ message: error})
        );
      } else {
        createUserOnDB(
          name, boid,
          (id) => {
            setSettings({ users: [ ...users, { id, name, boid }] });
            resetForm();
          },
          (error) => setErrors({ message: error})
        );
      }
    }
  };

  const handleChange = (field, value) => {
    isFieldValid(field, value, userValidation, errors, setErrors);
    if(errors.message){
      setErrors(oldErrors => {
        const newErrors = {...oldErrors};
        delete newErrors.message;
        return newErrors;
      });
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Add Details</Text>
      <InputText
        key='name'
        onChangeText={(val) => {
          handleChange('name', val)
          setName(val)
        }}
        placeholder='Name'
        value={name}
        error={errors.name}/>
      <InputText
        key='boid'
        onChangeText={(val) => {
          handleChange('boid', val)
          setBOID(val)
        }}
        placeholder='BOID'
        value={boid}
        error={errors.boid}
        maxLength={16}/>
      {errors.message && (
        <View style={styles.errorRow}>
          <Text style={styles.error}>
            {errors.message}
          </Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={resetForm} style={styles.cancelButton}>
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
  errorRow: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: "row",
  },
  error: {
    margin: 'auto',
    alignItems: 'center',
    color: 'red',
  }
});

export default UserForm
