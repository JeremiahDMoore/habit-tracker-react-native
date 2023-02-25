import React from 'react';
import { View, Text, Button } from 'react-native';
import HabitTracker from './HabitTracker';
import { useNavigation } from '@react-navigation/native';

// import Button from '../assets/Button';

    const CashScreen = () => {
        const navigation = useNavigation();

        return (
        
        <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontSize: 32 }}>Habits</Text>
            <HabitTracker />
            {/* <Button 
                style={{ 
                    flex: 1, 
                    alignItems: 'center', 
                    marginTop: 0 
                }}
                onPress={navigation.navigate('Hidden')}
                title="Add Session"
            >Add Session</Button> */}
        </View>
        );
}
export default CashScreen;