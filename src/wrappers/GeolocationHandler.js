import React from "react";
import { View, Platform } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Permissions from "../permissions";

import LocationFailedModal from "../modals/LocationFailedModal";

export class GeolocationHandler extends React.Component {
    constructor(props) {
        super(props);

        this.getLocationPermission = this.getLocationPermission.bind(this);
        this.getUserLocation = this.getUserLocation.bind(this);
        this.toggleLocationFailedModal = this.toggleLocationFailedModal.bind(
            this,
        );
        this.toggleThirdAttemptAndroid = this.toggleThirdAttemptAndroid.bind(
            this,
        );

        this.state = {
            showLocationFailedModal: false,
            thirdAttemptAndroid: false,
        };
    }

    static get propTypes() {
        return {
            userLocation: PropTypes.object,
            appData: PropTypes.object,
        };
    }

    componentDidMount() {
        if (!this.props.userLocation) {
            this.getLocationPermission();
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.userLocation &&
            !prevProps.userLocation &&
            this.props.appData
        ) {
            // Case where userLocation came in after appData
            this.props.dispatch({
                type: "SET_PLACES_RELATIVE_DISTANCES",
            });
        }
    }

    getLocationPermission() {
        Permissions.handlePermission(
            "location",
            this.getUserLocation,
            !this.state.showLocationFailedModal
                ? this.toggleLocationFailedModal
                : !this.state.thirdAttemptAndroid &&
                  this.toggleThirdAttemptAndroid,
        );
    }

    getUserLocation() {
        this.props.dispatch({
            type: "getUserLocation",
            action: this.state.showLocationFailedModal && {
                type: "SET_PLACES_RELATIVE_DISTANCES",
            },
        });

        if (this.state.showLocationFailedModal) {
            // Close the modal
            this.toggleLocationFailedModal();
        }
    }

    toggleLocationFailedModal() {
        this.setState({
            showLocationFailedModal: !this.state.showLocationFailedModal,
        });
    }

    toggleThirdAttemptAndroid() {
        this.setState({
            thirdAttemptAndroid: !this.state.thirdAttemptAndroid,
        });
    }

    render() {
        const locationModal = this.state.showLocationFailedModal && (
            <LocationFailedModal
                handleClose={this.toggleLocationFailedModal}
                handlePositiveAction={this.getLocationPermission}
                isIOS={Platform.OS === "ios"}
                thirdAttemptAndroid={this.state.thirdAttemptAndroid}
            />
        );

        return (
            <View style={{ flex: 1, alignSelf: "stretch" }}>
                {this.props.children}
                {locationModal}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        userLocation: state.main.appState.userLocation,
        appData: state.main.appData.app,
    };
}

export default connect(mapStateToProps)(GeolocationHandler);
