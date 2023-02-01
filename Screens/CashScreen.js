import React from 'react';
import { View, Text } from 'react-native';
import ProfitGraph from './ProfitGraph';
import Button from '../assets/Button';

    const CashScreen = () => {
        return (
        
        <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontSize: 32 }}>Cash Games</Text>
            <ProfitGraph />
            <Button 
                style={{ 
                    flex: 1, 
                    alignItems: 'center', 
                    marginTop: 0 
                }}
                onPress={() => console.log('Add Session')}
                toScreen='Hidden'
                text="Add Session"
            >Add Session</Button>
        </View>
        );
}
export default CashScreen;