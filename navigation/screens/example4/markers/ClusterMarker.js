import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {Marker} from 'react-native-maps';

export default class ClusterMarker extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const clusterId = this.props.cluster.clusterId;
        const pointCount = this.props.cluster.pointCount;
        const coordinate = this.props.cluster.coordinate;
        const onPress = this.props.onPress;

        const identifier = `cluster-marker-${clusterId}`;

        return (
            <Marker
                identifier={identifier}
                coordinate={coordinate}
                tracksViewChanges={false}
                tracksInfoWindowChanges={false}
                onPress={onPress}>
                <View style={styles.myClusterStyle}>
                    <Text style={styles.myClusterTextStyle}>{pointCount}</Text>
                </View>
            </Marker>
        );
    }
}

const styles = StyleSheet.create({
    myClusterStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
    myClusterTextStyle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});
