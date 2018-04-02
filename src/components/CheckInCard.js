import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import UserCardHeader from "./UserCardHeader";

export default function CheckInCard(props) {
    /*
    static get propTypes() {
        return {
            checkIn: PropTypes.object,
            user: PropTypes.object,
            handleProfilePress: PropTypes.func,
        };
    }
*/

    const dateText = utilities.firstCharToUppercase(
        utilities.getRelativePastDate(props.checkIn.date),
    );

    return (
        <View style={styles.container}>
            <UserCardHeader
                user={props.user}
                handlePress={props.handleProfilePress}
            />
            <View style={styles.row}>
                <View style={styles.spacer} />
                <View
                    style={{
                        flex: 1,
                    }}>
                    <View style={styles.dateTextContainer}>
                        <Text style={styles.dateText}>{dateText}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: styleConstants.dividerColor,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    spacer: {
        width: 56,
        alignSelf: "stretch",
    },
    dateTextContainer: {
        marginTop: 8,
    },
    dateText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
    },
});
