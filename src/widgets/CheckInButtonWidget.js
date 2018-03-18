import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styleConstants from "../assets/styleConstants";

import { Button } from "react-native-simple-components";

export class CheckInButtonWidget extends React.Component {
    constructor(props) {
        super(props);

        this.compareLocations = this.compareLocations.bind(this);

        this.state = {
            isGettingLocation: false,
            isComparingLocation: false,
        };
    }

    static get propTypes() {
        return {
            userLocation: PropTypes.object,

            // Passed props
            placeLocation: PropTypes.object,
        };
    }

    compareLocations() {}

    render() {
        /*
            CHECK IN FLOW
            
            Get users location
            Compare it to the places location
            Make sure it is within a set radius of the place
                Check the user in
                Display error
        */

        return (
            <Button
                iconName="location-searching"
                iconStyle={styles.actionButtonIcon}
                text="CHECK IN"
                textStyle={styles.actionButtonText}
                style={styles.actionButton}
                handlePress={null}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        userLocation: state.main.appState.userLocation,
    };
}

const styles = StyleSheet.create({
    actionButton: {
        position: "absolute",
        bottom: 16,
        right: 16,
        backgroundColor: styleConstants.secondary,
        borderRadius: 32,
        overflow: "hidden",
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    actionButtonIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
        position: "relative",
        left: 0,
        marginRight: 4,
        marginLeft: -8,
    },
    actionButtonText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
});

export default connect(mapStateToProps)(CheckInButtonWidget);
