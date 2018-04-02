import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

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
    const nameText = props.user.name ? props.user.name : "Anonymous";

    const statusText = props.user.status ? props.user.status : "Newbie";

    const reviewCountText = props.user.reviewCount
        ? props.user.reviewCount
        : 0 + " reviews";

    const photoCountText = props.user.photoCount
        ? props.user.photoCount
        : 0 + " photos";

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
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>{reviewCountText}</Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>{photoCountText}</Text>
                    </View>
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
