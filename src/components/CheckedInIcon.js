import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import Icon from "react-native-vector-icons/MaterialIcons";

export default function CheckedInIcon(props) {
    /*
    static get propTypes() {
        return {};
    }
*/

    return <Icon name="check" style={styles.checkedInIcon} />;
}

const styles = StyleSheet.create({
    checkedInIcon: {
        backgroundColor: styleConstants.success,
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
        width: 24,
        height: 24,
        borderRadius: 12,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
});
