import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { TouchableText } from "react-native-simple-components";

export default function PlaceBlankState(props) {
    /*
    static get propTypes() {
        return {
            text: PropTypes.string,
            corks: PropTypes.number,
            handleTextPress: PropTypes.func,
            hasUserCheckedIn: PropTypes.bool,
        };
    }
*/
    const buttonComponent = props.hasUserCheckedIn ? (
        <TouchableText
            handlePress={props.handleTextPress}
            text={props.text}
            textStyle={styles.blankStateButtonText}
            style={styles.blankStateButton}
            isLink
        />
    ) : (
        <Text style={styles.blankStateText}>{props.text}</Text>
    );

    return (
        <View style={styles.blankStateContainer}>
            <View style={styles.blankStateTextContainer}>
                <Text style={styles.blankStateText}>
                    {(props.hasUserCheckedIn ? "Be" : "Check in and be") +
                        " the first to"}
                </Text>
                {buttonComponent}
                <Text style={styles.blankStateText}>
                    {(props.hasUserCheckedIn ? "and" : "to") + " earn"}
                </Text>
                <Text style={styles.blankStateHighlightedText}>
                    {props.corks + " corks"}
                </Text>
                <Text style={styles.blankStateText}>!</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    blankStateContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: styleConstants.white,
    },
    blankStateTextContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    blankStateText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        lineHeight: styleConstants.largeFont * 1.5,
        marginRight: 6,
    },
    blankStateButton: {},
    blankStateButtonText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.primary,
        ...styleConstants.primaryFont,
        lineHeight: styleConstants.largeFont * 1.5,
        marginRight: 6,
    },
    blankStateHighlightedText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.secondary,
        ...styleConstants.primaryFont,
        lineHeight: styleConstants.largeFont * 1.5,
    },
});
