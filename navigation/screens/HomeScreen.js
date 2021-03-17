import React from 'react';
import {StyleSheet, View} from 'react-native';

import Button from '../../components/common/Button';

const HomeScreen = ({navigation: {navigate}}) => {
    const navigateTo = (screenName) => navigate(screenName);

    return (
        <View style={styles.container}>
            <Button
                label={'Example #1'}
                onPress={() => navigateTo('Example1')}
            />
            <Button
                label={'Example #2'}
                onPress={() => navigateTo('Example2')}
            />
            <Button
                label={'Home Work #1'}
                onPress={() => navigateTo('HomeWork1')}
            />
            <Button
                label={'Example #3'}
                onPress={() => navigateTo('Example3')}
            />
            <Button
                label={'Example #4'}
                onPress={() => navigateTo('Example4')}
            />
            <Button
                label={'Home Work #2'}
                onPress={() => navigateTo('HomeWork2')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;
