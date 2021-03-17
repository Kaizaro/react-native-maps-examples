import 'react-native-gesture-handler';

import React from 'react';
import {View, StyleSheet, LogBox} from 'react-native';

import {StatusBar} from 'expo-status-bar';

import Navigation from './navigation/NavigationContainer';

LogBox.ignoreLogs(['Warning:']);

export default function App() {
    return (
        <>
            <StatusBar style="auto" />
            <View style={styles.container}>
                <Navigation />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
