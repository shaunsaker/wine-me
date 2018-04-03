import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { Touchable } from "react-native-simple-components";
import UserProfilePhoto from "./UserProfilePhoto";

export default function UserCardHeader(props) {
    /*
    static get propTypes() {
        return {
            user: PropTypes.object,
            handlePress: PropTypes.func
        };
    }
*/
    const nameText = props.user.name ? props.user.name : "Anonymous"; // TODO

    const statusText = props.user.status ? props.user.status : "Newbie"; // TODO

    const numberOfReviews =
        props.user.reviews &&
        utilities.convertDictionaryToArray(props.user.reviews).length;

    const reviewsComponent = numberOfReviews && (
        <View style={styles.labelContainer}>
            <Text style={styles.labelText}>
                {numberOfReviews +
                    " review" +
                    (numberOfReviews > 1 ? "'s" : "")}
            </Text>
        </View>
    );

    const numberOfCheckIns =
        props.user.checkIns &&
        utilities.convertDictionaryToArray(props.user.checkIns).length;

    const checkInsComponent = numberOfCheckIns && (
        <View style={styles.labelContainer}>
            <Text style={styles.labelText}>
                {numberOfCheckIns +
                    " check-in" +
                    (numberOfCheckIns > 1 ? "'s" : "")}
            </Text>
        </View>
    );

    return (
        <Touchable onPress={props.handlePress} style={styles.container}>
            <View style={styles.photoContainer}>
                <UserProfilePhoto photoURL={props.user.photoURL} size={40} />
            </View>
            <View style={styles.textContainer}>
                <View style={styles.nameTextContainer}>
                    <Text style={styles.nameText}>{nameText}</Text>
                </View>
                <View style={styles.labelsContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.primaryLabelText}>
                            {statusText}
                        </Text>
                    </View>
                    {reviewsComponent}
                    {checkInsComponent}
                </View>
            </View>
        </Touchable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        flexDirection: "row",
    },

    photoContainer: {
        marginRight: 16,
    },

    textContainer: {
        flex: 1,
    },
    nameTextContainer: {},
    nameText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
    },
    labelsContainer: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap", // smaller width screen
    },
    labelContainer: {
        marginRight: 8,
    },
    primaryLabelText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.primary,
        ...styleConstants.primaryFont,
    },
    labelText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.secondaryText,
        ...styleConstants.primaryFont,
    },
});
