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
import UserProfilePhoto from "../components/UserProfilePhoto";
import Label from "../components/Label";
import ReviewList from "../lists/ReviewList";
import SecondaryButton from "../components/SecondaryButton";
import PhotoCaptureWidget from "../widgets/PhotoCaptureWidget";
import EditFieldWidget from "../widgets/EditFieldWidget";

export class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.setTab = this.setTab.bind(this);
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
            reviews: PropTypes.object,
            userUID: PropTypes.string, // used to identify if own user's profile

            // Passed props
            uid: PropTypes.string,
        };
    }

    static defaultProps = {
        uid: "3gekV279B5Sg00gTX0c5L3eKoV12",
    };

    setTab(tab) {
        this.setState({
            activeTab: tab,
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
        const user = this.props.users && this.props.users[this.props.uid];

        const numberOfReviews =
            user &&
            user.reviews &&
            utilities.convertDictionaryToArray(user.reviews).length;

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
            user &&
            user.checkIns &&
            utilities.convertDictionaryToArray(user.checkIns).length;

        const checkInsComponent = numberOfCheckIns && (
            <Label
                text={
                    numberOfCheckIns +
                    " check-in" +
                    (numberOfCheckIns > 1 ? "'s" : "")
                }
                handlePress={() =>
                    this.navigate("checkIns", {
                        uid: this.props.uid,
                    })
                }
            />
        );

        const isUsersProfile = this.props.uid === this.props.userUID;

        const nameTextComponent = isUsersProfile ? (
            <EditFieldWidget
                value={user && user.name}
                fieldNode={`users/${this.props.uid}/name`}
                textStyle={styles.nameText}
                style={styles.nameTextContainer}
            />
        ) : (
            <Text style={styles.nameText}>{user && user.name}</Text>
        );

        const childrenBeforeComponent = (
            <View style={styles.headerContainer}>
                {nameTextComponent}
                <View style={styles.labelsContainer}>
                    <Label text={user && user.status} highlight />
                    {reviewsComponent}
                    {checkInsComponent}
                </View>
            </View>
        );

        const maxHeaderHeight = 200;

        const photoCaptureWidgetComponent = isUsersProfile && (
            <PhotoCaptureWidget
                photoURL={user && user.photoURL}
                photoStorageNode={`${
                    this.props.uid
                }.${config.resizedImages.format.toLowerCase()}`}
                photoURLNode={`users/${this.props.uid}/photoURL`}
                style={styles.photoCaptureWidget}
            />
        );

        // TODO: Only show the PhotoCaptureWidget if on own user's profile
        const mediaComponent = (
            <View
                style={[
                    styles.profilePhotoContainer,
                    {
                        height: maxHeaderHeight,
                    },
                ]}>
                <UserProfilePhoto photoURL={user && user.photoURL} size={120} />
                {photoCaptureWidgetComponent}
            </View>
        );

        let activeTabComponent;

        if (this.state.activeTab === "Info") {
            activeTabComponent = (
                <View>
                    <Text>Date joined?</Text>
                    <Text>Corks earned</Text>
                    <Text>Level status</Text>
                    <Text>Special abilities</Text>
                </View>
            );
        } else if (this.state.activeTab === "Reviews") {
            const userReviews = utilities
                .convertDictionaryToArray(user.reviews)
                .map((reviewID, index) => {
                    return {
                        ...this.props.reviews[reviewID],
                        id: reviewID,
                    };
                });

            activeTabComponent = (
                <ReviewList
                    data={userReviews}
                    users={this.props.users}
                    places={this.props.places}
                    handleProfilePress={null /* Already on user's profile */}
                    handlePlacePress={placeID =>
                        this.navigate("place", { placeID })
                    }
                />
            );
        }

        const childrenAfterComponent = (
            <View style={styles.contentWrapper}>
                <View style={styles.tabContentContainer}>
                    {activeTabComponent}
                </View>
            </View>
        );

        return (
            <Page style={styles.container}>
                <ScrollHeader
                    showShadows
                    disableOpacityAnimation
                    maxHeaderHeight={maxHeaderHeight}
                    minHeaderHeight={56}
                    mediaComponent={mediaComponent}
                    // HeaderBar
                    statusBarColor={styleConstants.darkPrimary}
                    finalHeaderBackgroundColor={styleConstants.darkPrimary}
                    headerLeftIconName="chevron-left"
                    headerLeftIconStyle={styles.headerIcon}
                    handleHeaderLeftIconPress={() =>
                        this.navigate(null, null, true)
                    }
                    headerText={user && user.name}
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

    profilePhotoContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 56, // header
    },
    photoCaptureWidget: {
        position: "absolute",
        bottom: 12,
        right: 0,
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
    nameTextContainer: {
        marginBottom: 8,
    },
    nameText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
    labelsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
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
});

function mapStateToProps(state) {
    return {
        userLocation: state.main.appState.userLocation,
        users: state.main.appData.users,
        places: state.main.appData.app && state.main.appData.app.places,
        reviews: state.main.appData.app && state.main.appData.app.reviews,
        userUID: state.main.userAuth.uid,
    };
}

export default connect(mapStateToProps)(UserProfile);
