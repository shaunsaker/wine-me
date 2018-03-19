import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { Touchable } from "react-native-simple-components";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function InfoRow(props) {
    /*
    static get propTypes() {
        return {
            iconName: PropTypes.string,
            text: PropTypes.string,
            handlePress: PropTypes.func,
            isHeader: PropTypes.bool,
            isHighlighted: PropTypes.bool,
            isBusinessHours: PropTypes.bool,
        };
    }
*/
    const leftIconComponent = props.iconName ? (
        <Icon name={props.iconName} style={styles.infoRowIcon} />
    ) : (
        <Icon
            name="alarm"
            style={[
                styles.infoRowIcon,
                props.isHighlighted ? styles.highlightedIcon : styles.fauxIcon,
            ]}
        />
    );

    const textComponent = props.isBusinessHours ? (
        <View style={styles.businessHoursRow}>
            <Text
                style={[
                    styles.businessHoursDayText,
                    props.isHighlighted && styles.highlightedText,
                ]}>
                {props.text.split(":")[0] + ":"}
            </Text>
            <Text
                style={[
                    styles.businessHoursTimeText,
                    props.isHighlighted && styles.highlightedText,
                ]}>
                {props.text.split(": ")[1]}
            </Text>
        </View>
    ) : (
        <Text style={styles.infoRowText}>{props.text}</Text>
    );

    const rightIconComponent = props.handlePress && (
        <Icon name="call-made" style={styles.rightIcon} />
    );

    return (
        <Touchable
            onPress={props.handlePress}
            style={[
                styles.infoRow,
                props.isHeader && styles.headerRow,
                props.isHighlighted && styles.highlightedRow,
            ]}
            disableFeedback={!props.handlePress}>
            <View style={styles.infoRowLeftSection}>
                {leftIconComponent}
                {textComponent}
            </View>
            {rightIconComponent}
        </Touchable>
    );
}

const styles = StyleSheet.create({
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: styleConstants.dividerColor,
    },
    headerRow: {
        backgroundColor: styleConstants.dividerColor,
    },
    highlightedRow: {},
    infoRowLeftSection: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    infoRowIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        marginRight: 16,
    },
    highlightedIcon: {
        color: styleConstants.primary,
    },
    fauxIcon: {
        color: "transparent",
    },
    infoRowText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        flex: 1,
        marginRight: 16,
    },
    highlightedText: {
        color: styleConstants.primaryText,
    },
    rightIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
    },

    businessHoursRow: {
        flexDirection: "row",
    },
    businessHoursDayText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.secondaryText,
        ...styleConstants.primaryFont,
        flex: 0.6,
    },
    businessHoursTimeText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.secondaryText,
        ...styleConstants.primaryFont,
        flex: 1,
    },
});
