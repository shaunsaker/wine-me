import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    Linking,
    StatusBar,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { Page, Button } from "react-native-simple-components";
import LinearGradient from "react-native-linear-gradient";
import CustomIcon from "../assets/icons";

export class ForceUpdate extends React.Component {
    constructor(props) {
        super(props);

        this.linkToApp = this.linkToApp.bind(this);

        this.state = {};
    }

    static get propTypes() {
        return {};
    }

    linkToApp() {
        const link =
            Platform.OS === "ios"
                ? "https://itunes.apple.com/app/tapoff/id1327809569"
                : "https://play.google.com/store/apps/details?id=co.za.auxstudio.tapoff&hl=en";

        Linking.canOpenURL(link).then(supported => {
            if (supported) {
                Linking.openURL(link);
            } else {
                this.props.dispatch({
                    type: "SET_ERROR",
                    errorType: "LINKING",
                    message: "This link is not supported by this device",
                    iconName: "error-outline",
                });
            }
        });
    }

    render() {
        return (
            <Page>
                <StatusBar
                    backgroundColor={styleConstants.primary}
                    barStyle="light-content"
                />
                <LinearGradient
                    colors={[
                        styleConstants.primary,
                        styleConstants.darkPrimary,
                    ]}
                    style={styles.container}>
                    <View style={styles.logoContainer}>
                        <CustomIcon name="noun_32096_cc" style={styles.logo} />
                    </View>
                    <View>
                        <Text style={styles.titleText}>
                            A new version of WineMe is available
                        </Text>
                        <Text style={styles.subtitleText}>
                            Please visit the store or press the button below to
                            update
                        </Text>
                    </View>
                    <Button
                        text="Update now"
                        textStyle={styles.buttonText}
                        handlePress={this.linkToApp}
                        style={styles.button}
                        showShadow
                        androidRipple
                        androidRippleColor={styleConstants.white}
                    />
                </LinearGradient>
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        alignSelf: "stretch",
    },

    logoContainer: {
        marginBottom: 32,
    },
    logo: {
        fontSize: 72,
        color: styleConstants.white,
    },

    titleText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.white,
        ...styleConstants.secondaryFont,
        marginBottom: 16,
        backgroundColor: "transparent",
        textAlign: "center",
    },
    subtitleText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
        backgroundColor: "transparent",
        textAlign: "center",
    },

    button: {
        marginTop: 32,
        backgroundColor: styleConstants.white,
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    buttonText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.darkPrimary,
        ...styleConstants.primaryFont,
    },
});

export default connect(mapStateToProps)(ForceUpdate);
