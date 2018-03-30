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
import RelativeDistanceLabel from "../components/RelativeDistanceLabel";
import Label from "../components/Label";
import InfoRow from "../components/InfoRow";
import CheckInButtonWidget from "../widgets/CheckInButtonWidget";
import ReviewsList from "../lists/ReviewsList";
import PlaceBlankState from "../components/PlaceBlankState";
import SecondaryButton from "../components/SecondaryButton";

export class Place extends React.Component {
    constructor(props) {
        super(props);

        this.setTab = this.setTab.bind(this);
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
            places: PropTypes.object,
            userCheckIns: PropTypes.array,

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

    navigate(page, goBack, props) {
        if (goBack) {
            Actions.pop();
        } else {
            Actions[page](props);
        }
    }

    render() {
        const place =
            this.props.places && this.props.places[this.props.placeID];

        const imageURL =
            place && utilities.getGooglePlacesPhoto(place.photoReference);

        const starRatingComponent = place &&
            place.rating && (
                <StarRating
                    rating={place.rating}
                    iconStyle={styles.starRatingIcon}
                    style={styles.starRatingContainer}
                />
            );

        const reviewsComponent = place &&
            place.reviews &&
            place.reviews.length && (
                <Label text={place.reviews.length + " reviews"} />
            );

        const numberOfCheckIns =
            place &&
            place.checkIns &&
            utilities.convertDictionaryToArray(place.checkIns).length;

        const checkInsComponent = place &&
            place.checkIns && (
                <Label
                    text={
                        numberOfCheckIns +
                        " check-in" +
                        (numberOfCheckIns > 1 ? "'s" : "")
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
                <View>
                    <InfoRow iconName="alarm" text="Business hours" isHeader />
                    {place.openingHours.map((item, index) => {
                        return (
                            <InfoRow
                                key={item}
                                text={item}
                                isBusinessHours
                                isHighlighted={utilities.isToday(
                                    item.split(":")[0],
                                )}
                            />
                        );
                    })}
                </View>
            );

        const isCheckedIn =
            this.props.userCheckIns &&
            utilities.isValueInArray(
                this.props.placeID,
                this.props.userCheckIns,
            );

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
                        <ReviewsList
                            data={place.reviews}
                            users={this.props.users}
                            handleProfilePress={
                                null /* TODO: Go to person's profile */
                            }
                        />
                    </View>
                ) : (
                    <View style={styles.tabContentContainer}>
                        <PlaceBlankState
                            text="write a review"
                            corks={100 /* TODO */}
                            handleTextPress={null}
                            isCheckedIn={isCheckedIn}
                        />
                    </View>
                )
            ) : null;

        const childrenAfterComponent = (
            <View style={styles.contentWrapper}>{activeTabComponent}</View>
        );

        const actionButtonComponent =
            place && this.state.activeTab === "Info" ? (
                <CheckInButtonWidget
                    placeLocation={place.location}
                    placeID={this.props.placeID}
                    relativeDistance={relativeDistance}
                />
            ) : (
                this.state.activeTab === "Reviews" &&
                isCheckedIn && (
                    <SecondaryButton
                        text="WRITE A REVIEW"
                        iconName="mode-edit"
                        handlePress={null}
                    />
                )
            );

        return (
            <Page style={styles.container}>
                <ScrollHeader
                    showShadows
                    headerTranslucent
                    maxHeaderHeight={200}
                    minHeaderHeight={56}
                    // Image
                    imageURL={imageURL}
                    // HeaderBar
                    statusBarColor={styleConstants.darkPrimary}
                    finalHeaderBackgroundColor={styleConstants.darkPrimary}
                    headerLeftIconName="chevron-left"
                    headerLeftIconStyle={styles.headerIcon}
                    handleHeaderLeftIconPress={() => this.navigate(null, true)}
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

function mapStateToProps(state) {
    return {
        userLocation: state.main.appState.userLocation,
        places: state.main.appData.app && state.main.appData.app.places,
        users: state.main.appData.users,
        userCheckIns:
            state.main.appData.users &&
            state.main.appData.users[state.main.userAuth.uid] &&
            utilities.convertDictionaryToArray(
                state.main.appData.users[state.main.userAuth.uid].checkIns,
            ),
    };
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

export default connect(mapStateToProps)(Place);
