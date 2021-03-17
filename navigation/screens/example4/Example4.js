import React, {Component} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import ClusteredMapView from 'react-native-maps-super-cluster';

import ClusterMarker from './markers/ClusterMarker';

import MyMarkerExample1 from './markers/MyMarkerExample1';
import MyMarkerExample2 from './markers/MyMarkerExample2';
import MyMarkerExample3 from './markers/MyMarkerExample3';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const INITIAL_REGION = {
    latitude: 55.7414887,
    longitude: 37.5790672,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922,
};

const EDGE_PADDING = {
    top: 150,
    bottom: 150,
    left: 130,
    right: 130,
};

class Example4Screen extends Component {
    constructor(props) {
        super(props);

        this.renderMarker = this.renderMarker.bind(this);
        this.renderCluster = this.renderCluster.bind(this);

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
                    location: {latitude: 55.7417887, longitude: 37.5792572},
                },
                {
                    id: 5,
                    location: {latitude: 55.7415587, longitude: 37.5796672},
                },
                {
                    id: 6,
                    location: {latitude: 55.742587, longitude: 37.5785672},
                },
                {
                    id: 7,
                    location: {latitude: 55.743687, longitude: 37.5743372},
                },
                {
                    id: 8,
                    location: {latitude: 55.7413887, longitude: 37.5733872},
                },
            ],
        };
    }

    renderCluster(cluster, onPress) {
        const key = `cluster-marker-${cluster.clusterId}`;

        return <ClusterMarker key={key} cluster={cluster} onPress={onPress} />;
    }

    renderMarker(data) {
        const {id, location} = data;

        const key = `marker-${id}`;

        //return <MyMarkerExample1 key={key} id={id} location={location} />;
        //return <MyMarkerExample2 key={key} id={id} location={location} />;
        return <MyMarkerExample3 key={key} id={id} location={location} />;
    }

    render() {
        return (
            <ClusteredMapView
                animateClusters={false}
                initialRegion={INITIAL_REGION}
                data={this.state.data}
                renderCluster={this.renderCluster}
                renderMarker={this.renderMarker}
                edgePadding={EDGE_PADDING}
                style={styles.map}
            />
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export default Example4Screen;
