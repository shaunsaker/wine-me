import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { Label } from "react-native-simple-components";

export default function RelativeDistanceLabel(props) {
    /*
    static get propTypes() {
        return {
            userLocation: PropTypes.object.isRequired,
            placeLocation: PropTypes.object.isRequired,
        };
    }
*/

    return (
        <Label
            text={
                Math.round(
                    utilities.getDistanceBetweenCoordinateSets(
                        props.userLocation,
                        props.placeLocation,
                    ),
                ) + " km from you"
            }
            textStyle={styles.labelText}
            style={styles.label}
            showShadow
        />
    );
}

const styles = StyleSheet.create({
    label: {
        backgroundColor: styleConstants.primary,
        borderRadius: 8,
        marginRight: 4,
    },
    labelText: {
        ...styleConstants.primaryFont,
        fontSize: styleConstants.smallFont,
        color: styleConstants.white,
    },
});
