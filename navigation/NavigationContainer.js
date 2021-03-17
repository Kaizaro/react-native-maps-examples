import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';

import Example1Screen from './screens/Example1Screen';
import Example2Screen from './screens/Example2Screen';
import Example3Screen from './screens/Example3Screen';
import Example4Screen from './screens/example4/Example4';

import HomeWork1Screen from './screens/HomeWork1Screen';
import HomeWork2Screen from './screens/homework2/HomeWork2Screen';

const Stack = createStackNavigator();

const OPTIONS_DEFAULT = {
    gestureEnabled: false,
    cardOverlayEnabled: true,
    ...TransitionPresets.SlideFromRightIOS,
};

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                    name="Example1"
                    component={Example1Screen}
                    options={OPTIONS_DEFAULT}
                />
                <Stack.Screen
                    name="Example2"
                    component={Example2Screen}
                    options={OPTIONS_DEFAULT}
                />
                <Stack.Screen
                    name="Example3"
                    component={Example3Screen}
                    options={OPTIONS_DEFAULT}
                />
                <Stack.Screen
                    name="Example4"
                    component={Example4Screen}
                    options={OPTIONS_DEFAULT}
                />
                <Stack.Screen
                    name="HomeWork1"
                    component={HomeWork1Screen}
                    options={OPTIONS_DEFAULT}
                />
                <Stack.Screen
                    name="HomeWork2"
                    component={HomeWork2Screen}
                    options={OPTIONS_DEFAULT}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
