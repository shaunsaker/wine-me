import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { Touchable } from "react-native-simple-components";

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

    const photoURL = props.user.photoURL
        ? { url: props.user.photoURL }
        : require("../assets/images/128.jpg"); // TODO: Placeholder image

    return (
        <Touchable onPress={null} style={styles.container}>
            <View style={styles.photoContainer}>
                <Image source={photoURL} style={styles.photo} />
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
        flex: 1,
        alignSelf: "stretch",
        flexDirection: "row",
    },

    photoContainer: {
        marginRight: 16,
    },
    photo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: "hidden", // ios
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
