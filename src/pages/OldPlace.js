import React from "react";
import {
    View,
    ScrollView,
    Image,
    Text,
    StyleSheet,
    Linking,
    Platform,
    Animated,
} from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import {
    Page,
    StarRating,
    Button,
    TouchableText,
} from "react-native-simple-components";
import LinearGradient from "react-native-linear-gradient";
import ScrollHeader from "../components/ScrollHeader";
import PlaceMenu from "../menus/PlaceMenu";
import PlaceLabelsSection from "../components/Place/PlaceLabelsSection";
import PlaceBlankState from "../components/Place/PlaceBlankState";
import PlaceBusinessHoursSection from "../components/Place/PlaceBusinessHoursSection";
import PlaceContactInfoSection from "../components/Place/PlaceContactInfoSection";
import ReviewsList from "../lists/ReviewsList";
import PhotoThumbnailList from "../lists/PhotoThumbnailList";
import PhotoModal from "../modals/PhotoModal";
import PlaceWineList from "../lists/PlaceWineList";
import PlaceActivityList from "../lists/PlaceActivityList";
import SnackBar from "../widgets/SnackBar";

export class Place extends React.Component {
    constructor(props) {
        super(props);

        this.setTab = this.setTab.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.setLinkingError = this.setLinkingError.bind(this);
        this.clearPlaceLocality = this.clearPlaceLocality.bind(this);
        this.getPlaceLocality = this.getPlaceLocality.bind(this);
        this.togglePhotoModal = this.togglePhotoModal.bind(this);
        this.navigate = this.navigate.bind(this);

        this.actions = [
            "Open in Maps",
            "Write a Review",
            "Add a Photo",
            "Add an Activity",
            "Mark as Visited",
            "Improve Info",
        ];

        // TEMP
        this.info = {
            contactNumber: "+27218811292", // important that there is a plus here
            website: "http://www.waterkloofwines.co.za",
            emailAddress: "info@waterkloofwines.co.za",
            businessHours: {
                sunday: {
                    startTime: "10:00",
                    endTime: "17:00",
                },
                monday: {
                    startTime: "Closed",
                    endTime: null,
                },
                tuesday: {
                    startTime: "Closed",
                    endTime: null,
                },
                wednesday: {
                    startTime: "10:00",
                    endTime: "17:00",
                },
                thursday: {
                    startTime: "10:00",
                    endTime: "17:00",
                },
                friday: {
                    startTime: "10:00",
                    endTime: "17:00",
                },
                saturday: {
                    startTime: "10:00",
                    endTime: "17:00",
                },
            },
        };

        // TEMP
        this.reviews =
            // null;
            {
                12345678: {
                    reviewerId: 987654321, // use this to get the profile information of the reviewer from users in db
                    date: Date.now(),
                    rating: 5,
                    review:
                        "Very professional wine tasting with top quality ratings for most of the wines. The setting is exquisite. A must visit!",
                },
                22345678: {
                    reviewerId: 987654321,
                    date: Date.now(),
                    rating: 4,
                    review:
                        "Very professional wine tasting with top quality ratings for most of the wines. The setting is exquisite. A must visit!",
                },
                32345678: {
                    reviewerId: 987654321,
                    date: Date.now(),
                    rating: 4,
                    review:
                        "Very professional wine tasting with top quality ratings for most of the wines. The setting is exquisite. A must visit!",
                },
            };

        // TEMP
        this.photos = {
            123456781: {
                thumbnail: require("../assets/images/waterkloof-1.jpg"),
                fullSize: require("../assets/images/waterkloof-1.jpg"),
                date: Date.now(),
                userId: 987654321,
            },
            123456782: {
                thumbnail: require("../assets/images/waterkloof-2.jpg"),
                fullSize: require("../assets/images/waterkloof-2.jpg"),
                date: Date.now(),
                userId: 987654321,
            },
            123456783: {
                thumbnail: require("../assets/images/waterkloof-3.jpg"),
                fullSize: require("../assets/images/waterkloof-3.jpg"),
                date: Date.now(),
                userId: 987654321,
            },
            123456784: {
                thumbnail: require("../assets/images/waterkloof-4.jpg"),
                fullSize: require("../assets/images/waterkloof-4.jpg"),
                date: Date.now(),
                userId: 987654321,
            },
            123456785: {
                thumbnail: require("../assets/images/waterkloof-5.jpg"),
                fullSize: require("../assets/images/waterkloof-5.jpg"),
                date: Date.now(),
                userId: 987654321,
            },
            123456786: {
                thumbnail: require("../assets/images/waterkloof-6.jpg"),
                fullSize: require("../assets/images/waterkloof-6.jpg"),
                date: Date.now(),
                userId: 987654321,
            },
            123456787: {
                thumbnail: require("../assets/images/waterkloof-7.jpg"),
                fullSize: require("../assets/images/waterkloof-7.jpg"),
                date: Date.now(),
                userId: 987654321,
            },
        };

        // TEMP
        this.wines = {
            123456781: {
                name: "Waterkloof Wine Estate False Bay Shiraz 2016",
                description:
                    "The Waterkloof Wine Estate False Bay Shiraz is a quaffable red wine that is perfect for everyday drinking. It forms part of this outstanding winery's more affordable range that still provides great quality. This is a juicy wine with good balance. Lashings of cassis, sour plums and fragrant perfume, with black pepper highlights, fill the nose. The palate shows fruit that is intense, yet not domineering. This Shiraz has good length, with smooth, delicate tannins at the close of each sip.",
                foodPairings: "Cured Meats, Ostrich Steak",
                photoURL: require("../assets/images/waterkloof-wine-1.jpg"),
                technical: {
                    variety: "Shiraz",
                    alcohol: "14%",
                    sugar: "2 gm/l",
                    blend: "100% Shiraz",
                },
                characteristics: "Drink Now",
                url:
                    "https://www.cybercellar.com/waterkloof-wine-estate-false-bay-shiraz-2016",
            },
            123456782: {
                name: "Waterkloof Wine Estate False Bay Shiraz 2016",
                description:
                    "The Waterkloof Wine Estate False Bay Shiraz is a quaffable red wine that is perfect for everyday drinking. It forms part of this outstanding winery's more affordable range that still provides great quality. This is a juicy wine with good balance. Lashings of cassis, sour plums and fragrant perfume, with black pepper highlights, fill the nose. The palate shows fruit that is intense, yet not domineering. This Shiraz has good length, with smooth, delicate tannins at the close of each sip.",
                foodPairings: "Cured Meats, Ostrich Steak",
                photoURL: require("../assets/images/waterkloof-wine-1.jpg"),
                technical: {
                    variety: "Shiraz",
                    alcohol: "14%",
                    sugar: "2 gm/l",
                    blend: "100% Shiraz",
                },
                characteristics: "Drink Now",
                url:
                    "https://www.cybercellar.com/waterkloof-wine-estate-false-bay-shiraz-2016",
            },
        };

        // TEMP
        this.activities = {
            123456781: {
                photoURL: require("../assets/images/waterkloof-1.jpg"),
                title: "Horse Ride and Lunch in False Bay",
                description:
                    "If you’re eager share our slice of the Cape Floral Kingdom, join Waterkloof in partnership with Journey’s End Horseback Rides for an adventure in the Schapenberg. This picturesque trail ride invites enthusiasts to saddle up for a 60-minute ride through the area. Afterwards, relax at our ‘Cellar in the Sky’, and enjoy a two course lunch inspired by the seasons, of some of Waterkloof’s finest cellar gems, all served up with a breathtaking view of False Bay. Bookings are subject to availability of Equestrian service provider.",
                price: 750,
                pricePer: "person",
            },
        };

        this.state = {
            activeTab: "Info",
            tabs: [
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
                {
                    title: "Wines",
                    iconName: "local-drink", // TODO: Wine glass icon
                },
            ],
            showMenu: false,
            place: null,
            placeLocationLink: null,
            showPhotoModal: false,
            currentPhotoIndex: 0,
        };
    }

