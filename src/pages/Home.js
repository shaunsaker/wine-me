import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Platform,
    Linking,
    Share,
} from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import {
    Page,
    StatusBarComponent,
    Touchable,
    TouchableIcon,
    TabBar,
    ButtonIcon,
} from "react-native-simple-components";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AnimateScale } from "react-native-simple-animators";
import FindPlaceModal from "../modals/FindPlaceModal";
import PlaceList from "../lists/PlaceList";
import BlankState from "../components/BlankState";
import HomeMenu from "../menus/HomeMenu";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.setTab = this.setTab.bind(this);
        this.showFindPlaceModal = this.showFindPlaceModal.bind(this);
        this.togglePlaceModal = this.togglePlaceModal.bind(this);
        this.showActionSheet = this.showActionSheet.bind(this);
        this.linkToLocation = this.linkToLocation.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleSelectMenuItem = this.handleSelectMenuItem.bind(this);

        this.tabs = [
            {
                title: "Featured",
                iconName: "favorite",
            },
            {
                title: "Close To Me",
                iconName: "location-on",
            },
            {
                title: "My Places",
                iconName: "local-drink",
            },
        ];

        this.state = {
            activeTab: "Featured",
            animateFindPlaceModal: false,
            showFindPlaceModal: false,
            showMenu: false,
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

    setTab(tab) {
        this.setState({
            activeTab: tab,
        });
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

    showActionSheet(place) {
        this.props.dispatch({
            type: "TOGGLE_ACTION_SHEET",
            place,
        });
    }

    linkToLocation(location) {
        let link;

        // Create the appropriate link
        if (Platform.OS === "android") {
            link = "geo:" + location.lat + "," + location.lng;
        } else {
            link = `http://maps.apple.com/?ll=${location.lat},${location.lng}`;
        }

        this.handleLink(link);
    }

    handleLink(link) {
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

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu,
        });
    }

    handleSelectMenuItem(item) {
        if (item === "About") {
            Actions.about();
        } else if (item === "Get in touch") {
            this.handleLink("mailto:info@shaunsaker.com?subject=WineMe");
        } else {
            // Analytics.logEvent("share_result");

            let shareMessage = "Download WineMe: X"; // TODO

            Share.share(
                {
                    message: shareMessage,
                    title: "WineMe",
                    url: "X", // iOS only
                },
                {
                    subject: "X", // iOS only
                    tintColor: styleConstants.primary, // iOS only
                    dialogTitle: "X", // android only
                },
            );
        }

        this.toggleMenu();
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
                finalValue={
                    2 +
                    styleConstants.windowWidth *
                        styleConstants.windowHeight /
                        10000
                }
                shouldAnimateIn
                duration={500}
                style={{
                    elevation: 101,
                    zIndex: 2 /* appear above header */,
                }}>
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
        let blankState;

        if (this.props.places) {
            if (this.state.activeTab === "Featured") {
                // Featured places
                this.props.featuredPlaces.map(placeID => {
                    places.push({
                        ...this.props.places[placeID],
                        id: placeID,
                    });
                });
            } else if (this.state.activeTab === "Close To Me") {
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
            } else {
                // My Places
                if (this.props.userPlaces) {
                    places = utilities.convertDictionaryToArray(
                        this.props.places,
                        true,
                    );

                    places = places.filter(place => {
                        // Only if we have been there
                        return utilities.isValueInArray(
                            place.id,
                            this.props.userPlaces,
                        );
                    });

                    // NOTE: Order should be latest to oldest
                } else {
                    blankState = (
                        <BlankState
                            title="Turn water into wine."
                            description="Start visiting Places, mark them as visited and they'll end up here. Get cracking omigo!"
                        />
                    );
                }
            }

            placesComponent = (
                <PlaceList
                    data={places}
                    userLocation={this.props.userLocation}
                    handlePress={this.showActionSheet}
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

        const homeMenu = this.state.showMenu && (
            <HomeMenu handleSelect={this.handleSelectMenuItem} />
        );

        return (
            <Page style={styles.container}>
                <LinearGradient
                    colors={[
                        styleConstants.primary,
                        styleConstants.darkPrimary,
                    ]}
                    style={styles.headerContainer}>
                    <StatusBarComponent
                        backgroundColor={
                            Platform.OS === "android"
                                ? this.state.animateFindPlaceModal
                                  ? styleConstants.secondary
                                  : styleConstants.primary
                                : null
                        }
                        barStyle="light-content"
                    />
                    <View style={styles.header}>
                        <Touchable
                            onPress={() => Actions.search()}
                            style={styles.searchBar}>
                            <Icon name="search" style={styles.searchBarIcon} />
                            <Text style={styles.searchBarText}>
                                Search Places
                            </Text>
                        </Touchable>
                        <TouchableIcon
                            iconName="more-vert"
                            iconStyle={styles.headerIcon}
                            style={styles.headerIconContainer}
                            handlePress={this.toggleMenu}
                        />
                    </View>
                    <TabBar
                        backgroundColor="transparent"
                        textColor={styleConstants.transWhite}
                        activeTextColor={styleConstants.white}
                        tabs={this.tabs}
                        activeTab={this.state.activeTab}
                        tabStyle={styles.tabBarTab}
                        activeTabStyle={styles.tabBarActiveTab}
                        handleTabPress={tab => this.setTab(tab)}
                        textStyle={styles.tabBarText}
                    />
                </LinearGradient>
                {blankState}
                {placesComponent}
                <View style={styles.findPlaceButtonWrapper}>
                    {findPlaceButton}
                </View>
                {findPlaceModal}
                {homeMenu}
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
    container: {
        backgroundColor: styleConstants.white,
    },
    headerContainer: {
        alignSelf: "stretch",
        ...styleConstants.largeShadow,
        paddingTop: Platform.OS === "ios" ? 22 : 0,
        backgroundColor: styleConstants.white,
        borderWidth: 0,
    },
    header: {
        flexDirection: "row",
    },
    headerIconContainer: {
        paddingRight: 16,
        justifyContent: "center",
    },
    headerIcon: {
        color: styleConstants.white,
    },
    searchBar: {
        flex: 1,
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
        bottom: 16,
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
    tabBarTab: {
        paddingBottom: 2,
    },
    tabBarActiveTab: {
        borderBottomWidth: 2,
        borderBottomColor: styleConstants.white,
        paddingBottom: 0,
    },
    tabBarText: {
        ...styleConstants.primaryFont,
        fontSize: styleConstants.smallFont,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
    },
});

export default connect(mapStateToProps)(Home);
