import React, {Component} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';

import ClusteredMapView from 'react-native-maps-super-cluster';
import Button from '../../../components/common/Button';

import ClusterMarker from '../../../components/maps/markers/ClusterMarker';

import MyMarker from './markers/MyMarker';

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

const IMAGES = [
    require('../../../assets/favicon.png'),
    require('../../../assets/icon2.png'),
];

class HomeWork2Screen extends Component {
    constructor(props) {
        super(props);

        this.renderMarker = this.renderMarker.bind(this);
        this.renderCluster = this.renderCluster.bind(this);

        this.handleChangeImage = this.handleChangeImage.bind(this);

        this.state = {
            markerImageIndex: 1,
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

    handleChangeImage() {
        this.setState((prevState) => ({
            markerImageIndex: (prevState.markerImageIndex + 1) % IMAGES.length,
        }));
    }

    renderCluster(cluster, onPress) {
        const key = `cluster-marker-${cluster.clusterId}`;

        return <ClusterMarker key={key} cluster={cluster} onPress={onPress} />;
    }

    renderMarker(data) {
        const {markerImageIndex} = this.state;

        const {id, location} = data;

        const key = `marker-${id}`;
        const image = IMAGES[markerImageIndex];

        return <MyMarker key={key} id={id} location={location} image={image} />;
    }

    render() {
        return (
            <>
                <ClusteredMapView
                    animateClusters={false}
                    initialRegion={INITIAL_REGION}
                    data={this.state.data}
                    renderCluster={this.renderCluster}
                    renderMarker={(data) => this.renderMarker(data)}
                    edgePadding={EDGE_PADDING}
                    style={styles.map}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        label={'Change Image'}
                        onPress={this.handleChangeImage}
                    />
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        top: 25,
        alignSelf: 'center',
    },
});

export default HomeWork2Screen;
