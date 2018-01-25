import React from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Share,
    Platform,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";
import Analytics from "../analytics";

import { Page, HeaderBar, Button } from "react-native-simple-components";

export class About extends React.Component {
    constructor(props) {
        super(props);

        this.share = this.share.bind(this);
    }

    static get propTypes() {
        return {
            info: PropTypes.array,
        };
    }

    share() {
        Analytics.logEvent("share_app");

        const url = Platform.OS === "ios" ? "X" : "Y"; // TODO

        let shareMessage = `Download WineMe: ${url}`;
        Share.share(
            {
                message: shareMessage,
                title: "WineMe",
                url,
            },
            {
                subject: "WineMe", // iOS only
                tintColor: styleConstants.primary, // iOS only
                dialogTitle: "Share WineMe with your friends", // android only
            },
        );
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
                        <Text style={styles.headingText}>About WineMe</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Description</Text>
                        </View>
                    </View>
                    <View style={styles.sectionContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>
                                {"App Version " +
                                    config.version.app.major +
                                    "." +
                                    config.version.app.minor +
                                    "." +
                                    config.version.app.patch +
                                    " (" +
                                    config.version.build +
                                    ")"}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Button
                        text="Got feedback?"
                        textStyle={styles.buttonText}
                        handlePress={() => Actions.feedback()}
                        style={styles.button}
                    />
                </View>
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        info: state.main.appData.app && state.main.appData.app.info,
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
        padding: 16,
        paddingBottom: 72,
    },

    sectionContainer: {
        marginBottom: 16,
    },
    headingText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.secondary,
        ...styleConstants.secondaryFont,
        marginBottom: 12,
        lineHeight: 34,
    },
    textContainer: {
        alignSelf: "stretch",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    text: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
    },
    linkTextButton: {},
    linkText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primary,
        ...styleConstants.primaryFont,
        textDecorationLine: "underline",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 16,
        left: 16,
        right: 16,
    },
    button: {
        backgroundColor: styleConstants.secondary,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
});

export default connect(mapStateToProps)(About);
