import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import {
    Touchable,
    ImageWidget,
    StarRating,
} from "react-native-simple-components";
import Label from "./Label";
import CheckedInIcon from "./CheckedInIcon";
import CustomIcon from "../assets/icons";
import RelativeDistanceLabel from "./RelativeDistanceLabel";

export default class PlaceCard extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            place: PropTypes.object,
            userLocation: PropTypes.object,
            handlePress: PropTypes.func,
            hasUserCheckedIn: PropTypes.bool,
        };
    }

    render() {
        const photoURL =
            this.props.place.photos &&
            utilities.getGooglePlacesPhotoURL(
                this.props.place.photos[0], // first one
            );

        const backgroundImage = photoURL ? (
            <ImageWidget
                source={{ uri: photoURL }}
                style={styles.backgroundImage}
                loaderColor={styleConstants.primary}
                loaderStyle={styles.loader}
            />
        ) : (
            <View style={styles.backgroundImageIconContainer}>
                <CustomIcon name="logo" style={styles.backgroundImageIcon} />
            </View>
        );

        const checkedInIcon = this.props.hasUserCheckedIn && (
            <View style={styles.checkedInIconContainer}>
                <CheckedInIcon />
            </View>
        );

        const rating = this.props.place.rating ? (
            <View style={styles.starRatingContainer}>
                <StarRating
                    rating={Math.ceil(this.props.place.rating)}
                    style={styles.starRating}
                    iconStyle={styles.starRatingIcon}
                />
            </View>
        ) : null;

        const relativeDistanceComponent = this.props.userLocation && (
            <RelativeDistanceLabel
                userLocation={this.props.userLocation}
                placeLocation={this.props.place.location}
            />
        );

        return (
            <Touchable
                onPress={this.props.handlePress}
                disableFeedback
                style={styles.wrapper}>
                <View
                    onPress={this.props.handlePress}
                    disableFeedback
                    style={styles.container}>
                    <View style={styles.backgroundImageContainer}>
                        {backgroundImage}
                    </View>
                    <View style={styles.bodyContainer}>
                        <Label text={this.props.place.name} secondaryText />
                        <View style={styles.labelsContainer}>
                            {relativeDistanceComponent}
                        </View>
                    </View>
                    {checkedInIcon}
                    {rating}
                </View>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 16,
        paddingTop: 0,
        alignSelf: "stretch",
    },
    container: {
        alignSelf: "stretch",
        height: 200,
        borderRadius: 8,

        backgroundColor: styleConstants.white,
        ...styleConstants.regularShadow,
        borderWidth: 0,
    },

    loader: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    backgroundImageContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    backgroundImage: {
        borderRadius: 8,
        width: styleConstants.windowWidth - 32,
        height: 200,
    },
    backgroundImageIconContainer: {
        borderRadius: 8,
        width: styleConstants.windowWidth - 32,
        height: 200,
        backgroundColor: styleConstants.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImageIcon: {
        fontSize: 96,
        color: styleConstants.white,
    },

    bodyContainer: {
        flex: 1,
        padding: 8,
        justifyContent: "flex-end",
        alignItems: "flex-start",
    },

    labelsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 4,
    },

    checkedInIconContainer: {
        position: "absolute",
        top: 16,
        left: 16,
    },

    starRatingContainer: {
        position: "absolute",
        top: 8,
        right: 8,
    },
    starRating: {
        padding: 4,
        backgroundColor: styleConstants.transBlack,
        borderRadius: 8,
    },
    starRatingIcon: {
        color: "gold",
    },
});
