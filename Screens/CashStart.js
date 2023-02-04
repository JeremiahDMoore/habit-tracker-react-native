import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native';

const CashStart = () => {
  const navigation = useNavigation();
  const [pokerRoom, setPokerRoom] = useState('');
  const [stakes, setStakes] = useState('');
  const [profit, setProfit] = useState('');

  const handleSubmit = () => {
    firebase.firestore().collection('cashGameSessions').add({
      pokerRoom,
      stakes,
      profit: Number(profit),
      date: new Date(),      
    });
    navigation.navigate('Cash');
  };

  return (
    <View style={styles.container}>
      <Text>Enter the poker room name</Text>
      <TextInput
        style={styles.input}
        value={pokerRoom}
        onChangeText={setPokerRoom}
        placeholder="Enter the poker room name"
      />
      <Text>Enter the stakes</Text>
      <TextInput
        style={styles.input}
        value={stakes}
        onChangeText={setStakes}
        placeholder="Enter the stakes"
      />
      <Text>Enter the money in</Text>
      <TextInput
        style={styles.input}
        value={profit}
        type="number"
        onChangeText={setProfit}
        placeholder="Enter the money in"
        
      />
      <Button
        title="Submit"
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

export default CashStart;
