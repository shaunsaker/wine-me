import React from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Share,
    Platform,
    Linking,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";
import Analytics from "../analytics";

import { Page, HeaderBar, Button } from "react-native-simple-components";
import InfoBlock from "../components/InfoBlock";

export class About extends React.Component {
    constructor(props) {
        super(props);

        this.share = this.share.bind(this);
        this.linkToMail = this.linkToMail.bind(this);
    }

    static get propTypes() {
        return {
            userPlaces: PropTypes.array,
            download: PropTypes.object,
        };
    }

    share() {
        Analytics.logEvent("share_app");

        const userPlaces = this.props.userPlaces
            ? " " + this.props.userPlaces.length
            : "";

        let shareMessage = `I've been to${userPlaces} local wine farm${
            userPlaces > 1 || !userPlaces ? "s" : ""
        }! See how many you've been to. Download WineMe: ${
            this.props.download
                ? this.props.download[Platform.OS]
                : "Fetching download url"
        }`;

        Share.share(
            {
                message: shareMessage,
                title: "WineMe",
                url: this.props.download && this.props.download.ios, // iOS only
            },
            {
                subject: "Red red wine", // iOS only
                tintColor: styleConstants.primary, // iOS only
                dialogTitle: "Red red wine", // android only
            },
        );
    }

    linkToMail() {
        Analytics.logEvent("contact");

        const link = "mailto:info@shaunsaker.com?subject=WineMe";

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
        return (
            <Page style={styles.container}>
                <HeaderBar
                    leftIconName="close"
                    leftIconStyle={styles.headerIcon}
                    handleLeftIconPress={() => Actions.pop()}
                    rightIconName="share"
                    rightIconStyle={styles.headerIcon}
                    handleRightIconPress={this.share}
                    style={styles.header}
                    statusBarColor={styleConstants.white}
                    statusBarStyle="dark-content"
                />
                <ScrollView
                    style={styles.contentWrapper}
                    contentContainerStyle={styles.contentContainer}>
                    <View style={styles.sectionContainer}>
                        <InfoBlock
                            title="Why WineMe?"
                            description="Living in the Western Cape, we are quite blessed to be able to visit the best wine farms that South Africa has to offer. WineMe helps us keep track of the wine farms we have visited and also to find new ones that we haven't."
                            style={{ paddingTop: 0 }}
                        />
                    </View>
                    <View style={styles.sectionContainer}>
                        <InfoBlock
                            title="What's your superpower?"
                            description="Our superpower is being able to find the next best wine farm, closest to us, at the tap of a button."
                        />
                    </View>
                    <View style={styles.sectionContainer}>
                        <InfoBlock
                            title="Where do you get your data?"
                            description="Our data is obtained from Google Places. This includes: place names, coordinates, rating and photos. While we try our best to curate this data, places that shouldn't be here do slip through the cracks. If you do notice anything that does not seem right, please let us know."
                        />
                    </View>
                    <View style={styles.sectionContainer}>
                        <InfoBlock
                            title="What's next?"
                            description="If people find as much utility out of WineMe as we do, we plan to add new features including: reviews, photos, wines and activities. If you have any ideas on how else we can improve the app, please get in touch with us, we'd love to hear from you!"
                        />
                    </View>
                    <View style={styles.sectionContainer}>
                        <InfoBlock
                            title="App Version"
                            description={
                                config.version.app.major +
                                "." +
                                config.version.app.minor +
                                "." +
                                config.version.app.patch +
                                " (" +
                                config.version.build +
                                ")"
                            }
                        />
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Button
                        text="Get in touch"
                        textStyle={styles.buttonText}
                        handlePress={this.linkToMail}
                        style={styles.button}
                        showShadow
                        androidRipple
                        androidRippleColor={styleConstants.white}
                    />
                </View>
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        userPlaces:
            state.main.appData.users &&
            state.main.appData.users[state.main.userAuth.uid] &&
            state.main.appData.users[state.main.userAuth.uid].visited,
        download: state.main.appData.app && state.main.appData.app.download,
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConstants.white,
    },

    header: {
        backgroundColor: "transparent",
    },
    headerIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primaryText,
    },

    contentWrapper: {
        flex: 1,
        alignSelf: "stretch",
    },
    contentContainer: {
        paddingBottom: 72,
    },

    sectionContainer: {},
    buttonContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    button: {
        backgroundColor: styleConstants.secondary,
        borderRadius: 8,
        margin: 16,
    },
    buttonText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
});

export default connect(mapStateToProps)(About);
