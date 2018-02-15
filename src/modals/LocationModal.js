import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';

import styleConstants from '../assets/styleConstants';

import { Modal, Button } from 'react-native-simple-components';
import InfoBlock from '../components/InfoBlock';

export default function LocationModal(props) {
    // static get propTypes() {
    //     return {
    //         handleClose: PropTypes.func.isRequired,
    //         handlePositiveAction: PropTypes.func,
    //         isIOS: PropTypes.bool,
    //         thirdAttemptAndroid: PropTypes.bool,
    //     };
    // }
    const description = props.isIOS
        ? 'To resolve this, please go to Settings - WineMe - Location and select "While using the App".'
        : props.thirdAttemptAndroid
          ? 'To resolve this, please go to Settings - Apps - WineMe - Permissions and select "Your location"'
          : 'To resolve this, please press the "Okay" button.';

    const negativeActionButton = !props.isIOS && (
        <Button
            text={'No thanks'}
            textStyle={[
                styles.buttonText,
                { color: styleConstants.primaryText },
            ]}
            style={[
                styles.button,
                {
                    backgroundColor: styleConstants.dividerColor,
                    marginBottom: 8,
                },
            ]}
            handlePress={props.handleClose}
        />
    );

    return (
        <Modal
            handleClose={props.handleClose}
            style={styles.container}
            closeIconStyle={styles.fauxCloseIcon}>
            <View style={styles.contentWrapper}>
                <InfoBlock
                    title="We need your location"
                    description="But you have chosen not to allow this permission. You can still continue to use the app but we do not recommend it."
                    iconName="location-on"
                />
                <Text style={styles.descriptionText}>{description}</Text>
                <Button
                    text="Okay"
                    textStyle={styles.buttonText}
                    style={[styles.button, props.isIOS && { marginBottom: 8 }]}
                    showShadow
                    handlePress={
                        props.isIOS
                            ? props.handleClose
                            : props.handlePositiveAction
                    }
                />
                {negativeActionButton}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        padding: 16,
    },
    contentWrapper: {
        alignSelf: 'stretch',
        backgroundColor: styleConstants.white,
        borderRadius: 8,
        paddingVertical: 8,
    },
    fauxCloseIcon: {
        color: 'transparent',
    },

    descriptionText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        paddingHorizontal: 16,
    },

    button: {
        margin: 16,
        marginBottom: 0,
        backgroundColor: styleConstants.secondary,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
});
