import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';

import styleConstants from '../assets/styleConstants';

import {
    Modal,
    InputContainer,
    Input,
    Button,
} from 'react-native-simple-components';
import { AnimateTranslateX } from 'react-native-simple-animators';
import InfoBlock from '../components/InfoBlock';

export default class UserNameModal extends React.Component {
    constructor(props) {
        super(props);

        this.updateUserName = this.updateUserName.bind(this);
        this.setError = this.setError.bind(this);
        this.submitUserName = this.submitUserName.bind(this);

        this.state = {
            userName: null,
            error: null,
        };
    }

    static get propTypes() {
        return {
            handleClose: PropTypes.func.isRequired,
            users: PropTypes.array,
            handleSubmitUserName: PropTypes.func,
        };
    }

    updateUserName(userName) {
        if (userName.indexOf(' ') > -1) {
            // If spaces, set error
            this.setError('No spaces please');
        } else if (this.state.error) {
            // Clear the error
            this.setError();
        }

        userName = userName.replace(' ', '');

        this.setState({
            userName,
        });
    }

    setError(error) {
        this.setState({
            error,
        });
    }

    submitUserName() {
        let doesUserNameExist;

        // Check if it's available in users list
        for (let i = 0; i < this.props.users.length; i++) {
            if (this.state.userName === this.props.users[i].userName) {
                doesUserNameExist = true;
                break;
            }
        }

        if (!doesUserNameExist) {
            // Save the userName to the user
            this.props.handleSubmitUserName(this.state.userName);
            // Close the modal
            this.props.handleClose();
        } else {
            this.setError('This name already exists');
        }
    }

    render() {
        const error = this.state.error && (
            <AnimateTranslateX
                initialValue={-100}
                finalValue={0}
                shouldAnimateIn
                style={styles.errorTextContainer}>
                <Text style={styles.errorText}>{this.state.error}</Text>
            </AnimateTranslateX>
        );

        return (
            <Modal
                handleClose={this.props.handleClose}
                style={styles.container}
                closeIconStyle={styles.fauxCloseIcon}>
                <InputContainer
                    wrapperStyle={styles.contentWrapper}
                    containerStyle={styles.contentContainer}>
                    <InfoBlock
                        title="Claim your name"
                        description="Choose something fun like ThirstyOwl or use your real name."
                        iconName="person-pin"
                    />
                    <View style={styles.inputContainer}>
                        {error}
                        <Input
                            value={this.state.userName}
                            handleChange={this.updateUserName}
                            handleSubmit={this.submitUserName}
                            placeholder="e.g. ThirstyOwl"
                            style={styles.input}
                        />
                    </View>
                    <Button
                        text={
                            'Claim ' + this.state.userName
                                ? this.state.userName
                                : 'ThirstyOwl'
                        }
                        textStyle={styles.buttonText}
                        style={styles.button}
                        handlePress={this.submitUserName}
                        disabled={!this.state.userName}
                    />
                </InputContainer>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingVertical: 48,
        paddingHorizontal: 16,
    },
    contentWrapper: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: styleConstants.white,
        borderRadius: 8,
        paddingVertical: 8,
    },
    contentContainer: {
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        flexGrow: 1,
    },
    fauxCloseIcon: {
        color: 'transparent',
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
        textAlign: 'center',
    },
    primaryText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.primaryText,
        ...styleConstants.boldFont,
        marginVertical: 16,
        textAlign: 'center',
    },
    text: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        textAlign: 'center',
    },

    inputContainer: {},
    input: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        marginHorizontal: 16,
        paddingTop: 64, // error message
    },

    errorTextContainer: {
        position: 'absolute',
        top: 16,
        left: 16,
    },
    errorText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.secondary,
        ...styleConstants.primaryFont,
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