    static get propTypes() {
        return {
            userLocation: PropTypes.object,
            place: PropTypes.object,
            currentPlaceLocality: PropTypes.string,
            currentPlaceLocalityError: PropTypes.bool,
            labelTypes: PropTypes.array,

            // From db
            // info: PropTypes.object,
            // reviews: PropTypes.object,
            // reviewers: PropTypes.object,=
            // photos: PropTypes.object,
            // wines: PropTypes.object,
        };
    }

    static defaultProps = {
        userLocation: {
            lat: -34.0908521,
            lng: 18.849207,
        },
        place: {
            name: "Waterkloof Wine Estate",
            coverPhotoURL: null,
            rating: 4,
            reviewCount: 27, // NOTE: these counts are necessary to determine if we need to fetch data on that node
            photoCount: 18,
            wineCount: 7,
            activityCount: 2,
            childFriendly: true,
            servesFood: true,
            otherActivities: true,
            isFeatured: true, // TODO: this could come from the db under featuredPlaces
            location: {
                lat: -34.0988621,
                lng: 18.8895607,
            },
            minPrice: 40,
            uid: utilities.createUUID(),
            info: null, // comes from db
            reviews: null, // comes from db
            photos: null, // comes from db
            wines: null, // comes from db
        },
        reviewers: null, // comes from db (from users)
    };

