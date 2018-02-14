import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { Modal, Button } from "react-native-simple-components";
import InfoBlock from "../components/InfoBlock";

export default function UserNameModal(props) {
    /*
    static get propTypes() {
        return {
            handleClose: PropTypes.func,
        };
    }
*/

    return (
        <Modal
            handleClose={props.handleClose}
            style={styles.container}
            closeIconStyle={styles.fauxCloseIcon}>
            <View style={styles.contentContainer}>
                <InfoBlock
                    title="Claim your name"
                    description="Choose something fun like, ThirstyXXXXX or use your real name"
                    iconName="person-pin"
                />

                <Button
                    text="Claim XXXXX"
                    textStyle={styles.buttonText}
                    style={styles.button}
                    handlePress={props.handleClose}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "center",
        padding: 16,
    },
    contentContainer: {
        alignSelf: "stretch",
        backgroundColor: styleConstants.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    fauxCloseIcon: {
        color: "transparent",
    },

    icon: {
        fontSize: 64,
        color: styleConstants.primary,
        marginBottom: 16,
    },
    headerText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        textAlign: "center",
    },
    primaryText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.primaryText,
        ...styleConstants.boldFont,
        marginVertical: 16,
        textAlign: "center",
    },
    text: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        textAlign: "center",
    },

    button: {
        margin: 16,
        backgroundColor: styleConstants.lightSecondary,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
});
