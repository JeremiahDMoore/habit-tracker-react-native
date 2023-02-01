import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Button = ({ text, onPress, toScreen }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
        style={styles.button} 
        onPress={() => {
            onPress();
            navigation.navigate(toScreen);
        }}
        >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Button;
