import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {Marker} from 'react-native-maps';

export default class MyMarker extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.image !== nextProps.image;

        // Old code
        // return false;
    }

    render() {
        const {id, location, image} = this.props;

        const identifier = `marker-${id}`;

        return (
            <Marker
                image={image}
                identifier={identifier}
                tracksViewChanges={false}
                tracksInfoWindowChanges={false}
                coordinate={location}>
                <View style={styles.myMarkerStyle}>
                    <Image source={image} style={styles.imageStyle} />
                </View>
            </Marker>
        );
    }
}

const styles = StyleSheet.create({
    myMarkerStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        borderWidth: 1,
    },
    myMarkerTextStyle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    imageStyle: {
        width: 15,
        height: 15,
    },
});
