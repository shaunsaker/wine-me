import React from "react";
import { View, StyleSheet, Platform, Linking } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { ActionSheet } from "react-native-simple-components";

export class PlaceActionSheetHandler extends React.Component {
    constructor(props) {
        super(props);

        this.toggleActionSheet = this.toggleActionSheet.bind(this);
        this.selectActionSheetItem = this.selectActionSheetItem.bind(this);
        this.linkToLocation = this.linkToLocation.bind(this);
    }

    static get propTypes() {
        return {
            showActionSheetForPlace: PropTypes.object,
            uid: PropTypes.string,
            userPlaces: PropTypes.array,
        };
    }

    toggleActionSheet() {
        this.props.dispatch({
            type: "TOGGLE_ACTION_SHEET",
        });
    }

    selectActionSheetItem(item) {
        if (item === "Cancel") {
            this.toggleActionSheet();
        } else if (item === "Go here" || item === "Visit again") {
            this.linkToLocation(this.props.showActionSheetForPlace.location);

            // Clear place from state
            this.toggleActionSheet();
        } else {
            let data = this.props.userPlaces ? this.props.userPlaces : [];

            // Check if the user has already been here
            const isVisited = utilities.isValueInArray(
                this.props.showActionSheetForPlace.id,
                data,
                true,
            );

            if (isVisited || isVisited === 0) {
                data.splice(isVisited, 1);
            } else {
                data.push(this.props.showActionSheetForPlace.id);
            }

            // Mark as visited
            this.props.dispatch({
                type: "setData",
                node: "users/" + this.props.uid + "/visited",
                data,
                nextAction: {
                    type: "SET_ERROR",
                    errorType: "CLOUD_DATA",
                    message:
                        this.props.showActionSheetForPlace.name +
                        " has been marked as " +
                        (isVisited || isVisited === 0
                            ? "not visited"
                            : "visited"),
                    autoHide: true,
                    success: true,
                    iconName: "check-circle",
                },
            });

            // Clear place from state
            this.toggleActionSheet();
        }
    }

    linkToLocation(location) {
        let link;

        // Create the appropriate link
        if (Platform.OS === "android") {
            link = "geo:" + location.lat + "," + location.lng;
        } else {
            link = `http://maps.apple.com/?ll=${location.lat},${location.lng}`;
        }

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
        let actionSheet;

        if (this.props.showActionSheetForPlace) {
            const isVisited =
                this.props.userPlaces &&
                utilities.isValueInArray(
                    this.props.showActionSheetForPlace.id,
                    this.props.userPlaces,
                );

            actionSheet = (
                <ActionSheet
                    options={[
                        {
                            text: isVisited ? "Visit again" : "Go here",
                            iconName: "location-on",
                        },
                        {
                            text:
                                "Mark as " +
                                (isVisited ? "not visited" : "visited"),
                            iconName: isVisited
                                ? "indeterminate-check-box"
                                : "check-box",
                        },
                    ]}
                    handlePress={this.selectActionSheetItem}
                    iconStyle={styles.actionSheetIcon}
                    textStyle={styles.actionSheetText}
                    style={styles.actionSheet}
                />
            );
        }

        return (
            <View style={{ flex: 1, alignSelf: "stretch" }}>
                {this.props.children}
                {actionSheet}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        showActionSheetForPlace: state.main.appState.showActionSheetForPlace,
        uid: state.main.userAuth.uid,
        userPlaces:
            state.main.appData.users &&
            state.main.appData.users[state.main.userAuth.uid] &&
            state.main.appData.users[state.main.userAuth.uid].visited,
    };
}

const styles = StyleSheet.create({
    actionSheet: {
        ...styleConstants.largeShadow,
    },
    actionSheetIcon: {
        color: styleConstants.primaryText,
    },
    actionSheetText: {
        fontSize: styleConstants.regularFont,
        ...styleConstants.primaryFont,
    },
});

export default connect(mapStateToProps)(PlaceActionSheetHandler);
