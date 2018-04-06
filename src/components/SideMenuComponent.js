import React from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import Logo from "../components/Logo";
import { Touchable } from "react-native-simple-components";
import Icon from "react-native-vector-icons/MaterialIcons";

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
            <View style={styles.header}>
                <Logo />
            </View>
            <SideMenuItem
                text="Home"
                page="home"
                iconName="home"
                handlePress={props.handlePress}
            />
            <SideMenuItem
                text="Profile"
                page="userProfile"
                iconName="person"
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

    header: {
        height: 56,
        justifyContent: "center",
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
