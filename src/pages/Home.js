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
import Analytics from "../analytics";

import {
    Page,
    HeaderBar,
    Touchable,
    TabBar,
    ButtonIcon,
} from "react-native-simple-components";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomIcon from "../assets/icons";
import { AnimateScale } from "react-native-simple-animators";
import FindPlaceModal from "../modals/FindPlaceModal";
import PlaceList from "../lists/PlaceList";
import InfoBlock from "../components/InfoBlock";
import SideMenu from "react-native-side-menu";
import SideMenuComponent from "../components/SideMenuComponent";
import Logo from "../components/Logo";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.setTab = this.setTab.bind(this);
        this.showFindPlaceModal = this.showFindPlaceModal.bind(this);
        this.togglePlaceModal = this.togglePlaceModal.bind(this);
        this.toggleActionSheet = this.toggleActionSheet.bind(this);
        this.linkToLocation = this.linkToLocation.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.closeSideMenu = this.closeSideMenu.bind(this);
        this.toggleSideMenu = this.toggleSideMenu.bind(this);
        this.onSideMenuNavigate = this.onSideMenuNavigate.bind(this);
        this.navigate = this.navigate.bind(this);

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
                iconName: "home",
            },
        ];

        this.state = {
            activeTab: "Featured",
            animateFindPlaceModal: false,
            showFindPlaceModal: false,
        };
    }

    static get propTypes() {
        return {
            userLocation: PropTypes.object,
            places: PropTypes.object,
            featuredPlaces: PropTypes.array,
            uid: PropTypes.string,
            userPlaces: PropTypes.array,
            networkType: PropTypes.string,
            showSideMenu: PropTypes.bool,
        };
    }

    setTab(tab) {
        this.setState({
            activeTab: tab,
        });
    }

    showFindPlaceModal() {
        Analytics.logEvent("find_place");

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
        this.props.dispatch({
            type: "SET_ACTION_SHEET",
            place,
        });
    }

    linkToLocation(location) {
        Analytics.logEvent("navigate_to_place");

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

    closeSideMenu(isOpen) {
        if (!isOpen && this.props.showSideMenu) {
            this.toggleSideMenu();
        }
    }

    toggleSideMenu(isOpen) {
        this.props.dispatch({
            type: "TOGGLE_SIDE_MENU",
        });
    }

    onSideMenuNavigate(page) {
        this.toggleSideMenu();

        if (page !== "home") {
            Analytics.logEvent("view_" + page + "_page");

            Actions[page]();
        }
    }

    navigate(page) {
        // Close the action sheet if it's open
        this.toggleActionSheet();

        Actions[page]();
    }

    render() {
        const findPlaceButton = !this.state.animateFindPlaceModal ? (
            <Touchable
                onPress={this.showFindPlaceModal}
                style={styles.findPlaceButton}>
                <CustomIcon name="logo" style={styles.findPlaceButtonIcon} />
            </Touchable>
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
                handleLinkToLocation={this.linkToLocation}
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
                } else {
                    blankState = (
                        <View
                            style={{
                                backgroundColor: styleConstants.white,
                            }}>
                            <InfoBlock
                                title="Turn water into wine."
                                description="Start visiting Places, mark them as visited and they'll end up here. Get cracking omigo!"
                            />
                        </View>
                    );
                }
            }

            placesComponent = (
                <PlaceList
                    data={places}
                    userLocation={this.props.userLocation}
                    handlePress={this.toggleActionSheet}
                    userPlaces={this.props.userPlaces}
                    scrollToTop={this.state.activeTab}
                    networkType={this.props.networkType}
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

        // Tablets
        const sideMenuWidth =
            styleConstants.windowWidth > 700
                ? styleConstants.windowWidth / 3
                : styleConstants.windowWidth * 2 / 3;

        return (
            <Page style={styles.container}>
                <SideMenu
                    menu={
                        <SideMenuComponent
                            handlePress={this.onSideMenuNavigate}
                        />
                    }
                    isOpen={this.props.showSideMenu}
                    onChange={this.closeSideMenu}
                    openMenuOffset={sideMenuWidth}>
                    <LinearGradient
                        colors={[
                            styleConstants.primary,
                            styleConstants.darkPrimary,
                        ]}
                        style={styles.headerContainer}>
                        <HeaderBar
                            leftIconName="menu"
                            leftIconStyle={styles.headerIcon}
                            handleLeftIconPress={this.toggleSideMenu}
                            style={styles.header}
                            statusBarColor={
                                Platform.OS === "android"
                                    ? this.state.animateFindPlaceModal
                                      ? styleConstants.secondary
                                      : styleConstants.primary
                                    : null
                            }
                            textComponent={<Logo />}
                        />
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
                </SideMenu>
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
        networkType: state.main.appState.networkType,
        showSideMenu: state.main.appState.showSideMenu,
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConstants.white,
    },
    headerContainer: {
        alignSelf: "stretch",
        ...styleConstants.largeShadow,
        backgroundColor: styleConstants.white,
        borderWidth: 0,
    },
    header: {
        backgroundColor: "transparent",
    },
    headerIconContainer: {
        paddingLeft: 16,
        justifyContent: "center",
    },
    headerIcon: {
        color: styleConstants.white,
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
        width: 56,
        height: 56,
        borderRadius: 28,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundColor: styleConstants.secondary,
        ...styleConstants.largeShadow,
        borderWidth: 0,
    },
    findPlaceButtonIcon: {
        fontSize: 32,
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
        backgroundColor: styleConstants.white,
    },
});

export default connect(mapStateToProps)(Home);
