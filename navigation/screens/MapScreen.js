import React from 'react';
import {StyleSheet} from 'react-native';
import ClusteredMapView from 'react-native-maps-super-cluster';
import ClusterMarker from '../../components/maps/markers/ClusterMarker';
import MyMarker from '../../components/maps/markers/MyMarker';
import {INITIAL_REGION} from './HomeWorkFCScreen';

const renderCluster = (cluster, onPress) => {
    const key = `cluster-marker-${cluster.clusterId}`;

    return <ClusterMarker key={key} cluster={cluster} onPress={onPress} />;
}

const renderMarker = (data) => {
    const {id, location} = data;

    const key = `marker-${id}`;

    return <MyMarker key={key} id={id} location={location} />;
}

const MapScreen = ({data, onRegionChange}) => {
    console.log('>>> ClusteredMap render');
    return (
        <ClusteredMapView
            animateClusters={false}
            initialRegion={INITIAL_REGION}
            data={data}
            onRegionChange={onRegionChange}
            renderCluster={renderCluster}
            renderMarker={renderMarker}
            style={styles.map}
        />
    )
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export {MapScreen};
