import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";

import TitleScreen from './Screens/TitleScreen';
import CashScreen from './Screens/CashScreen';
import TournamentScreen from './Screens/TournamentScreen';
import CashStart from './Screens/CashStart';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator ();
const RootStack = createStackNavigator();


function MainStackNavigator() {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false
    }}>
      <Stack.Screen name="CashStart" component={CashStart} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return(
    <Tab.Navigator 
    initialRouteName="Home"
    screenOptions={{
      activeTintColor: '#e91e63',
      headerShown: false
    }}
    >
    <Tab.Screen 
      name="Home" 
      component={TitleScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }} 
      />
    <Tab.Screen 
      name="Cash" 
      component={CashScreen} 
      options={{
        tabBarLabel: 'Cash',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cash" color={color} size={size} />
        ),
      }}
      />
     
    <Tab.Screen 
      name="Tournaments" 
      component={TournamentScreen} 
      options={{
        tabBarLabel: 'Tournaments',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="trophy" color={color} size={size} />
        ),
      }}
      />
  
  </Tab.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
      <RootStack.Screen 
        name="Cash Games" 
        component={TabNavigator}  
        options={{ headerShown: false }} />
      <RootStack.Screen 
        name="Hidden" 
        component={MainStackNavigator}         
        />
    </RootStack.Navigator> 
    </NavigationContainer>
  );
}

export default App;
