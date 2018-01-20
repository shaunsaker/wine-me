import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { Modal } from "react-native-simple-components";

export default class FindPlaceModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    static get propTypes() {
        return {
            handleClose: PropTypes.func,
        };
    }

    render() {
        return (
            <Modal
                handleClose={this.props.handleClose}
                style={styles.modalContainer}
                closeIconStyle={styles.closeIcon}>
                <View style={styles.modalBodyContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Finding the next</Text>
                        <Text style={styles.highlightedText}>best</Text>
                        <Text style={styles.text}>wine farm</Text>
                        <Text style={styles.highlightedText}>closest</Text>
                        <Text style={styles.text}>to you.</Text>
                    </View>
                    <ActivityIndicator
                        size="large"
                        color={styleConstants.white}
                    />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {},
    modalBodyContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: styleConstants.lightSecondary,
    },
    closeIcon: {
        fontSize: styleConstants.iconFont,
    },
    textContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 32,
    },
    text: {
        ...styleConstants.primaryFont,
        fontSize: styleConstants.largeFont,
        color: styleConstants.white,
        marginBottom: 8,
        lineHeight: styleConstants.largeFont * 1.5,
    },
    highlightedText: {
        ...styleConstants.primaryFont,
        fontSize: styleConstants.largeFont,
        color: styleConstants.lightPrimary,
        marginBottom: 8,
        marginHorizontal: 6,
        lineHeight: styleConstants.largeFont * 1.5,
    },
});
