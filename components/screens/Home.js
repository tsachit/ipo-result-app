import React, { useContext, useState, useEffect } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { SettingsContext } from '../context/SettingsContext';
import { fetchCompanies, checkResult } from '../../lib/utils';

import { fetchUsers } from '../../lib/database';

const Results = ({ data }) => {
  return (
    <>
      { data.map(datum => (
        <View style={styles.resultRow}>
          <Text style={styles.resultText}>{datum.name}: {datum.boid}</Text>
          <Text style={styles.resultText}>{datum.message}</Text>
        </View>
      )) }
    </>
  );
}

const Home = ({ navigation }) => {
  const { settings: { users, companies }, setSettings } = useContext(SettingsContext);
  const [companyShareId, setCompanyShareId] = useState('');
  const [result, setResult] = useState('');
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
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setResult('Checking...');
    checkResult(companyShareId, users, setResult);
  };

  return (
    <View style={styles.container}>
      {companies.length ? (
        <Picker
          onChange={() => {if (result !== '') setResult('')}}
          selectedValue={companyShareId}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setCompanyShareId(itemValue)
            if (result !== '') setResult('')
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
        <View style={styles.submit}>
          <Button
            onPress={handleSubmit}
            title="Check the result"
          />
        </View>
      ) : (
        <Text style={styles.not_found}>
          No accounts found, create users from <Text style={styles.link} onPress={() => navigation.navigate('Settings')}>here</Text>
        </Text>
      )}
      <View style={styles.resultContainer}>
        {typeof result === 'object' ? <Results data={result}/> : <Text>{result}</Text>}
      </View>
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
  resultContainer: {
    marginTop: 100,
  },
  resultRow: {
    marginBottom: 30,
  },
  resultText: {
    fontSize: 18,
  },
  flexRow: {
    flexDirection: "row",
  },
  error: {
    color: 'red',
  },
  not_found: {
    fontSize: 18,
  },
  link: {
    textDecorationLine: 'underline',
  },
});

export default Home;
