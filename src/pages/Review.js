import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import {
    Page,
    ButtonIcon,
    InputContainer,
    Input,
    StarRatingInput,
} from "react-native-simple-components";
import ReviewCard from "../components/ReviewCard";

export class Review extends React.Component {
    constructor(props) {
        super(props);

        this.goBack = this.goBack.bind(this);
        this.goForward = this.goForward.bind(this);
        this.setCurrentSlideIndex = this.setCurrentSlideIndex.bind(this);
        this.setButtonIcon = this.setButtonIcon.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.saveReview = this.saveReview.bind(this);
        this.navigate = this.navigate.bind(this);

        this.slides = ["rating", "review", "preview"];

        this.state = {
            rating: null,
            review: null,
            currentSlideIndex: 0,
            showButtonIcon: true,
        };
    }

    static get propTypes() {
        return {
            places: PropTypes.object,
            reviews: PropTypes.object,
            reviewerID: PropTypes.string,
            reviewer: PropTypes.object,

            // Passed props
            placeID: PropTypes.string,
            reviewID: PropTypes.string,
        };
    }

    static defaultProps = {
        placeID: "ChIJ0TDQop8HzR0RaiQtFUpeRxs",
        reviewerID: 987654321,
    };

    componentDidMount() {
        // If reviewID exists, load the existing user review into state
        if (this.props.reviewID) {
            const review = this.props.places[this.props.placeID].reviews[
                this.props.reviewID
            ];
            this.setState({
                rating: review.rating,
                review: review.review,
            });
        }
    }

    goBack() {
        if (this.state.currentSlideIndex === 0) {
            this.navigate(null, null, true);
        } else {
            this.setCurrentSlideIndex(this.state.currentSlideIndex - 1);
        }
    }

    goForward() {
        if (this.state.currentSlideIndex === this.slides.length - 1) {
            this.saveReview();

            // this.navigate(null, null, true);
        } else {
            this.setCurrentSlideIndex(this.state.currentSlideIndex + 1);
        }
    }

    setCurrentSlideIndex(currentSlideIndex) {
        this.setState({
            currentSlideIndex,
            showButtonIcon: true,
        });
    }

    setButtonIcon(showButtonIcon) {
        this.setState({
            showButtonIcon,
        });
    }

    updateValue(value, type) {
        let state = this.state;
        state[type] = value;
        this.setState(state);
    }

    saveReview() {
        // // TODO: reviewerID => uid
        let reviewID = this.props.reviewID;

        if (reviewID) {
            // TODO: Editing a review
        } else {
            // New review
            reviewID = utilities.createUUID();

            // Save the review to the place
            this.props.dispatch({
                type: "setData",
                node: `app/reviews/${reviewID}`,
                data: {
                    uid: this.props.reviewerID,
                    rating: this.state.rating,
                    review: this.state.review && this.state.review.trim(),
                    placeID: this.props.placeID,
                    date: Date.now(),
                },
                // Save the reviewID to the place
                nextAction: {
                    type: "pushData",
                    node: `app/places/${this.props.placeID}/reviews`,
                    data: reviewID,
                    // Save the reviewID to the user
                    nextAction: {
                        type: "pushData",
                        node: `users/${this.props.reviewerID}/reviews`,
                        data: reviewID,
                    },
                },
            });
        }

        // Calculate the new place rating and save that (based on current rating, number of reviews and new rating)
        const place = this.props.places[this.props.placeID];
        const currentRating = place.rating;
        const reviewCount = utilities.convertDictionaryToArray(place.reviews)
            .length;
        const newRating =
            ((currentRating ? currentRating : 0) + this.state.rating) /
            (reviewCount + 1);

        // Save it to the place
        this.props.dispatch({
            type: "setData",
            node: `app/places/${this.props.placeID}/rating`,
            data: newRating,
        });
    }

    navigate(page, props, goBack) {
        if (goBack) {
            Actions.pop();
        } else {
            Actions[page](props);
        }
    }

