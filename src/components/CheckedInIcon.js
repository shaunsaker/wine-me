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

    return (
        <View style={styles.container}>
            <Icon name="check" style={styles.icon} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConstants.success,
        width: 24,
        height: 24,
        borderRadius: 12,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: styleConstants.white,
    },
    icon: {
        fontSize: 18,
        color: styleConstants.white,
    },
});
