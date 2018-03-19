import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { Button } from "react-native-simple-components";

export default function SecondaryButton(props) {
    /*
    static get propTypes() {
        return {
            iconName: PropTypes.string,
            customIcon: PropTypes.node,
            text: PropTypes.string,
            style: PropTypes.any,
            handlePress: PropTypes.func,
            disabled: PropTypes.bool,
        };
    }
*/

    return (
        <Button
            iconName={props.iconName}
            iconStyle={styles.icon}
            customIcon={props.customIcon}
            text={props.text}
            textStyle={styles.text}
            style={[styles.button, props.style]}
            handlePress={props.handlePress}
            disabled={props.disabled}
            disabledStyle={{ opacity: 1 }}
            showShadow
        />
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: styleConstants.secondary,
        borderRadius: 32,
        overflow: "hidden",
        paddingHorizontal: 16,
        height: 40,
    },
    icon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
        position: "relative",
        left: 0,
        marginRight: 4,
        marginLeft: -8,
    },
    text: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
});
