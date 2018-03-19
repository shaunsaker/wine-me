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
        };
    }
*/

    return (
        <View style={styles.blankStateContainer}>
            <View style={styles.blankStateTextContainer}>
                <Text style={styles.blankStateText}>Be the first to</Text>
                <TouchableText
                    onPress={props.handleTextPress}
                    text={props.text}
                    textStyle={styles.blankStateButtonText}
                    style={styles.blankStateButton}
                    isLink
                />
                <Text style={styles.blankStateText}>and earn</Text>
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
        color: styleConstants.lightSecondary,
        ...styleConstants.primaryFont,
        lineHeight: styleConstants.largeFont * 1.5,
    },
});
