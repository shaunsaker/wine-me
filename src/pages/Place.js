import React from "react";
import { View, Text, StyleSheet, Linking, Platform } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { Page, StarRating } from "react-native-simple-components";
import ScrollHeader from "../components/ScrollHeader";
import PhotoSlider from "../components/PhotoSlider";
import RelativeDistanceLabel from "../components/RelativeDistanceLabel";
import Label from "../components/Label";
import InfoRow from "../components/InfoRow";
import PlaceBusinessHours from "../components/PlaceBusinessHours";
import CheckInButtonWidget from "../widgets/CheckInButtonWidget";
import ReviewList from "../lists/ReviewList";
import PlaceBlankState from "../components/PlaceBlankState";
import SecondaryButton from "../components/SecondaryButton";

export class Place extends React.Component {
    constructor(props) {
        super(props);

        this.setTab = this.setTab.bind(this);
        this.hasUserCheckedIn = this.hasUserCheckedIn.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.prepareLink = this.prepareLink.bind(this);
        this.setError = this.setError.bind(this);
        this.navigate = this.navigate.bind(this);

        this.tabs = [
            {
                title: "Info",
                iconName: "info",
            },
            {
                title: "Reviews",
                iconName: "star",
            },
        ];

        this.state = {
            activeTab: "Info",
        };
    }

    static get propTypes() {
        return {
            userLocation: PropTypes.object,
            users: PropTypes.object,
            places: PropTypes.object,
            userCheckIns: PropTypes.object,
            checkIns: PropTypes.object,
            userReviews: PropTypes.object,

            // Passed props
            placeID: PropTypes.string,
        };
    }

    static defaultProps = {
        placeID: "ChIJ0TDQop8HzR0RaiQtFUpeRxs",
    };

    componentDidMount() {
        // In case the user has moved since opening the app, get their location
        this.props.dispatch({
            type: "getUserLocation",
        });
    }

    setTab(tab) {
        this.setState({
            activeTab: tab,
        });
    }

    hasUserCheckedIn() {
        // TODO: this is fired far too many times (try state or placeID as store prop)
        let hasUserCheckedIn;
        const userCheckIns = utilities.convertDictionaryToArray(
            this.props.userCheckIns,
        );

        for (let i = 0; i < userCheckIns.length; i++) {
            const checkInID = userCheckIns[i];
            if (this.props.checkIns[checkInID].placeID === this.props.placeID) {
                hasUserCheckedIn = true;
                break;
            }
        }

        return hasUserCheckedIn;
    }

    handleLink(link, linkType) {
        const preparedLink = this.prepareLink(link, linkType);

        Linking.canOpenURL(preparedLink)
            .then(supported => {
                if (!supported) {
                    this.setError("This link is not supported on your device.");
                } else {
                    return Linking.openURL(preparedLink);
                }
            })
            .catch(() => {
                this.setError(
                    "We were unable to open this link by your device.",
                );
            });
    }

    prepareLink(link, linkType) {
        if (linkType === "location") {
            return Platform.OS === "ios"
                ? `http://maps.apple.com/?ll=${link.lat},${link.lng}`
                : `geo:${link.lat},${link.lng}`;
        } else if (linkType === "phoneNumber") {
            return `tel:${link}`;
        } else if (linkType === "website") {
            return link;
        }
    }

