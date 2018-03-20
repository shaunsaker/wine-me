import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import Label from "./Label";

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
            highlight
        />
    );
}

const styles = StyleSheet.create({});
