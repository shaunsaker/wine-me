import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { Touchable } from "react-native-simple-components";
import { AnimateScale } from "react-native-simple-animators";

export default function RadioButton(props) {
    // static get propTypes() {
    //     return {
    //         isSelected: PropTypes.bool,
    //         handlePress: PropTypes.func,

    //         // style: PropTypes.node,
    //         // circleStyle: PropTypes.node,
    //     };
    // }

    const icon = props.isSelected && (
        <AnimateScale initialValue={0.5} finalValue={1} shouldAnimateIn>
            <View style={[styles.icon, props.circleStyle]} />
        </AnimateScale>
    );

    return (
        <Touchable
            onPress={props.handlePress}
            style={[styles.container, props.style]}>
            {icon}
        </Touchable>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: styleConstants.primaryText,
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: 16,
        height: 16,
        borderRadius: 12,
        backgroundColor: styleConstants.primaryText,
    },
});
