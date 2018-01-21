import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Platform,
    Linking,
    StatusBar,
} from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import {
    Page,
    Touchable,
    TabBar,
    ButtonIcon,
    ActionSheet,
} from "react-native-simple-components";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AnimateScale } from "react-native-simple-animators";
import FindPlaceModal from "../modals/FindPlaceModal";
import PlaceList from "../lists/PlaceList";
import SnackBar from "../widgets/SnackBar";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.setPrimaryTab = this.setPrimaryTab.bind(this);
        this.setSecondaryTab = this.setSecondaryTab.bind(this);
        this.navigate = this.navigate.bind(this);
        this.showFindPlaceModal = this.showFindPlaceModal.bind(this);
        this.togglePlaceModal = this.togglePlaceModal.bind(this);
        this.toggleActionSheet = this.toggleActionSheet.bind(this);
        this.selectActionSheetItem = this.selectActionSheetItem.bind(this);
        this.linkToLocation = this.linkToLocation.bind(this);

        this.primaryTabs = [
            {
                title: "Home",
                iconName: "home",
            },
            {
                title: "Profile",
                iconName: "person",
            },
        ];

        this.secondaryTabs = [
            {
                title: "Featured",
                iconName: "favorite",
            },
            {
                title: "Close To Me",
                iconName: "location-on",
            },
        ];

        this.state = {
            activePrimaryTab: "Home",
            activeSecondaryTab: "Featured",
            animateFindPlaceModal: false,
            showFindPlaceModal: false,
            showActionSheetForPlace: false,
        };
    }

    static get propTypes() {
        return {
            userLocation: PropTypes.object,
            places: PropTypes.object,
            featuredPlaces: PropTypes.array,
            uid: PropTypes.string,
            userPlaces: PropTypes.array,
        };
    }

    setPrimaryTab(tab) {
        if (tab === "Home") {
            // Already on home tab
        }
        // else if (tab === "Profile") {
        //     Actions.profile();
        // }
    }

    setSecondaryTab(tab) {
        this.setState({
            activeSecondaryTab: tab,
        });
    }

    navigate(page, goBack, props) {
        if (goBack) {
            Actions.pop();
        } else {
            Actions[page](props);
        }
    }

    showFindPlaceModal() {
        this.setState({
            animateFindPlaceModal: true,
        });

        setTimeout(() => {
            this.togglePlaceModal();
        }, 750);
    }

    togglePlaceModal(close) {
        this.setState({
            showFindPlaceModal: !this.state.showFindPlaceModal,
            animateFindPlaceModal: close ? false : true,
        });
    }

    toggleActionSheet(place) {
        this.setState({
            showActionSheetForPlace: place,
        });
    }

    selectActionSheetItem(item) {
        if (item === "Cancel") {
            this.toggleActionSheet();
        } else if (item === "Go here" || item === "Visit again") {
            this.linkToLocation(this.state.showActionSheetForPlace.location);

            // Clear place from state
            this.toggleActionSheet();
        } else {
            let data = this.props.userPlaces ? this.props.userPlaces : [];

            // Check if the user has already been here
            const isVisited = utilities.isValueInArray(
                this.state.showActionSheetForPlace.id,
                data,
                true,
            );

            if (isVisited || isVisited === 0) {
                data.splice(isVisited, 1);
            } else {
                data.push(this.state.showActionSheetForPlace.id);
            }

            // Mark as visited
            this.props.dispatch({
                type: "setData",
                node: "users/" + this.props.uid + "/visited",
                data,
                nextAction: {
                    type: "SET_ERROR",
                    errorType: "CLOUD_DATA",
                    message:
                        this.state.showActionSheetForPlace.name +
                        " has been marked as " +
                        (isVisited || isVisited === 0
                            ? "not visited"
                            : "visited"),
                    autoHide: true,
                },
            });

            // Clear place from state
            this.toggleActionSheet();
        }
    }

    linkToLocation(location) {
        let link;

        // Create the appropriate link
        if (Platform.OS === "android") {
            link = "geo:" + location.lat + "," + location.lng;
        } else {
            link = `http://maps.apple.com/?ll=${location.lat},${location.lng}`;
        }

        Linking.canOpenURL(link)
            .then(supported => {
                if (!supported) {
                    this.props.dispatch({
                        type: "SET_ERROR",
                        errorType: "LINKING",
                        message: "This link is not supported on your device.",
                        iconName: "error-outline",
                    });
                } else {
                    return Linking.openURL(link);
                }
            })
            .catch(() => {
                this.props.dispatch({
                    type: "SET_ERROR",
                    errorType: "LINKING",
                    message: "This link is not supported on your device.",
                    iconName: "error-outline",
                });
            });
    }

    render() {
        const findPlaceButton = !this.state.animateFindPlaceModal ? (
            <ButtonIcon
                iconName="local-drink"
                iconStyle={styles.findPlaceButtonIcon}
                style={styles.findPlaceButton}
                handlePress={this.showFindPlaceModal}
                showShadow
            />
        ) : (
            <AnimateScale
                initialValue={1}
                finalValue={24}
                shouldAnimateIn
                duration={500}
                style={{ elevation: 13 /* appear above header */ }}>
                <View style={styles.findPlaceButtonContainer} />
            </AnimateScale>
        );

        const findPlaceModal = this.state.showFindPlaceModal && (
            <FindPlaceModal
                handleClose={() => this.togglePlaceModal(true)}
                places={this.props.places}
                userLocation={this.props.userLocation}
                userPlaces={this.props.userPlaces}
                handleButtonPress={this.linkToLocation}
            />
        );

        let placesComponent;
        let places = [];

        if (this.props.places) {
            if (this.state.activeSecondaryTab === "Featured") {
                // Featured places
                this.props.featuredPlaces.map(placeID => {
                    places.push({
                        ...this.props.places[placeID],
                        id: placeID,
                    });
                });
            } else {
                // Places close to me
                places = utilities.convertDictionaryToArray(
                    this.props.places,
                    true,
                );

                places.map(place => {
                    const relativeDistance = Math.round(
                        utilities.getDistanceBetweenCoordinateSets(
                            this.props.userLocation,
                            place.location,
                        ),
                    );

                    place["relativeDistance"] = relativeDistance;
                });

                places = utilities.sortArrayOfObjectsByKey(
                    places,
                    "relativeDistance",
                );
            }
            placesComponent = (
                <PlaceList
                    data={places}
                    userLocation={this.props.userLocation}
                    handlePress={this.toggleActionSheet}
                    userPlaces={this.props.userPlaces}
                />
            );
        } else {
            // Loading state
            placesComponent = (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator
                        size="large"
                        color={styleConstants.primary}
                    />
                </View>
            );
        }

        let actionSheet;

        if (this.state.showActionSheetForPlace) {
            const isVisited =
                this.props.userPlaces &&
                utilities.isValueInArray(
                    this.state.showActionSheetForPlace.id,
                    this.props.userPlaces,
                );

            actionSheet = (
                <ActionSheet
                    options={[
                        {
                            text: isVisited ? "Visit again" : "Go here",
                            iconName: "location-on",
                        },
                        {
                            text:
                                "Mark as " +
                                (isVisited ? "not visited" : "visited"),
                            iconName: isVisited
                                ? "indeterminate-check-box"
                                : "check-box",
                        },
                    ]}
                    handlePress={this.selectActionSheetItem}
                    textStyle={styles.actionSheetText}
                />
            );
        }

        return (
            <Page>
                <LinearGradient
                    colors={[
                        styleConstants.primary,
                        styleConstants.darkPrimary,
                    ]}
                    style={styles.headerContainer}>
                    <StatusBar
                        backgroundColor={
                            this.state.animateFindPlaceModal
                                ? styleConstants.secondary
                                : styleConstants.primary
                        }
                    />
                    <Touchable
                        onPress={() => Actions.search()}
                        style={styles.searchBar}>
                        <Icon name="search" style={styles.searchBarIcon} />
                        <Text style={styles.searchBarText}>
                            Search Wine Farms
                        </Text>
                    </Touchable>
                    <TabBar
                        backgroundColor="transparent"
                        textColor={styleConstants.transWhite}
                        activeTextColor={styleConstants.white}
                        tabs={this.secondaryTabs}
                        activeTab={this.state.activeSecondaryTab}
                        tabStyle={styles.secondaryTabBarTab}
                        activeTabStyle={styles.secondaryTabBarActiveTab}
                        handleTabPress={tab => this.setSecondaryTab(tab)}
                        textStyle={styles.secondaryTabBarText}
                    />
                </LinearGradient>
                {placesComponent}
                <TabBar
                    textColor={styleConstants.secondaryText}
                    activeTextColor={styleConstants.primary}
                    tabs={this.primaryTabs}
                    activeTab={this.state.activePrimaryTab}
                    tabStyle={styles.primaryTabBarTab}
                    activeTabStyle={styles.primaryTabBarActiveTab}
                    handleTabPress={tab => this.setPrimaryTab(tab)}
                    textStyle={styles.primaryTabBarText}
                    showShadow
                    style={styles.primaryTabBar}
                />
                <View style={styles.findPlaceButtonWrapper}>
                    {findPlaceButton}
                </View>
                {findPlaceModal}
                <SnackBar />
                {actionSheet}
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        userLocation: state.main.appState.userLocation,
        places: state.main.appData.app && state.main.appData.app.places,
        featuredPlaces:
            state.main.appData.app && state.main.appData.app.featuredPlaces,
        uid: state.main.userAuth.uid,
        userPlaces:
            state.main.appData.users &&
            state.main.appData.users[state.main.userAuth.uid] &&
            state.main.appData.users[state.main.userAuth.uid].visited,
    };
}

