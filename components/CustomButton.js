import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import {  white, darkGray, gray } from '../utils/colors';

 /* Because through the app i was going to use many button, I created a component to reuse it, changing only it's style */

export default function CustomButton({ children, onPress, buttonStyle = {}, textStyle = {}, disabled = false}) {
 
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={onPress}>
        <Text
          style={[
            styles.buttonText,
            textStyle
          ]}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center'
  },
  button: {
    marginBottom: 5,
    width: 300,
    height: 65,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#999',
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 6,
    },
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: gray,
    borderColor: darkGray
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: white
  },
  buttonTextDisabled: {
    color: darkGray
  }
});

CustomButton.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object
};
