import React, { useContext, useState, useEffect } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { SettingsContext } from '../context/SettingsContext';
import { fetchCompanies, checkResult } from '../../lib/utils';

import { checkValidation, isFormValid } from '../../lib/validation';

import { fetchUsers } from '../../lib/database';

const Home = ({ navigation }) => {
  const { settings: { users, companies }, setSettings } = useContext(SettingsContext);
  const [companyShareId, setCompanyShareId] = useState('');
  const [boid, setBOID] = useState('');
  const [message, setMessage] = useState('');
  const [loadingCompanies, setLoadingCompanies] = useState('Loading...');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCompanies((companies) => {
      if(companies.length){
        setSettings({ companies });
        const lastCompany = companies[companies.length - 1];
        setCompanyShareId(lastCompany.id);
      } else {
        setLoadingCompanies('No companies found, server busy. Try again later');
      }
    });
    fetchUsers((users) => {
      setSettings({ users });
      if(users.length){
        setBOID(users[0].boid);
      }
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = { companyShareId, boid };
    if (isFormValid(params, checkValidation, errors, setErrors)) {
      setMessage('Checking...')
      checkResult(JSON.stringify({companyShareId, boid}), (msg) => {
        setMessage(msg);
      });
    } else {
      setMessage('Noting...')
    }
  };

  return (
    <View style={styles.container}>
      {companies.length ? (
        <Picker
          onChange={() => {if (message !== '') setMessage('')}}
          selectedValue={companyShareId}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setCompanyShareId(itemValue)
            if (message !== '') setMessage('')
          }}
        >
          {companies.map(company => (<Picker.Item key={company.id} label={company.name} value={company.id}/>))}
        </Picker>
      ) : (<Text>{loadingCompanies}</Text>)}
      {errors.companyShareId && (
        <View style={styles.flexRow}>
          <Text style={styles.error}>
            {errors.companyShareId}
          </Text>
        </View>
      )}
      {users.length ? (
        <Picker
          selectedValue={boid}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setBOID(itemValue)
            if (message !== '') setMessage('')
          }}
        >
          {users.map(user => (<Picker.Item key={user.id} label={user.name} value={user.boid}/>))}
        </Picker>
      ) : (<Text>No users found, create users from <Text style={styles.link} onPress={() => navigation.navigate('Settings')}>here</Text></Text>)}
      {errors.companyShareId && (
        <View style={styles.flexRow}>
          <Text style={styles.error}>
            {errors.companyShareId}
          </Text>
        </View>
      )}
      
      {errors.boid && (
        <View style={styles.flexRow}>
          <Text style={styles.error}>
            {errors.boid}
          </Text>
        </View>
      )}
      <View style={styles.submit}>
        <Button
          onPress={handleSubmit}
          title="Check the result"
        />
      </View>
      { message !== '' && (
        <View style={styles.result}>
          <Text>{message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    margin: 20,
  },
  submit: {
    margin: 20
  },
  result: {
    marginTop: 50
  },
  flexRow: {
    flexDirection: "row",
  },
  error: {
    color: 'red',
  },
  link: {
    textDecorationLine: 'underline',
  }
});

export default Home;
