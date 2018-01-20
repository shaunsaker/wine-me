import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import {
    Page,
    HeaderBar,
    TabBar,
    ButtonIcon,
} from "react-native-simple-components";
import LinearGradient from "react-native-linear-gradient";
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
        };
    }

    static get propTypes() {
        return {
            userLocation: PropTypes.object,
            places: PropTypes.object,
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

    render() {
        const findPlaceButton = !this.state.animateFindPlaceModal ? (
            <ButtonIcon
                iconName="add"
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
            <FindPlaceModal handleClose={() => this.togglePlaceModal(true)} />
        );

        return (
            <Page>
                <LinearGradient
                    colors={[
                        styleConstants.primary,
                        styleConstants.darkPrimary,
                    ]}
                    style={styles.headerContainer}>
                    <HeaderBar
                        statusBarColor={
                            this.state.animateFindPlaceModal
                                ? styleConstants.lightSecondary
                                : styleConstants.primary
                        }
                        text="HOME"
                        rightIconName="search"
                        handleRightIconPress={null}
                        textStyle={styles.headerText}
                        rightIconStyle={styles.headerIcon}
                        style={styles.header}
                    />
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
                <PlaceList
                    data={null}
                    userLocation={this.props.userLocation}
                    handlePress={null}
                />
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
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        userLocation: state.main.appState.userLocation,
        places: state.main.appData.app && state.main.appData.app.places,
    };
}

const styles = StyleSheet.create({
    headerContainer: {
        alignSelf: "stretch",
        ...styleConstants.largeShadow,
    },
    header: {
        backgroundColor: "transparent",
    },
    headerText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
    headerIcon: {
        fontSize: styleConstants.iconFont,
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
        bottom: 56 + 16,
        right: 16,
    },
    findPlaceButtonContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: styleConstants.lightSecondary,
    },
    findPlaceButton: {
        backgroundColor: styleConstants.lightSecondary,
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
});

export default connect(mapStateToProps)(Home);
