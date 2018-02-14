import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import CustomIcon from "../assets/icons";

export default function Logo(props) {
    /*
    static get propTypes() {
        return {};
    }
*/

    return (
        <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Wine</Text>
            <CustomIcon name="logo" style={styles.logo} />
            <Text style={styles.logoText}>Me</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        alignSelf: "stretch",
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    logoText: {
        fontSize: 20,
        ...styleConstants.secondaryFont,
        color: "white",
    },
    logo: {
        fontSize: 32,
        color: styleConstants.white,
        marginHorizontal: 4,
    },
});
