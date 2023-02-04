import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import navigation from '@react-navigation/native';



const TitleScreen = ({ navigation }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
      <Text>Home Screen: this will contain the Login</Text>
    </View>
  );


export default TitleScreen;
