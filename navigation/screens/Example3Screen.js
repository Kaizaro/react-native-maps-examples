import React, {Component} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import ClusteredMapView from 'react-native-maps-super-cluster';

import MyMarker from '../../components/maps/markers/MyMarker';
import ClusterMarker from '../../components/maps/markers/ClusterMarker';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const INITIAL_REGION = {
    latitude: 55.7414887,
    longitude: 37.5790672,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922,
};

class Example3Screen extends Component {
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
                    location: {latitude: 55.7417887, longitude: 37.5791872},
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

        return <MyMarker key={key} id={id} location={location} />;
    }

    render() {
        const radius = (screenWidth / 100) * 4.5;
        const edgePadding = {
            top: 150,
            bottom: 150,
            left: 130,
            right: 130,
        };
        const accessor = 'location';
        const minZoom = 1;
        const maxZoom = 16;
        const minZoomLevel = 0;
        const maxZoomLevel = 20;
        const showsPointsOfInterest = false;
        const showsBuildings = false;
        const showsTraffic = false;
        const showsIndoors = false;

        return (
            <ClusteredMapView
                animateClusters={false}
                initialRegion={INITIAL_REGION}
                data={this.state.data}
                renderCluster={this.renderCluster}
                renderMarker={this.renderMarker}
                edgePadding={edgePadding}
                minZoom={minZoom}
                maxZoom={maxZoom}
                minZoomLevel={minZoomLevel}
                maxZoomLevel={maxZoomLevel}
                radius={radius}
                showsPointsOfInterest={showsPointsOfInterest}
                showsBuildings={showsBuildings}
                showsTraffic={showsTraffic}
                showsIndoors={showsIndoors}
                accessor={accessor}
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

export default Example3Screen;
