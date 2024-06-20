import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../screens/DashboardScreen';
import Join from '../screens/JoiningRoomScreen';
import Make from '../screens/MakingRoomScreen';
import Game from '../screens/GameScreen';

const Stack = createStackNavigator();

function UserStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Make" component={Make} />
                <Stack.Screen name="Join" component={Join} />
                <Stack.Screen name="Game" component={Game} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default UserStack;
