import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Platform,
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
import SideMenu from "react-native-side-menu";
import SideMenuComponent from "../components/SideMenuComponent";
import Logo from "../components/Logo";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomIcon from "../assets/icons";
import { AnimateScale } from "react-native-simple-animators";
import FindPlaceModal from "../modals/FindPlaceModal";
import PlaceList from "../lists/PlaceList";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.setTab = this.setTab.bind(this);
        this.showFindPlaceModal = this.showFindPlaceModal.bind(this);
        this.togglePlaceModal = this.togglePlaceModal.bind(this);
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
                title: "Top Rated",
                iconName: "star",
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
            userCheckIns: PropTypes.object,
            checkIns: PropTypes.object,
            showSideMenu: PropTypes.bool,
            isOnline: PropTypes.bool,
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

            let props;
            if (page === "userProfile") {
                // If we're going to the user's profile, attach the uid
                props = {
                    uid: this.props.uid,
                };
            }

            this.navigate(page, props);
        }
    }

    navigate(page, props, goBack) {
        if (goBack) {
            Actions.pop();
        } else {
            Actions[page](props);
        }
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
                userCheckIns={this.props.userCheckIns}
                handlePress={null}
            />
        );

        let placesComponent;
        let places = [];

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

                // Calculate the relative distance to each place
                places = places.map((place, index) => {
                    return {
                        ...place,
                        relativeDistance: utilities.getDistanceBetweenCoordinateSets(
                            place.location,
                            this.props.userLocation,
                        ),
                    };
                });

                // Sort
                places = utilities.sortArrayOfObjectsByKey(
                    places,
                    "relativeDistance",
                );
            } else {
                // Top rated places
                places = utilities.convertDictionaryToArray(
                    this.props.places,
                    true,
                );

                // Sort
                // Add rating for sort
                places = places.map((place, index) => {
                    return {
                        ...place,
                        rating: place.rating ? place.rating : 0,
                        reviewCount: utilities.convertDictionaryToArray(
                            place.reviews,
                        ),
                    };
                });
                // Rating takes precedence over reviewCount
                places = utilities.sortArrayOfObjectsByKey(
                    places,
                    "reviewCount",
                );
                places = utilities.sortArrayOfObjectsByKey(places, "rating");
                places.reverse();
            }

            placesComponent = (
                <PlaceList
                    data={places}
                    userLocation={this.props.userLocation}
                    handlePress={placeID => this.navigate("place", { placeID })}
                    userCheckIns={this.props.userCheckIns}
                    checkIns={this.props.checkIns}
                    scrollToTop={this.state.activeTab}
                    isOnline={this.props.isOnline}
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
                    <View style={styles.headerContainer}>
                        <HeaderBar
                            leftIconName={this.props.places && "menu"}
                            leftIconStyle={styles.headerIcon}
                            handleLeftIconPress={this.toggleSideMenu}
                            textComponent={<Logo />}
                            rightIconName="search"
                            rightIconStyle={styles.headerIcon}
                            handleRightIconPress={() => this.navigate("search")}
                            style={styles.header}
                            statusBarColor={
                                Platform.OS === "android"
                                    ? this.state.animateFindPlaceModal
                                        ? styleConstants.secondary
                                        : styleConstants.primary
                                    : null
                            }
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
                    </View>
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConstants.white,
    },
    headerContainer: {
        alignSelf: "stretch",
        ...styleConstants.largeShadow,
        backgroundColor: styleConstants.darkPrimary,
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

function mapStateToProps(state) {
    return {
        userLocation: state.main.appState.userLocation,
        places: state.main.appData.app && state.main.appData.app.places,
        featuredPlaces:
            state.main.appData.app && state.main.appData.app.featuredPlaces,
        uid: state.main.userAuth.uid,
        userCheckIns:
            state.main.appData.users &&
            state.main.appData.users[state.main.userAuth.uid] &&
            state.main.appData.users[state.main.userAuth.uid].checkIns,
        checkIns: state.main.appData.app && state.main.appData.app.checkIns,
        showSideMenu: state.main.appState.showSideMenu,
        isOnline: state.main.appState.isOnline,
    };
}

export default connect(mapStateToProps)(Home);
