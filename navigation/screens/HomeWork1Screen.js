import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import ClusteredMapView from 'react-native-maps-super-cluster';

import ClusterMarker from '../../components/maps/markers/ClusterMarker';
import MyMarker from '../../components/maps/markers/MyMarker';

const INITIAL_REGION = {
    latitude: 55.7414887,
    longitude: 37.5790672,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922,
};

const MyLocation = ({latitude, longitude}) => (
    <View style={styles.infoBlockContainer}>
        <Text>latitude: {latitude}</Text>
        <Text>longitude: {longitude}</Text>
    </View>
);

const renderConsoleMessage = (renderCount) => {
    console.log('>>> render Map => count: ', renderCount);
}

class HomeWork1Screen extends Component {
    constructor(props) {
        super(props);

        this.renderMarker = this.renderMarker.bind(this);
        this.renderCluster = this.renderCluster.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);

        this.state = {
            data: [
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
            ],
            currentRegion: {...INITIAL_REGION},
            currentCount: 0,
        };
    }

    renderCluster(cluster, onPress) {
        const key = `cluster-marker-${cluster.clusterId}`;

        return <ClusterMarker key={key} cluster={cluster} onPress={onPress} />;
    }

    renderMarker(data) {
        const {id, location} = data;

        const key = `marker-${id}`;

        return <MyMarker key={key} id={id} location={location} />;
    }

    onRegionChange(region) {
        this.setState({
            currentRegion: region,
            currentCount: this.state.currentCount + 1,
        });
    }

    render() {
        renderConsoleMessage(this.state.currentCount);
        return (
            <>
                <ClusteredMapView
                    animateClusters={false}
                    initialRegion={INITIAL_REGION}
                    data={this.state.data}
                    onRegionChangeComplete={this.onRegionChange}
                    renderCluster={this.renderCluster}
                    renderMarker={this.renderMarker}
                    style={styles.map}
                />
                <MyLocation
                    latitude={this.state.currentRegion.latitude}
                    longitude={this.state.currentRegion.longitude}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
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

export default HomeWork1Screen;
