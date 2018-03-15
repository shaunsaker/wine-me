import React from "react";
import { View, Text, StyleSheet, Linking, Platform } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { Page, StarRating, Label } from "react-native-simple-components";
import ScrollHeader from "../components/ScrollHeader";
import InfoRow from "../components/Place/InfoRow";
import Icon from "react-native-vector-icons/MaterialIcons";

export class Place extends React.Component {
    constructor(props) {
        super(props);

        this.navigate = this.navigate.bind(this);
        this.setTab = this.setTab.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.prepareLink = this.prepareLink.bind(this);
        this.setError = this.setError.bind(this);

        this.tabs = [
            {
                title: "Info",
                iconName: "info",
            },
            {
                title: "Reviews",
                iconName: "star",
            },
            {
                title: "Photos",
                iconName: "photo",
            },
        ];

        this.state = {
            activeTab: "Info",
        };
    }

    static get propTypes() {
        return {
            // Passed props
            place: PropTypes.object,
        };
    }

    static defaultProps = {
        place: {
            address: "15 Bo Lang St, Paarl, 7646, South Africa",
            location: { lat: -33.7049146, lng: 18.9524889 },
            name: "Pearl Mountain Wine Farm.",
            openingHours: [
                "Monday: Closed",
                "Tuesday: 11:30 AM – 9:30 PM",
                "Wednesday: 11:30 AM – 9:30 PM",
                "Thursday: 11:30 AM – 9:30 PM",
                "Friday: 11:30 AM – 9:30 PM",
                "Saturday: 11:30 AM – 9:30 PM",
                "Sunday: 11:30 AM – 4:00 PM",
            ],
            phoneNumber: "021 870 1550",
            photoReference:
                "CmRaAAAAQQlhPGNEJFbvpevBSOW8_wLjx4n2RhRuolXvCYrHtJ5uzhhFgb3skFQdThcw_fvj_mlsCYzK0WsLHXgzOtmL1Fd9I4BUzYz4E_xLB-JVz1ZPqRr6Xys39ZBd9wXt6SCeEhB9ZArMRy4TX0F4-Q5lndxRGhSSsTrV02oXmUCmwNtrjpmd-d2Gvg",
            relativeDistance: 44,
            website: "http://pearlmountain.co.za/",
            rating: 4,
            reviews: [1, 2],
            photos: [3, 4, 5],
        },
    };

    navigate(page, goBack, props) {
        if (goBack) {
            Actions.pop();
        } else {
            Actions[page](props);
        }
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
            autoHide: true,
        });
    }

    render() {
        const imageURL = utilities.getGooglePlacesPhoto(
            this.props.place.photoReference,
        );

        const starRatingComponent = this.props.place.rating && (
            <StarRating
                rating={this.props.place.rating}
                iconStyle={styles.starRatingIcon}
                style={styles.starRatingContainer}
            />
        );

        const reviewsComponent = this.props.place.reviews.length && (
            <Label
                text={this.props.place.reviews.length + " reviews"}
                textStyle={styles.labelText}
                style={styles.label}
                showShadow
            />
        );

        const photosComponent = this.props.place.photos.length && (
            <Label
                text={this.props.place.photos.length + " photos"}
                textStyle={styles.labelText}
                style={styles.label}
                showShadow
            />
        );

        const childrenBeforeComponent = (
            <View style={styles.headerContainer}>
                <Text style={styles.nameText}>{this.props.place.name}</Text>
                <View style={styles.labelsContainer}>
                    {starRatingComponent}
                    {reviewsComponent}
                    {photosComponent}
                    <Label
                        text={
                            this.props.place.relativeDistance + " km from you"
                        }
                        textStyle={styles.labelText}
                        style={styles.label}
                        showShadow
                    />
                </View>
            </View>
        );

        const addressComponent = this.props.place.address ? (
            <InfoRow
                iconName="location-on"
                text={this.props.place.address}
                handlePress={() =>
                    this.handleLink(this.props.place.location, "location")
                }
            />
        ) : null; // FAILSAFE IN CASE WE HAVE NONE OF BELOW COMPONENTS

        const phoneNumberComponent = this.props.place.phoneNumber && (
            <InfoRow
                iconName="phone"
                text={this.props.place.phoneNumber}
                handlePress={() =>
                    this.handleLink(this.props.place.phoneNumber, "phoneNumber")
                }
            />
        );

        const websiteComponent = this.props.place.website && (
            <InfoRow
                iconName="web"
                text={this.props.place.website}
                handlePress={() =>
                    this.handleLink(this.props.place.website, "website")
                }
            />
        );

        const businessHoursComponent = this.props.place.openingHours && (
            <View>
                <View style={styles.headerRow}>
                    <Icon name="alarm" style={styles.headerRowIcon} />
                    <Text style={styles.headerRowText}>Business hours</Text>
                </View>
                {this.props.place.openingHours.map((item, index) => {
                    return (
                        <View style={styles.businessHoursRow}>
                            <Icon
                                name="alarm"
                                style={[
                                    styles.headerRowIcon,
                                    { color: "transparent" },
                                ]}
                            />
                            <Text style={styles.businessHoursRowText}>
                                {item}
                            </Text>
                        </View>
                    );
                })}
            </View>
        );

        const activeTabComponent =
            this.state.activeTab === "Info" ? (
                <View style={styles.tabContentContainer}>
                    {addressComponent}
                    {phoneNumberComponent}
                    {websiteComponent}
                    {businessHoursComponent}
                </View>
            ) : this.state.activeTab === "Reviews" ? (
                <View />
            ) : (
                <View />
            );

        const childrenAfterComponent = (
            <View style={styles.contentWrapper}>{activeTabComponent}</View>
        );

        return (
            <Page style={styles.container}>
                <ScrollHeader
                    showShadows
                    headerTranslucent
                    maxHeaderHeight={300}
                    minHeaderHeight={56}
                    // Image
                    imageURL={imageURL}
                    // HeaderBar
                    statusBarColor={styleConstants.darkPrimary}
                    finalHeaderBackgroundColor={styleConstants.darkPrimary}
                    headerLeftIconName="chevron-left"
                    headerLeftIconStyle={styles.headerIcon}
                    handleHeaderLeftIconPress={() => this.navigate(null, true)}
                    headerText={this.props.place.name}
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

function mapStateToProps(state) {
    return {};
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
        minHeight: styleConstants.windowHeight - 300,
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

    label: {
        backgroundColor: styleConstants.transBlack,
        borderRadius: 4,
        alignSelf: "flex-start",
        paddingHorizontal: 16,
        marginRight: 4,
        marginBottom: 4,
    },
    labelText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
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
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: styleConstants.dividerColor,
        backgroundColor: styleConstants.dividerColor,
    },
    headerRowIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        marginRight: 8,
    },
    headerRowText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
    },
    businessHoursRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: styleConstants.dividerColor,
    },
    businessHoursRowText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
    },
});

export default connect(mapStateToProps)(Place);
