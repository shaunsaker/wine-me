import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { Menu } from "react-native-simple-components";

export default function HomeMenu(props) {
    /*
    static get propTypes() {
        return {
            handleSelect: PropTypes.func,
        };
    }
*/
    const values = ["About", "Get in touch", "Share"];

    return (
        <Menu
            values={values}
            handleSelect={props.handleSelect}
            showSeparatorLine
            itemHeight={38}
            showShadow
            style={styles.container}
            textStyle={styles.text}
            separatorColor={styleConstants.dividerColor}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        top: Platform.OS === "ios" ? 84 : 64,
        right: 16,
        borderRadius: 8,
    },
    text: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
    },
});