    componentDidMount() {
        if (this.props.place.otherActivities) {
            let tabs = this.state.tabs;
            tabs.push({
                title: "Activities",
                iconName: "explore",
            });
        }

        // TODO: fetch info
        //TEMP
        let place = this.props.place;
        place["info"] = this.info;
        place.info["minPrice"] = this.props.place.minPrice;

        // Create link from place's location
        const placeLocationLink = utilities.createLinkingURL(
            this.props.place.location,
        );

        this.setState({
            place,
            placeLocationLink,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.activeTab === "Reviews" &&
            prevState.activeTab !== "Reviews" &&
            !this.state.place.reviews
        ) {
            // TODO: Get reviews data and get reviewers data
            // TEMP
            let place = this.state.place;
            place["reviews"] = utilities.convertDictionaryToArray(
                this.reviews,
                true,
            );

            this.setState({
                place,
            });
        } else if (
            this.state.activeTab === "Photos" &&
            prevState.activeTab !== "Photos" &&
            !this.state.place.photos
        ) {
            // TODO: Get photos from db
            // TEMP
            let place = this.state.place;
            place["photos"] = utilities.convertDictionaryToArray(
                this.photos,
                true,
            );

            this.setState({
                place,
            });
        } else if (
            this.state.activeTab === "Wines" &&
            prevState.activeTab !== "Wines" &&
            !this.state.place.wines
        ) {
            // TODO: Get wines from db
            // TEMP
            let place = this.state.place;
            place["wines"] = utilities.convertDictionaryToArray(
                this.wines,
                true,
            );

            this.setState({
                place,
            });
        } else if (
            this.state.activeTab === "Activities" &&
            prevState.activeTab !== "Activities" &&
            !this.state.place.activities
        ) {
            // TODO: Get activities from db
            // TEMP
            let place = this.state.place;
            place["activities"] = utilities.convertDictionaryToArray(
                this.activities,
                true,
            );

            this.setState({
                place,
            });
        }
    }

    setTab(tab) {
        this.setState({
            activeTab: tab,
        });
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu,
        });
    }

    handleAction(action) {
        // TODO: Handle actions
        if (action === "Open in Maps") {
            this.handleLink(this.state.placeLocationLink);
        } else if (action === "Write a Review") {
            this.navigate("review", null, {
                place: this.state.place,
            });
        } else if (action === "Add an Activity") {
            this.navigate("activity", null, {
                place: this.state.place,
            });
        } else if (action === "Improve Info") {
            this.navigate("improveInfo", null, {
                place: this.state.place,
            });
        }

        if (this.state.showMenu) {
            this.toggleMenu();
        }
    }

    handleLink(link) {
        Linking.canOpenURL(link)
            .then(supported => {
                if (!supported) {
                    this.setLinkingError(
                        "This link is not supported on your device.",
                    );
                } else {
                    return Linking.openURL(link);
                }
            })
            .catch(() => {
                this.setLinkingError(
                    "We were unable to open this link on your device.",
                );
            });
    }

    setLinkingError(message) {
        this.props.dispatch({
            type: "SET_ERROR",
            errorType: "LINKING",
            message,
        });
    }

    clearPlaceLocality() {
        // TODO: Unused at the moment - not sure if necessary yet
        this.props.dispatch({
            type: "CLEAR_CURRENT_PLACE_LOCALITY",
        });
    }

    getPlaceLocality(coordinates) {
        this.props.dispatch({
            type: "getFormattedAddressFromCoordinates",
            coordinates: coordinates,
            nextActionType: "SET_CURRENT_PLACE_LOCALITY",
        });
    }

    togglePhotoModal(index) {
        this.setState({
            showPhotoModal: !this.state.showPhotoModal,
            currentPhotoIndex: index,
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
        const photoURL = this.props.place.coverPhotoURL
            ? { url: this.props.place.coverPhotoURL }
            : require("../assets/images/waterkloof-wine-estate.jpg"); // TODO: Placeholder image

        const menu = this.state.showMenu && (
            <PlaceMenu values={this.actions} handleSelect={this.handleAction} />
        );

        const starRatingComponent =
            this.props.place.rating && this.props.place.reviewCount > 0 ? (
                <View style={styles.subHeadingStarRatingContainer}>
                    <StarRating
                        rating={this.props.place.rating}
                        style={styles.subHeadingStarRating}
                        iconStyle={styles.subHeadingStarRatingIcon}
                    />
                </View>
            ) : (
                // Blank state
                <TouchableText
                    onPress={null /* TODO: Write a review */}
                    isLink
                    text="Be the first to review them and earn X corks!" /* TODO: Define corks points value*/
                    textStyle={styles.callToActionText}
                    style={styles.callToActionContainer}
                />
            );

        const reviewsTextComponent = this.props.place.reviewCount > 0 && (
            <View style={styles.subHeadingTextContainer}>
                <Text style={styles.subHeadingText}>
                    {this.props.place.reviewCount + " reviews"}
                </Text>
            </View>
        );

        const photosTextComponent =
            this.props.place.photoCount > 0 ? (
                <View style={styles.subHeadingTextContainer}>
                    <Text style={styles.subHeadingText}>
                        {this.props.place.photoCount + " photos"}
                    </Text>
                </View>
            ) : (
                // Blank state
                <TouchableText
                    onPress={null /* TODO: Add a photo */}
                    isLink
                    text="Be the first to add a photo and earn X corks!" /* TODO: Define corks points value*/
                    textStyle={styles.callToActionText}
                    style={styles.callToActionContainer}
                />
            );

        let infoComponent;
        let reviewsComponent;
        let photosComponent;
        let winesComponent;
        let activitiesComponent;
        let infoButton;
        let reviewButton;
        let photoButton;
        let activitiesButton;

        if (this.state.place) {
            if (this.state.activeTab === "Info") {
                infoComponent = (
                    <View style={styles.infoContainer}>
                        <PlaceBusinessHoursSection
                            businessHours={this.state.place.info.businessHours}
                        />
                        <PlaceContactInfoSection
                            place={this.state.place}
                            currentPlaceLocality={
                                this.props.currentPlaceLocality
                            }
                            currentPlaceLocalityError={
                                this.props.currentPlaceLocalityError
                            }
                            handleGetPlaceLocality={this.getPlaceLocality}
                            handleLink={this.handleLink}
                        />
                    </View>
                );

                infoButton = (
                    <Button
                        iconName="navigation"
                        iconStyle={styles.actionButtonIcon}
                        style={styles.actionButton}
                        handlePress={() =>
                            this.handleLink(this.state.placeLocationLink)
                        }
                        showShadow
                    />
                );
            } else if (this.state.activeTab === "Reviews") {
                reviewsComponent = this.state.place.reviewCount ? (
                    <ReviewsList
                        data={this.state.place.reviews}
                        handleProfilePress={
                            null /* TODO: Go to person's profile */
                        }
                    />
                ) : (
                    <PlaceBlankState
                        text="write a review"
                        value={100}
                        handleTextPress={null /* TODO*/}
                    />
                );

                reviewButton = (
                    <Button
                        iconName="rate-review"
                        iconStyle={styles.actionButtonIcon}
                        style={styles.actionButton}
                        handlePress={() => this.handleAction("Write a Review")}
                        showShadow
                    />
                );
            } else if (this.state.activeTab === "Photos") {
                photosComponent = this.state.place.photoCount ? (
                    <PhotoThumbnailList
                        data={this.state.place.photos}
                        handlePress={
                            this.togglePhotoModal /* TODO: set viewing photo*/
                        }
                    />
                ) : (
                    <PlaceBlankState
                        text="add a photo"
                        value={100}
                        handleTextPress={null /* TODO*/}
                    />
                );

                photoButton = (
                    <Button
                        iconName="add-a-photo"
                        iconStyle={styles.actionButtonIcon}
                        style={styles.actionButton}
                        handlePress={null /* TODO - Add Photo */}
                        showShadow
                    />
                );
            } else if (this.state.activeTab === "Wines") {
                winesComponent = this.state.place.wineCount && (
                    <PlaceWineList
                        data={this.state.place.wines}
                        handleBuyButtonPress={this.handleLink}
                    />
                );
            } else if (this.state.activeTab === "Activities") {
                activitiesComponent = this.state.place.activityCount ? (
                    <PlaceActivityList data={this.state.place.activities} />
                ) : (
                    <PlaceBlankState
                        text="add an activity"
                        value={100}
                        handleTextPress={null /* TODO*/}
                    />
                );

                activitiesButton = (
                    <Button
                        iconName="add"
                        iconStyle={styles.actionButtonIcon}
                        style={styles.actionButton}
                        handlePress={() => this.handleAction("Add an Activity")}
                        showShadow
                    />
                );
            }
        }

        const photoModal = this.state.showPhotoModal && (
            <PhotoModal
                photos={this.state.place.photos}
                currentPhotoIndex={this.state.currentPhotoIndex}
                handleClose={this.togglePhotoModal}
                handleFooterPress={
                    null /* TODO: Redirect to profile using returned userId */
                }
            />
        );

        const Wrapper = props => (
            <LinearGradient
                colors={[styleConstants.darkPrimary, styleConstants.primary]}
                style={styles.headingContainer}>
                {props.children}
            </LinearGradient>
        );

        const childrenBeforeTabBar = (
            <View style={styles.headingContentContainer}>
                <View style={styles.headingTitleTextContainer}>
                    <Text style={styles.headingTitleText}>
                        {this.props.place.name}
                    </Text>
                </View>
                <View style={styles.subHeadingContainer}>
                    {starRatingComponent}
                    {reviewsTextComponent}
                    {photosTextComponent}
                </View>
                <PlaceLabelsSection
                    labels={this.props.labelTypes}
                    place={this.props.place}
                    userLocation={this.props.userLocation}
                />
            </View>
        );

        const childrenAfterTabBar = (
            <View style={styles.contentContainer}>
                {infoComponent}
                {reviewsComponent}
                {photosComponent}
                {winesComponent}
                {activitiesComponent}
            </View>
        );

        return (
            <Page>
                <ScrollHeader
                    showShadows
                    maxHeaderHeight={200}
                    minHeaderHeight={56}
                    // Image
                    imageURL={photoURL}
                    // HeaderBar
                    statusBarColor={styleConstants.darkPrimary}
                    finalHeaderBackgroundColor={styleConstants.darkPrimary}
                    headerLeftIconName="chevron-left"
                    headerLeftIconStyle={styles.headerLeftIcon}
                    handleHeaderLeftIconPress={() => this.navigate(null, true)}
                    headerText="WATERKLOOF WINE ESTATE"
                    headerTextStyle={styles.headerText}
                    headerRightIconName="more-vert"
                    headerRightIconStyle={styles.headerRightIcon}
                    handleHeaderRightIconPress={this.toggleMenu}
                    headerStyle={styles.header}
                    // TabBar
                    tabs={this.state.tabs}
                    activeTab={this.state.activeTab}
                    handleTabPress={this.setTab}
                    tabBarBackgroundColor="transparent"
                    tabBarTextColor={styleConstants.transWhite}
                    tabBarActiveTextColor={styleConstants.white}
                    tabBarTabStyle={styles.tabBarTab}
                    tabBarActiveTabStyle={styles.tabBarActiveTab}
                    tabBarTextStyle={styles.tabBarText}
                    tabBarStyle={styles.tabBar}
                    // ScrollView
                    bodyWrapperStyle={styles.bodyWrapper}
                    bodyContainerStyle={styles.bodyContainer}
                    tabBarWrapperComponent={Wrapper} // in case you need to wrap children before and tabbar in a view
                    childrenBeforeTabBar={childrenBeforeTabBar} // optional
                    childrenAfterTabBar={childrenAfterTabBar}
                />

                <View style={styles.actionButtonContainer}>
                    {infoButton}
                    {reviewButton}
                    {photoButton}
                    {activitiesButton}
                </View>

                {menu}
                {photoModal}
                <SnackBar />
            </Page>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
    },
    headerText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
    headerLeftIcon: {
        fontSize: 30,
        color: styleConstants.white,
    },
    headerRightIcon: {
        color: styleConstants.white,
    },
    headingContainer: { ...styleConstants.largeShadow },
    headingContentContainer: {
        paddingVertical: 16,
        paddingBottom: 8,
    },
    headingTitleTextContainer: {
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    headingTitleText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.white,
        ...styleConstants.secondaryFont,
    },
    subHeadingContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginBottom: 8,
        paddingHorizontal: 16,
    },
    subHeadingStarRatingContainer: {
        marginRight: 8,
    },
    subHeadingStarRating: {},
    subHeadingStarRatingIcon: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.white,
    },
    subHeadingTextContainer: {
        marginRight: 8,
    },
    subHeadingText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
    callToActionContainer: {
        marginBottom: 16,
    },
    callToActionText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.lightPrimary,
        ...styleConstants.primaryFont,
    },
    tabBar: {},
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
    bodyWrapper: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: styleConstants.darkPrimary,
    },
    bodyContainer: {
        backgroundColor: styleConstants.white,
    },
    contentContainer: {
        minHeight: styleConstants.windowHeight - 56 - 56 - 16 - 8,
    },
    infoContainer: {
        padding: 16,
        paddingTop: 0,
    },
    blankStateContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: styleConstants.white,
    },
    blankStateTextContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    blankStateText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        flexWrap: "wrap",
        flexDirection: "row",
    },
    blankStateHighlightedText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.lightSecondary,
        ...styleConstants.primaryFont,
    },

    actionButtonContainer: {
        position: "absolute",
        bottom: 16,
        right: 16,
    },
    actionButton: {
        backgroundColor: styleConstants.lightSecondary,
        width: 56,
        height: 56,
        borderRadius: 28,
        ...styleConstants.largeShadow,
    },
    actionButtonIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
    },
});

function mapStateToProps(state) {
    return {
        currentPlaceLocality: state.main.appData.currentPlaceLocality,
        currentPlaceLocalityError:
            state.main.appState.error.type === "GEOLOCATION_ERROR",
        labelTypes: state.main.appData.labelTypes,
    };
}

export default connect(mapStateToProps)(Place);
