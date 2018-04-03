import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import UserCardHeader from "./UserCardHeader";
import { StarRating, Touchable } from "react-native-simple-components";
import ReadMoreText from "./ReadMoreText";

export default function ReviewCard(props) {
    // static get propTypes() {
    //     return {
    //         review: PropTypes.object,
    //         user: PropTypes.object,
    //         place: PropTypes.object, // will be supplied if from UserProfile page
    //         handleProfilePress: PropTypes.func,
    //         handlePlacePress: PropTypes.func,
    //     };
    // }

    const placeComponent = props.place && (
        <Touchable onPress={props.handlePlacePress}>
            <Text style={styles.placeText}>{props.place.name}</Text>
        </Touchable>
    );

    const dateText = utilities.getRelativePastDate(props.review.date);

    const reviewComponent = props.review.review && (
        <View style={styles.reviewTextContainer}>
            <ReadMoreText text={props.review.review} />
        </View>
    );

    return (
        <View style={styles.container}>
            <UserCardHeader
                user={props.reviewer}
                handlePress={props.handleProfilePress}
            />
            <View style={styles.row}>
                <View style={styles.spacer} />
                <View
                    style={{
                        flex: 1,
                    }}>
                    {placeComponent}
                    <View style={styles.row}>
                        <View style={styles.starRatingContainer}>
                            <StarRating
                                rating={props.review.rating}
                                iconStyle={styles.starRatingIcon}
                                style={styles.starRating}
                            />
                        </View>
                        <Text style={styles.dateText}>{dateText}</Text>
                    </View>
                    {reviewComponent}
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
    starRatingContainer: {
        marginRight: 8,
    },
    starRating: {},
    starRatingIcon: {
        fontSize: styleConstants.smallFont,
        color: "gold",
    },
    placeText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.darkPrimary,
        ...styleConstants.primaryFont,
        textDecorationLine: "underline",
        marginTop: 8,
    },
    dateText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.secondaryText,
        ...styleConstants.primaryFont,
    },
    reviewTextContainer: {
        marginTop: 8,
    },
});
