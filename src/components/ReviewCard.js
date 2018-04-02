import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { StarRating, Touchable } from "react-native-simple-components";
import UserCardHeader from "./UserCardHeader";

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
            handleProfilePress: PropTypes.func,
        };
    }

    toggleShowMore() {
        this.setState({
            showMore: !this.state.showMore,
        });
    }

    render() {
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

        const dateText = utilities.getRelativePastDate(this.props.review.date);

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
                        <View style={styles.row}>
                            <View style={styles.starRatingContainer}>
                                <StarRating
                                    rating={this.props.review.rating}
                                    iconStyle={styles.starRatingIcon}
                                    style={styles.starRating}
                                />
                            </View>
                            <View style={styles.dateTextContainer}>
                                <Text style={styles.dateText}>{dateText}</Text>
                            </View>
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
    dateTextContainer: {},
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
