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

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { Page, Button } from "react-native-simple-components";
import Logo from "../components/Logo";
import InfoBlock from "../components/InfoBlock";

export class ForceUpdate extends React.Component {
    constructor(props) {
        super(props);

        this.linkToApp = this.linkToApp.bind(this);

        this.state = {};
    }

    static get propTypes() {
        return {
            download: PropTypes.object,
        };
    }

    linkToApp() {
        const link = this.props.download && this.props.download[Platform.OS];

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
            <Page style={styles.container}>
                <StatusBar
                    backgroundColor={styleConstants.primary}
                    barStyle="light-content"
                />
                <Logo invertColors large />
                <InfoBlock
                    title="A new version of WineMe is available"
                    description="Please visit the store or press the button below to update"
                    textCenter
                    style={{ marginTop: 8 }}
                />
                <Button
                    text="Update now"
                    textStyle={styles.buttonText}
                    handlePress={this.linkToApp}
                    style={styles.button}
                    showShadow
                    androidRipple
                    androidRippleColor={styleConstants.white}
                />
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        download: state.main.appData.app && state.main.appData.app.download,
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: styleConstants.white,
    },

    logoContainer: {
        marginBottom: 32,
    },
    logo: {
        fontSize: 72,
        color: styleConstants.white,
    },

    button: {
        margin: 16,
        backgroundColor: styleConstants.secondary,
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    buttonText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
});

export default connect(mapStateToProps)(ForceUpdate);
