import React from 'react';
import { View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Permissions from '../permissions';

import LocationModal from '../modals/LocationModal';

export class GeolocationHandler extends React.Component {
    constructor(props) {
        super(props);

        this.getLocationPermission = this.getLocationPermission.bind(this);
        this.getUserLocation = this.getUserLocation.bind(this);
        this.toggleLocationModal = this.toggleLocationModal.bind(this);
        this.toggleThirdAttemptAndroid = this.toggleThirdAttemptAndroid.bind(
            this,
        );

        this.state = {
            showLocationModal: false,
            thirdAttemptAndroid: false,
        };
    }

    static get propTypes() {
        return {
            userLocation: PropTypes.object,
        };
    }

    componentDidMount() {
        if (!this.props.userLocation) {
            this.getLocationPermission();
        }
    }

    getLocationPermission() {
        Permissions.handlePermission(
            'location',
            this.getUserLocation,
            !this.state.showLocationModal
                ? this.toggleLocationModal
                : !this.state.thirdAttemptAndroid &&
                  this.toggleThirdAttemptAndroid,
        );
    }

    getUserLocation() {
        this.props.dispatch({
            type: 'getUserLocation',
            action: this.state.showLocationModal && {
                type: 'SET_PLACES_RELATIVE_DISTANCES',
            },
        });

        if (this.state.showLocationModal) {
            // Close the modal
            this.toggleLocationModal();
        }
    }

    toggleLocationModal() {
        this.setState({
            showLocationModal: !this.state.showLocationModal,
        });
    }

    toggleThirdAttemptAndroid() {
        this.setState({
            thirdAttemptAndroid: !this.state.thirdAttemptAndroid,
        });
    }

    render() {
        const locationModal = this.state.showLocationModal && (
            <LocationModal
                handleClose={this.toggleLocationModal}
                handlePositiveAction={this.getLocationPermission}
                isIOS={Platform.OS === 'ios'}
                thirdAttemptAndroid={this.state.thirdAttemptAndroid}
            />
        );

        return (
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
                {this.props.children}
                {locationModal}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        userLocation: state.main.appState.userLocation,
    };
}

export default connect(mapStateToProps)(GeolocationHandler);
