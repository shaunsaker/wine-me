import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import {
    Touchable,
    Label,
    ImageWidget,
    StarRating,
} from "react-native-simple-components";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomIcon from "../assets/icons";

export default class PlaceCard extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            place: PropTypes.object,
            userLocation: PropTypes.object,
            handlePress: PropTypes.func,
            isVisited: PropTypes.bool,
        };
    }

    render() {
        const photoURL = this.props.place.photoReference && {
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                this.props.place.photoReference
            }&key=${config.googlePlacesAPIKey}`,
        };

        const backgroundImage = photoURL ? (
            <ImageWidget
                source={photoURL}
                style={styles.backgroundImage}
                loaderColor={styleConstants.primary}
                loaderStyle={styles.loader}
            />
        ) : (
            <View style={styles.backgroundImageIconContainer}>
                <CustomIcon
                    name="noun_32096_cc"
                    style={styles.backgroundImageIcon}
                />
            </View>
        );

        const relativeDistance = this.props.userLocation
            ? Math.round(
                  utilities.getDistanceBetweenCoordinateSets(
                      this.props.userLocation,
                      this.props.place.location,
                  ),
              )
            : "-";

        const isVisitedIcon = this.props.isVisited && (
            <View style={styles.isVisitedIconContainer}>
                <Icon name="check-circle" style={styles.isVisitedIcon} />
            </View>
        );

        const rating = this.props.place.rating && (
            <View style={styles.starRatingContainer}>
                <StarRating
                    rating={Math.ceil(this.props.place.rating)}
                    style={styles.starRating}
                    iconStyle={styles.starRatingIcon}
                />
            </View>
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
                        <Label
                            text={this.props.place.name}
                            style={styles.titleLabel}
                            textStyle={styles.titleText}
                        />
                        <View style={styles.labelsContainer}>
                            <Label
                                iconName="location-on"
                                text={relativeDistance + " km"}
                                style={styles.distanceLabel}
                                textStyle={styles.labelText}
                                iconStyle={styles.labelText}
                            />
                        </View>
                    </View>
                    {isVisitedIcon}
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
        ...styleConstants.regularShadow,
        borderRadius: 8,
        borderWidth: 0,
        backgroundColor: styleConstants.white,
        overflow: "hidden",
    },
    loader: {
        height: 200,
        borderRadius: 8,
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
        backgroundColor: styleConstants.darkSecondary,
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
    titleLabel: {
        backgroundColor: styleConstants.transBlack,
        borderRadius: 8,
    },
    titleText: {
        fontSize: styleConstants.regularFont,
        ...styleConstants.secondaryFont,
        color: styleConstants.white,
        paddingVertical: 4,
    },
    labelsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 4,
    },
    labelContainer: {
        marginRight: 4,
    },
    distanceLabel: {
        backgroundColor: styleConstants.primary,
        borderRadius: 8,
        marginRight: 4,
    },
    labelText: {
        ...styleConstants.primaryFont,
        fontSize: styleConstants.smallFont,
        color: styleConstants.white,
    },
    menuIconContainer: {
        position: "absolute",
        top: 0,
        right: 0,
    },
    menuIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
        padding: 16,
    },
    isVisitedIconContainer: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    isVisitedIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
        padding: 16,
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
