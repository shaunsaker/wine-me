import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import UserCardHeader from "./UserCardHeader";
import { Touchable } from "react-native-simple-components";

export default function CheckInCard(props) {
    /*
    static get propTypes() {
        return {
            checkIn: PropTypes.object,
            user: PropTypes.object,
            place: PropTypes.object, // if supplied, will render a place name
            handleProfilePress: PropTypes.func,
            handlePlacePress: PropTypes.func,
        };
    }
*/

    const placeComponent = props.place && (
        <Touchable onPress={props.handlePlacePress}>
            <Text style={styles.placeText}>{props.place.name}</Text>
        </Touchable>
    );

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
                    {placeComponent}
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
        flexWrap: "wrap",
    },
    spacer: {
        width: 56,
        alignSelf: "stretch",
    },
    placeText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.darkPrimary,
        ...styleConstants.primaryFont,
        textDecorationLine: "underline",
        marginTop: 8,
        marginRight: 8,
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
