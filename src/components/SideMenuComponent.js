import React from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { Touchable } from "react-native-simple-components";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomIcon from "../assets/icons";

function SideMenuItem(props) {
    return (
        <Touchable
            onPress={() => props.handlePress(props.page)}
            style={styles.row}>
            <Icon name={props.iconName} style={styles.icon} />
            <Text style={styles.text}>{props.text}</Text>
        </Touchable>
    );
}

export default function SideMenuComponent(props) {
    // static get propTypes() {
    //     return {
    //         handlePress: PropTypes.func,
    //     };
    // }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <CustomIcon name="logo" style={styles.logo} />
            </View>
            <SideMenuItem
                text="Home"
                page="home"
                iconName="home"
                handlePress={props.handlePress}
            />
            <SideMenuItem
                text="Search"
                page="search"
                iconName="search"
                handlePress={props.handlePress}
            />
            <SideMenuItem
                text="Leaderboard"
                page="leaderboard"
                iconName="stars"
                handlePress={props.handlePress}
            />
            <SideMenuItem
                text="About"
                page="about"
                iconName="info"
                handlePress={props.handlePress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#222222",
        paddingTop: Platform.OS === "ios" ? 22 : 0,
        flex: 1,
        borderRightWidth: 4,
    },
    logoContainer: {
        alignSelf: "stretch",
        height: 56,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        fontSize: styleConstants.iconFont * 1.5,
        color: styleConstants.white,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    icon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
        marginRight: 12,
        opacity: 0.85,
    },
    text: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
});
