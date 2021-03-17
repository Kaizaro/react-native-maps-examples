import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {MapScreen} from './MapScreen';

const INITIAL_REGION = {
    latitude: 55.7414887,
    longitude: 37.5790672,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922,
};
const initialData = [
    {
        id: 1,
        location: {latitude: 55.7413887, longitude: 37.5790572},
    },
    {
        id: 2,
        location: {latitude: 55.7404887, longitude: 37.5793672},
    },
    {
        id: 3,
        location: {latitude: 55.7412887, longitude: 37.5790372},
    },
    {
        id: 4,
        location: {latitude: 55.7417887, longitude: 37.5791872},
    },
];
const initialCurrentRegion = {...INITIAL_REGION}
const initialCurrentCount = 0;

const renderConsoleMessage = (renderCount) => {
    console.log('>>> render High order component => count: ', renderCount);
};

const MyLocation = ({latitude, longitude}) => (
    <View style={styles.infoBlockContainer}>
        <Text>latitude: {latitude}</Text>
        <Text>longitude: {longitude}</Text>
    </View>
);


const HomeWorkFCScreen = () => {
    // define
    const [data] = useState(initialData);
    const [currentRegion, setCurrentRegion] = useState(initialCurrentRegion);
    const [currentCount, setCurrentCount] = useState(initialCurrentCount);

    const onRegionChange = (region) => {
        setCurrentRegion(region);
        setCurrentCount(currentCount + 1);
    }

    // render
    renderConsoleMessage(currentCount);
    return (
        <>
            <MapScreen data={data} onRegionChange={onRegionChange} />
            <MyLocation
                latitude={currentRegion.latitude}
                longitude={currentRegion.longitude}
            />
        </>
    );
};

const styles = StyleSheet.create({
    infoBlockContainer: {
        position: 'absolute',
        alignSelf: 'center',
        paddingLeft: '8%',
        justifyContent: 'center',
        top: 15,
        width: '80%',
        height: 60,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'grey',
    },
});

export {HomeWorkFCScreen, INITIAL_REGION};
