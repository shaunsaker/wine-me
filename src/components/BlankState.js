import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

export default function BlankState(props) {
    /*
    static get propTypes() {
        return {
            headerText: PropTypes.string,
            text: PropTypes.string,
        };
    }
*/

    return (
        <View style={styles.blankStateContainer}>
            <Text style={styles.blankStateHeaderText}>{props.headerText}</Text>
            <Text style={styles.blankStateText}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    blankStateContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: "center",
        padding: 16,
        paddingTop: 64,
    },
    blankStateHeaderText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.secondary,
        ...styleConstants.secondaryFont,
        marginBottom: 16,
    },
    blankStateText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
    },
});
