import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { Label } from "react-native-simple-components";

export default function LabelComponent(props) {
    /*
    static get propTypes() {
        return {
            text: PropTypes.string,
            highlight: PropTypes.bool,
            secondaryText: PropTypes.bool,
            handlePress: PropTypes.bool,
        };
    }
*/

    return (
        <Label
            text={props.text}
            textStyle={[
                styles.labelText,
                props.secondaryText && styles.secondaryLabelText,
            ]}
            style={[styles.label, props.highlight && styles.highlightedLabel]}
            handlePress={props.handlePress}
        />
    );
}

const styles = StyleSheet.create({
    label: {
        backgroundColor: styleConstants.transBlack,
        borderRadius: 4,
        alignSelf: "flex-start",
        paddingHorizontal: 16,
        marginRight: 4,
        marginBottom: 4,
    },
    highlightedLabel: {
        backgroundColor: styleConstants.primary,
    },
    labelText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
    secondaryLabelText: {
        fontSize: styleConstants.regularFont,
        ...styleConstants.secondaryFont,
    },
});
