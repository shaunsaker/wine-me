import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../../assets/styleConstants";

import { Touchable } from "react-native-simple-components";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function InfoRow(props) {
    /*
    static get propTypes() {
        return {
            iconName: PropTypes.string,
            text: PropTypes.string,
            handlePress: PropTypes.func,
        };
    }
*/

    return (
        <Touchable onPress={props.handlePress} style={styles.infoRow}>
            <View style={styles.infoRowLeftSection}>
                <Icon name={props.iconName} style={styles.infoRowIcon} />
                <Text style={styles.infoRowText}>{props.text}</Text>
            </View>
            <Icon name="call-made" style={styles.infoRowIcon} />
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
    infoRowLeftSection: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    infoRowIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        marginRight: 8,
    },
    infoRowText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        flex: 1,
    },
});
