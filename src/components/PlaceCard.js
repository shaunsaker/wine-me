import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import {
    Label,
    TouchableIcon,
    ImageWidget,
} from "react-native-simple-components";
import Icon from "react-native-vector-icons/MaterialIcons";

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
        const photoURL = this.props.place.photoURL
            ? { url: this.props.place.photoURL }
            : require("../assets/images/waterkloof-wine-estate.jpg");

        const relativeDistance = this.props.userLocation
            ? Math.round(
                  utilities.getDistanceBetweenCoordinateSets(
                      this.props.userLocation,
                      this.props.place.location,
                  ),
              )
            : "-";

        const menuIcon = this.props.handlePress && (
            <View style={styles.menuIconContainer}>
                <TouchableIcon
                    iconName="more-vert"
                    iconStyle={styles.menuIcon}
                    handlePress={this.props.handlePress}
                />
            </View>
        );

        const isVisitedIcon = this.props.isVisited && (
            <View style={styles.isVisitedIconContainer}>
                <Icon name="check-circle" style={styles.isVisitedIcon} />
            </View>
        );

        return (
            <View style={styles.wrapper}>
                <View
                    onPress={this.props.handlePress}
                    disableFeedback
                    style={styles.container}>
                    <View style={styles.backgroundImageContainer}>
                        <ImageWidget
                            source={photoURL}
                            style={styles.backgroundImage}
                            loaderColor={styleConstants.primary}
                            loaderStyle={styles.loader}
                        />
                    </View>
                    <View style={styles.bodyContainer}>
                        <Label
                            text={this.props.place.name}
                            style={styles.titleLabel}
                            textStyle={styles.titleText}
                            showShadow
                        />
                        <View style={styles.labelsContainer}>
                            <Label
                                iconName="location-on"
                                text={relativeDistance + " km"}
                                style={styles.distanceLabel}
                                textStyle={styles.labelText}
                                iconStyle={styles.labelText}
                                showShadow
                            />
                        </View>
                    </View>
                    {menuIcon}
                    {isVisitedIcon}
                </View>
            </View>
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
});
