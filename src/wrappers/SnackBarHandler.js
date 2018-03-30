import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styleConstants from "../assets/styleConstants";

import { SnackBar } from "react-native-simple-components";

export class SnackBarHandler extends React.Component {
    constructor(props) {
        super(props);

        this.resetError = this.resetError.bind(this);
    }

    static get propTypes() {
        return {
            error: PropTypes.object,
        };
    }

    resetError() {
        this.props.dispatch({
            type: "RESET_ERROR",
        });
    }

    render() {
        const snackBar = this.props.error.errorType ? (
            <SnackBar
                text={this.props.error.message}
                handleClose={this.resetError}
                shouldAutoHide
                textStyle={styles.snackBarText}
                containerStyle={styles.container}
                autoHideDuration={this.props.error.duration}
            />
        ) : null;

        return (
            <View style={{ flex: 1, alignSelf: "stretch" }}>
                {this.props.children}
                {snackBar}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        error: state.main.appState.error,
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#323232", // Material design
    },
    snackBarText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
});

export default connect(mapStateToProps)(SnackBarHandler);
