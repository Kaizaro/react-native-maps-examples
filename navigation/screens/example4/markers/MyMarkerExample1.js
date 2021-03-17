import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {Marker} from 'react-native-maps';

const MARKER_IMAGE = require('../../../../assets/favicon.png');

export default class MyMarkerExample1 extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        const {id, location} = this.props;

        const identifier = `marker-${id}`;

        return (
            <Marker
                image={MARKER_IMAGE}
                identifier={identifier}
                tracksViewChanges={false}
                tracksInfoWindowChanges={false}
                coordinate={location}
            />
        );
    }
}

const styles = StyleSheet.create({});