const styles = StyleSheet.create({
    headerContainer: {
        alignSelf: "stretch",
        ...styleConstants.largeShadow,
    },
    searchBar: {
        marginTop: 12,
        marginBottom: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: styleConstants.transBlack,
        paddingVertical: 12,
        height: 52,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    searchBarIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
        marginRight: 8,
    },
    searchBarText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.transWhite,
        ...styleConstants.primaryFont,
    },
    bodyWrapper: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: styleConstants.white,
    },
    bodyContainer: {
        padding: 16,
    },
    findPlaceButtonWrapper: {
        position: "absolute",
        bottom: 56 + 16,
        right: 16,
    },
    findPlaceButtonContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: styleConstants.secondary,
    },
    findPlaceButton: {
        backgroundColor: styleConstants.secondary,
    },
    findPlaceButtonIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
    },
    primaryTabBar: {
        backgroundColor: styleConstants.white,
    },
    primaryTabBarTab: {
        paddingBottom: 2,
    },
    primaryTabBarActiveTab: {
        borderBottomWidth: 2,
        borderBottomColor: styleConstants.primary,
        paddingBottom: 0,
    },
    primaryTabBarText: {
        ...styleConstants.primaryFont,
        fontSize: styleConstants.smallFont,
    },
    secondaryTabBarTab: {
        paddingBottom: 2,
    },
    secondaryTabBarActiveTab: {
        borderBottomWidth: 2,
        borderBottomColor: styleConstants.white,
        paddingBottom: 0,
    },
    secondaryTabBarText: {
        ...styleConstants.primaryFont,
        fontSize: styleConstants.smallFont,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
    },
    actionSheetText: {
        fontSize: styleConstants.regularFont,
        ...styleConstants.primaryFont,
    },
});

export default connect(mapStateToProps)(Home);
