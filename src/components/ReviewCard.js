import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

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
            rating: PropTypes.number,
            review: PropTypes.string,
            date: PropTypes.number,
            reviewer: PropTypes.object,
            handleHeaderPress: PropTypes.func,
        };
    }

    toggleShowMore() {
        this.setState({
            showMore: !this.state.showMore,
        });
    }

    render() {
        const nameText = this.props.reviewer.name
            ? this.props.reviewer.name
            : "Anonymous";

        const statusText = this.props.reviewer.status
            ? this.props.reviewer.status
            : "Newbie";

        const reviewCountText = this.props.reviewer.reviewCount
            ? this.props.reviewer.reviewCount
            : 0 + " reviews";

        const photoCountText = this.props.reviewer.photoCount
            ? this.props.reviewer.photoCount
            : 0 + " photos";

        const photoURL = this.props.reviewer.photoURL
            ? { url: this.props.reviewer.photoURL }
            : require("../assets/images/128.jpg"); // TODO: Placeholder image

        const dateText = utilities.getRelativePastDate(this.props.date);

        const headerComponent = (
            <View style={styles.header}>
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
        );

        const headerWrapperComponent = this.props.handlePress ? (
            <Touchable
                onPress={() =>
                    this.props.handleHeaderPress(this.props.reviewer.reviewerID)
                }
                style={styles.headerContainer}>
                {headerComponent}
            </Touchable>
        ) : (
            <View style={styles.headerContainer}>{headerComponent}</View>
        );

        const reviewComponent = this.props.review && (
            <Touchable
                onPress={this.toggleShowMore}
                disableFeedback
                style={styles.reviewTextContainer}>
                <Text
                    numberOfLines={this.state.showMore ? null : 4}
                    style={styles.reviewText}>
                    {this.props.review}
                </Text>
            </Touchable>
        );

        return (
            <View style={styles.container}>
                <View style={styles.photoContainer}>
                    <Image source={photoURL} style={styles.photo} />
                </View>
                <View style={styles.contentContainer}>
                    {headerWrapperComponent}
                    <View style={styles.subHeaderContainer}>
                        <View style={styles.starRatingContainer}>
                            <StarRating
                                rating={this.props.rating}
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        flexDirection: "row",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: styleConstants.dividerColor,
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
    contentContainer: {
        flex: 1,
    },
    headerContainer: {
        height: 40, // same as image,
        justifyContent: "space-between",
        marginBottom: 8,
    },
    subHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
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
