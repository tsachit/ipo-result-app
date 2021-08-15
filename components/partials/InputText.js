import React from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";

const InputText = (props) => {
  const { onChange, onChangeText, placeholder, value, error } = props;
  return (
    <>
      <View style={styles.flexRow}>
        <TextInput
          {...props}
          onChange={onChange}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={error ? [styles.input, styles.inputError] : styles.input}
          value={value}
        />
      </View>
      {error && (
        <View style={styles.flexRow}>
          <Text style={styles.error}>
            {error}
          </Text>
        </View>
      )}
    </>
  )
};

const styles = StyleSheet.create({
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
  error: {
    color: 'red',
  }
});

export default InputText