    render() {
        let titleText;

        if (this.state.currentSlideIndex === 0) {
            titleText =
                "How was your experience at " +
                (this.props.places &&
                    this.props.places[this.props.placeID].name) +
                "?";
        } else if (this.state.currentSlideIndex === 1) {
            titleText =
                "Tell us about your experience at " +
                (this.props.places &&
                    this.props.places[this.props.placeID].name) +
                " (optional)";
        } else {
            titleText = "Is this correct?";
        }

        const currentSlide =
            this.state.currentSlideIndex === 0 ? (
                <View style={styles.starRatingInputContainer}>
                    <StarRatingInput
                        rating={this.state.rating}
                        iconStyle={styles.starRatingInputIcon}
                        labelTextStyle={styles.starRatingInputText}
                        handlePress={rating =>
                            this.updateValue(rating, "rating")
                        }
                        shouldShowText
                        shouldAnimate
                    />
                </View>
            ) : this.state.currentSlideIndex === 1 ? (
                <InputContainer containerStyle={styles.inputWrapper}>
                    <Input
                        placeholder="The wines were exquisite, the service was inviting and the venue was beautiful..."
                        placeholderTextColor={styleConstants.secondaryText}
                        value={
                            this.state[
                                this.slides[this.state.currentSlideIndex]
                            ]
                        }
                        handleChange={value =>
                            this.updateValue(
                                value,
                                this.slides[this.state.currentSlideIndex],
                            )
                        }
                        containerStyle={styles.inputContainer}
                        style={styles.input}
                        multiline
                        showDeleteButton
                        handleFocus={() => this.setButtonIcon(false)}
                        handleBlur={() => this.setButtonIcon(true)}
                        handleSubmit={this.goForward}
                    />
                </InputContainer>
            ) : (
                // Preview
                <View style={styles.reviewCardContainer}>
                    <ReviewCard
                        review={{
                            rating: this.state.rating,
                            review: this.state.review,
                            date: Date.now(),
                        }}
                        reviewer={this.props.reviewer}
                        handleHeaderPress={
                            null /* TODO: link to user profile */
                        }
                    />
                </View>
            );

        const buttonIcon = this.state.showButtonIcon && (
            <View style={styles.buttonIconContainer}>
                <ButtonIcon
                    showShadow
                    iconName={
                        this.state.currentSlideIndex === this.slides.length - 1
                            ? "check"
                            : "chevron-right"
                    }
                    iconStyle={styles.buttonIconIcon}
                    style={styles.buttonIcon}
                    handlePress={this.goForward}
                    disabled={
                        this.state.currentSlideIndex === 0 && !this.state.rating
                    }
                />
            </View>
        );

        return (
            <Page style={styles.container}>
                <HeaderBar
                    statusBarStyle="dark-content"
                    leftIconName={
                        this.state.currentSlideIndex > 0
                            ? "chevron-left"
                            : "close"
                    }
                    handleLeftIconPress={this.goBack}
                    leftIconStyle={[
                        styles.headerIcon,
                        this.state.currentSlideIndex > 0 && {
                            fontSize: 30,
                        },
                    ]}
                    style={styles.header}
                />
                <View style={styles.bodyContainer}>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.titleText}>{titleText}</Text>
                    </View>
                    {currentSlide}
                </View>
                {buttonIcon}
            </Page>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConstants.white,
    },
    header: {
        backgroundColor: styleConstants.white,
    },
    headerIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primaryText,
    },
    bodyContainer: {
        flex: 1,
        alignSelf: "stretch",
    },
    titleTextContainer: {
        padding: 16,
    },
    titleText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        lineHeight: styleConstants.largeFont * 1.5,
    },
    starRatingInputContainer: {
        alignItems: "center",
        padding: 16,
    },
    starRatingInputIcon: {
        fontSize: styleConstants.windowWidth / 5 - 16,
        color: "gold",
    },
    starRatingInputText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
    },
    buttonIconContainer: {
        position: "absolute",
        bottom: 16,
        right: 16,
    },
    buttonIcon: {
        backgroundColor: styleConstants.secondary,
    },
    buttonIconIcon: {
        fontSize: 30,
        color: styleConstants.white,
    },
    inputWrapper: {
        padding: 16,
    },
    inputContainer: {
        borderRadius: 8,
    },
    input: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        borderBottomWidth: 2,
        borderBottomColor: styleConstants.secondary,
        paddingBottom: 8,
        minHeight: 37, // Fixes weird mounting bug
    },
    reviewCardContainer: {
        alignSelf: "stretch",
        paddingHorizontal: 16,
    },
});

function mapStateToProps(state) {
    return {
        places: state.main.appData.app && state.main.appData.app.places,
        reviews: state.main.appData.app && state.main.appData.app.reviews,
        reviewerID: state.main.userAuth.uid,
        reviewer: state.main.appData.users[state.main.userAuth.uid],
    };
}

export default connect(mapStateToProps)(Review);