    setError(message) {
        this.props.dispatch({
            type: "SET_ERROR",
            errorType: "LINKING",
            message,
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
        const place =
            this.props.places && this.props.places[this.props.placeID];

        const starRatingComponent = place &&
            place.rating && (
                <StarRating
                    rating={place.rating}
                    iconStyle={styles.starRatingIcon}
                    style={styles.starRatingContainer}
                />
            );

        const numberOfReviews =
            place &&
            place.reviews &&
            utilities.convertDictionaryToArray(place.reviews).length;

        const reviewsComponent = numberOfReviews && (
            <Label
                text={
                    numberOfReviews +
                    " review" +
                    (numberOfReviews > 1 ? "'s" : "")
                }
            />
        );

        const numberOfCheckIns =
            place &&
            place.checkIns &&
            utilities.convertDictionaryToArray(place.checkIns).length;

        const checkInsComponent = numberOfCheckIns && (
            <Label
                text={
                    numberOfCheckIns +
                    " check-in" +
                    (numberOfCheckIns > 1 ? "'s" : "")
                }
                handlePress={() =>
                    this.navigate("checkIns", {
                        placeID: this.props.placeID,
                    })
                }
            />
        );

        const relativeDistance =
            place &&
            this.props.userLocation &&
            utilities.getDistanceBetweenCoordinateSets(
                this.props.userLocation,
                place.location,
            );

        const relativeDistanceComponent = place &&
            this.props.userLocation && (
                <RelativeDistanceLabel
                    userLocation={this.props.userLocation}
                    placeLocation={place.location}
                />
            );

        const childrenBeforeComponent = (
            <View style={styles.headerContainer}>
                <Text style={styles.nameText}>{place && place.name}</Text>
                <View style={styles.labelsContainer}>
                    {relativeDistanceComponent}
                    {starRatingComponent}
                    {reviewsComponent}
                    {checkInsComponent}
                </View>
            </View>
        );

        const addressComponent =
            place && place.address ? (
                <InfoRow
                    iconName="location-on"
                    text={place.address}
                    handlePress={() =>
                        this.handleLink(place.location, "location")
                    }
                />
            ) : null;

        const phoneNumberComponent = place &&
            place.phoneNumber && (
                <InfoRow
                    iconName="phone"
                    text={place.phoneNumber}
                    handlePress={() =>
                        this.handleLink(place.phoneNumber, "phoneNumber")
                    }
                />
            );

        const websiteComponent = place &&
            place.website && (
                <InfoRow
                    iconName="web"
                    text={place.website}
                    handlePress={() =>
                        this.handleLink(place.website, "website")
                    }
                />
            );

        const businessHoursComponent = place &&
            place.openingHours && (
                <PlaceBusinessHours businessHours={place.openingHours} />
            );

        const hasUserCheckedIn = this.hasUserCheckedIn();

        const activeTabComponent =
            this.state.activeTab === "Info" ? (
                <View style={styles.tabContentContainer}>
                    <View>
                        {addressComponent}
                        {phoneNumberComponent}
                        {websiteComponent}
                        {businessHoursComponent}
                    </View>
                </View>
            ) : this.state.activeTab === "Reviews" ? (
                place && place.reviews ? (
                    <View style={styles.tabContentContainer}>
                        <ReviewList
                            data={
                                place &&
                                utilities.convertDictionaryToArray(
                                    place.reviews,
                                    true,
                                )
                            }
                            users={this.props.users}
                            handleProfilePress={uid =>
                                this.navigate("userProfile", {
                                    uid,
                                })
                            }
                        />
                    </View>
                ) : (
                    <View style={styles.tabContentContainer}>
                        <PlaceBlankState
                            text="write a review"
                            corks={100 /* TODO */}
                            handleTextPress={() =>
                                this.navigate("review", {
                                    placeID: this.props.placeID,
                                })
                            }
                            hasUserCheckedIn={hasUserCheckedIn}
                        />
                    </View>
                )
            ) : null;

        const childrenAfterComponent = (
            <View style={styles.contentWrapper}>{activeTabComponent}</View>
        );

        const hasUserReviewedPlace =
            this.state.activeTab === "Reviews" &&
            hasUserCheckedIn &&
            utilities.isKeyValuePairPresentInDictionary(
                { placeID: this.props.placeID },
                this.props.userReviews,
            );

        const actionButtonComponent =
            place && this.state.activeTab === "Info" ? (
                <CheckInButtonWidget
                    placeLocation={place.location}
                    placeID={this.props.placeID}
                    relativeDistance={relativeDistance}
                />
            ) : this.state.activeTab === "Reviews" && hasUserCheckedIn ? (
                <SecondaryButton
                    text={
                        hasUserReviewedPlace
                            ? "EDIT YOUR REVIEW"
                            : "WRITE A REVIEW"
                    }
                    iconName="mode-edit"
                    handlePress={() =>
                        this.navigate("review", {
                            placeID: this.props.placeID,
                            reviewID: hasUserReviewedPlace,
                        })
                    }
                />
            ) : (
                <CheckInButtonWidget
                    placeLocation={place.location}
                    placeID={this.props.placeID}
                    relativeDistance={relativeDistance}
                />
            );

        const maxHeaderHeight = 200;

        const photos =
            place.photos &&
            place.photos.map((photoReference, index) => {
                return utilities.getGooglePlacesPhotoURL(photoReference);
            });

        const mediaComponent = (
            <PhotoSlider photos={photos} height={maxHeaderHeight} />
        );

        return (
            <Page style={styles.container}>
                <ScrollHeader
                    showShadows
                    headerTranslucent
                    maxHeaderHeight={maxHeaderHeight}
                    minHeaderHeight={56}
                    // PhotoSlider
                    mediaComponent={mediaComponent}
                    // HeaderBar
                    statusBarColor={styleConstants.darkPrimary}
                    finalHeaderBackgroundColor={styleConstants.darkPrimary}
                    headerLeftIconName="chevron-left"
                    headerLeftIconStyle={styles.headerIcon}
                    handleHeaderLeftIconPress={() =>
                        this.navigate(null, null, true)
                    }
                    headerText={place && place.name}
                    headerTextStyle={styles.headerText}
                    headerStyle={styles.header}
                    // TabBar
                    tabs={this.tabs}
                    activeTab={this.state.activeTab}
                    handleTabPress={this.setTab}
                    tabBarBackgroundColor={styleConstants.white}
                    tabBarTextColor={styleConstants.secondaryText}
                    tabBarActiveTextColor={styleConstants.primary}
                    tabBarTabStyle={styles.tabBarTab}
                    tabBarActiveTabStyle={styles.activeTabBarTab}
                    tabBarTextStyle={styles.tabBarText}
                    tabBarStyle={styles.tabBar}
                    // ScrollView
                    bodyWrapperStyle={styles.contentWrapper}
                    bodyContainerStyle={styles.contentContainer}
                    tabBarWrapperComponent={null}
                    childrenBeforeTabBar={childrenBeforeComponent}
                    childrenAfterTabBar={childrenAfterComponent}
                />
                <View style={styles.actionButtonContainer}>
                    {actionButtonComponent}
                </View>
            </Page>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    header: {
        backgroundColor: "transparent",
    },
    headerText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
        textAlign: "center",
    },
    headerIcon: {
        fontSize: 30,
        color: styleConstants.white,
    },
    headerRightButtonsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerRightButton: {
        marginLeft: 16,
    },
    headerRightIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
    },

    contentWrapper: {
        alignSelf: "stretch",
        flex: 1,
        minHeight: styleConstants.windowHeight - 56 - 56,
    },
    contentContainer: {
        backgroundColor: styleConstants.white,
    },

    headerContainer: {
        padding: 16,
        paddingBottom: 12, // - 4 from labels
        backgroundColor: styleConstants.darkPrimary,
    },
    nameText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
        marginBottom: 8,
    },
    labelsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    starRatingContainer: {
        backgroundColor: styleConstants.transBlack,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        marginRight: 4,
        alignItems: "center",
        marginBottom: 4,
    },
    starRatingIcon: {
        color: styleConstants.secondary,
    },

    tabBar: {
        backgroundColor: styleConstants.white,
    },
    tabBarTab: {
        paddingBottom: 2,
    },
    activeTabBarTab: {
        borderBottomWidth: 2,
        borderBottomColor: styleConstants.primary,
        paddingBottom: 0,
    },
    tabBarText: {
        fontSize: styleConstants.smallFont,
        ...styleConstants.primaryFont,
    },

    tabContentContainer: {
        flex: 1,
        alignSelf: "stretch",
        paddingBottom: 40 + 16 + 16, // action button
    },

    actionButtonContainer: {
        position: "absolute",
        bottom: 16,
        right: 16,
    },
});

function mapStateToProps(state) {
    return {
        userLocation: state.main.appState.userLocation,
        places: state.main.appData.app && state.main.appData.app.places,
        users: state.main.appData.users,
        userCheckIns:
            state.main.appData.users &&
            state.main.appData.users[state.main.userAuth.uid] &&
            state.main.appData.users[state.main.userAuth.uid].checkIns,
        checkIns: state.main.appData.app && state.main.appData.app.checkIns,
        userReviews:
            state.main.appData.users &&
            state.main.appData.users[state.main.userAuth.uid] &&
            state.main.appData.users[state.main.userAuth.uid].reviews,
        uid: state.main.userAuth.uid,
    };
}

export default connect(mapStateToProps)(Place);
