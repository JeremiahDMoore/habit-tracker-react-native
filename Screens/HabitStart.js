import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Button } from 'react-native';
import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native';
// import Button from '../assets/Button';

const HabitStart = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [progress, setProgress] = useState('');
  const [target, setTarget] = useState('');

  const handleSubmit = () => {
    firebase.firestore().collection('habits').add({
      name,
      progress,
      startTime: new Date(),  
      target: Number(target),
    });
    navigation.navigate('home');
    console.log('Habit added');
  };

  return (
    <View style={styles.container}>
      <Text>Enter the poker room name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter the poker room name"
      />
      <Text>Enter the stakes</Text>
      <TextInput
        style={styles.input}
        value={progress}
        onChangeText={setProgress}
        placeholder="Enter the stakes"
      />
      <Text>Enter the money in</Text>
      <TextInput
        style={styles.input}
        value={target}
        type="number"
        onChangeText={setTarget}
        placeholder="Enter the money in"
        
      />
      <Button
        title="Start Session"
        onPress={handleSubmit}        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

export default HabitStart;
