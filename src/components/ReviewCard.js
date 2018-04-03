import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import UserCardHeader from "./UserCardHeader";
import { StarRating, Touchable } from "react-native-simple-components";

export default class ReviewCard extends React.Component {
    constructor(props) {
        super(props);

        this.toggleShowMore = this.toggleShowMore.bind(this);

        this.state = {
            showMore: false,
        };
    }

    static get propTypes() {
        return {
            review: PropTypes.object,
            user: PropTypes.object,
            place: PropTypes.object, // will be supplied if from UserProfile page
            handleProfilePress: PropTypes.func,
            handlePlacePress: PropTypes.func,
        };
    }

    toggleShowMore() {
        this.setState({
            showMore: !this.state.showMore,
        });
    }

    render() {
        const placeComponent = this.props.place && (
            <Touchable onPress={this.props.handlePlacePress}>
                <Text style={styles.placeText}>{this.props.place.name}</Text>
            </Touchable>
        );

        const dateText = utilities.getRelativePastDate(this.props.review.date);

        const reviewComponent = this.props.review.review && (
            <Touchable
                onPress={this.toggleShowMore}
                disableFeedback
                style={styles.reviewTextContainer}>
                <Text
                    numberOfLines={this.state.showMore ? null : 4}
                    style={styles.reviewText}>
                    {this.props.review.review}
                </Text>
            </Touchable>
        );

        return (
            <View style={styles.container}>
                <UserCardHeader
                    user={this.props.reviewer}
                    handlePress={this.props.handleProfilePress}
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
                                    rating={this.props.review.rating}
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
    reviewText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        lineHeight: styleConstants.smallFont * 1.5,
    },
});
