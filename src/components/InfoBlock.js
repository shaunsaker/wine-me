import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import Icon from "react-native-vector-icons/MaterialIcons";

export default function InfoBlockComponent(props) {
    /*
    static get propTypes() {
        return {
          title: PropTypes.string.,
          description: PropTypes.string,
          iconName: PropTypes.string,
          style: PropTypes.any
          textCenter: PropTypes.bool,
        };
    }
*/
    const icon = props.iconName && (
        <Icon name={props.iconName} style={styles.icon} />
    );

    return (
        <View style={[styles.container, props.style]}>
            <View style={[styles.textContainer, props.iconName && { flex: 1 }]}>
                <Text
                    style={[
                        styles.titleText,
                        props.textCenter && { textAlign: "center" },
                    ]}>
                    {props.title}
                </Text>
                <Text
                    style={[
                        styles.descriptionText,
                        props.textCenter && { textAlign: "center" },
                    ]}>
                    {props.description}
                </Text>
            </View>
            {icon}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        flexDirection: "row",
        padding: 16,
    },
    textContainer: {},
    titleText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.primaryText,
        ...styleConstants.boldFont,
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
    },
    icon: {
        fontSize: 64,
        color: styleConstants.darkPrimary,
    },
});
