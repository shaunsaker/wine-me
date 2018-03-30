import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { StarRating, Touchable } from "react-native-simple-components";

export default class ReviewWidget extends React.Component {
    constructor(props) {
        super(props);

        this.toggleShowMore = this.toggleShowMore.bind(this);

        // TEMP
        this.reviewer = {
            name: "Shaun Saker",
            photoURL: null,
            status: "Connoisseur",
            reviewCount: 6,
            photoCount: 87,
        };

        this.state = {
            showMore: false,
            // TEMP
            reviewer: null,
        };
    }

    static get propTypes() {
        return {
            review: PropTypes.object,
            reviewerId: PropTypes.number,
            reviewer: PropTypes.object, // get from db if not supplied by own profile reviews
            handleHeaderPress: PropTypes.func,
        };
    }

    componentDidMount() {
        // If viewing own profile reviews, no need to fetch data
        // TEMP
        this.setState({
            reviewer: this.props.reviewer ? this.props.reviewer : this.reviewer,
        });
    }

    toggleShowMore() {
        this.setState({
            showMore: !this.state.showMore,
        });
    }

    render() {
        const photoURL =
            this.state.reviewer && this.state.reviewer.photoURL
                ? { url: this.state.reviewer.photoURL }
                : require("../assets/images/128.jpg"); // TODO: Placeholder image

        const header = (
            <View style={styles.header}>
                <View style={styles.nameTextContainer}>
                    <Text style={styles.nameText}>
                        {this.state.reviewer ? this.state.reviewer.name : ""}
                    </Text>
                </View>
                <View style={styles.labelsContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.primaryLabelText}>
                            {this.state.reviewer
                                ? this.state.reviewer.status
                                : ""}
                        </Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>
                            {this.state.reviewer
                                ? this.state.reviewer.reviewCount + " reviews"
                                : ""}
                        </Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelText}>
                            {this.state.reviewer
                                ? this.state.reviewer.photoCount + " photos"
                                : ""}
                        </Text>
                    </View>
                </View>
            </View>
        );

        const headerComponent = this.props.handlePress ? (
            <Touchable
                onPress={() =>
                    this.props.handleHeaderPress(
                        this.state.reviewer && this.state.reviewer.reviewerId,
                    )
                }
                style={styles.headerContainer}>
                {header}
            </Touchable>
        ) : (
            <View style={styles.headerContainer}>{header}</View>
        );

        return (
            <View style={styles.container}>
                <View style={styles.photoContainer}>
                    <Image source={photoURL} style={styles.photo} />
                </View>
                <View style={styles.contentContainer}>
                    {headerComponent}
                    <View style={styles.subHeaderContainer}>
                        <View style={styles.starRatingContainer}>
                            <StarRating
                                rating={this.props.review.rating}
                                iconStyle={styles.starRatingIcon}
                                style={styles.starRating}
                            />
                        </View>
                        <View style={styles.dateTextContainer}>
                            <Text style={styles.dateText}>
                                {utilities.getRelativePastDate(
                                    this.props.review.date,
                                )}
                            </Text>
                        </View>
                    </View>
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
        marginBottom: 8,
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
    reviewTextContainer: {},
    reviewText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        lineHeight: styleConstants.smallFont * 1.5,
    },
});
