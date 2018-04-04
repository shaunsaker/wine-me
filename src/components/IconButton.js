import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { Touchable } from "react-native-simple-components";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function IconButton(props) {
    /*
    static get propTypes() {
        return {
            handlePress: PropTypes.func,
            iconName: PropTypes.string.isRequired,
            iconComponent: PropTypes.node,
            style: PropTypes.any
        };
    }
*/

    const iconComponent = props.iconComponent ? (
        props.iconComponent
    ) : (
        <Icon name={props.iconName} style={styles.icon} />
    );

    return (
        <Touchable
            onPress={props.handlePress}
            style={[styles.container, props.style]}>
            {iconComponent}
        </Touchable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConstants.secondary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        ...styleConstants.regularShadow,
    },
    icon: {
        fontSize: 20,
        color: styleConstants.white,
    },
});
