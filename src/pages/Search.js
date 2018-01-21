import React from "react";
import { View, ScrollView, StyleSheet, Linking, Platform } from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import {
    Page,
    InputBar,
    Menu,
    TouchableIcon,
    ActionSheet,
} from "react-native-simple-components";
import LinearGradient from "react-native-linear-gradient";
import PlaceList from "../lists/PlaceList";

export class Search extends React.Component {
    constructor(props) {
        super(props);

        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.toggleActionSheet = this.toggleActionSheet.bind(this);
        this.selectActionSheetItem = this.selectActionSheetItem.bind(this);
        this.linkToLocation = this.linkToLocation.bind(this);

        this.state = {
            places: null,
            searchValue: "",
            showActionSheetForPlace: false,
        };
    }

    static get propTypes() {
        return {
            places: PropTypes.object,
            userLocation: PropTypes.object,
            uid: PropTypes.string,
            userPlaces: PropTypes.array,
        };
    }

    updateSearchValue(searchValue) {
        let places;

        if (searchValue) {
            places = utilities.convertDictionaryToArray(
                this.props.places,
                true,
            );

            places = places.filter(place => {
                if (place.name.indexOf(searchValue) > -1) {
                    return place;
                }
            });

            places = places.map(place => {
                const relativeDistance = Math.round(
                    utilities.getDistanceBetweenCoordinateSets(
                        this.props.userLocation,
                        place.location,
                    ),
                );

                place["relativeDistance"] = relativeDistance;

                return place;
            });

            places = utilities.sortArrayOfObjectsByKey(
                places,
                "relativeDistance",
            );
        }

        this.setState({
            places,
            searchValue,
        });
    }

    toggleActionSheet(place) {
        this.setState({
            showActionSheetForPlace: place,
        });
    }

    selectActionSheetItem(item) {
        if (item === "Cancel") {
            this.toggleActionSheet();
        } else if (item === "Go here" || item === "Visit again") {
            this.linkToLocation(this.state.showActionSheetForPlace.location);

            // Clear place from state
            this.toggleActionSheet();
        } else {
            let data = this.props.userPlaces ? this.props.userPlaces : [];

            // Check if the user has already been here
            const isVisited = utilities.isValueInArray(
                this.state.showActionSheetForPlace.id,
                data,
                true,
            );

            if (isVisited || isVisited === 0) {
                data.splice(isVisited, 1);
            } else {
                data.push(this.state.showActionSheetForPlace.id);
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
                        this.state.showActionSheetForPlace.name +
                        " has been marked as " +
                        (isVisited || isVisited === 0
                            ? "not visited"
                            : "visited"),
                    autoHide: true,
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

        if (this.state.showActionSheetForPlace) {
            const isVisited =
                this.props.userPlaces &&
                utilities.isValueInArray(
                    this.state.showActionSheetForPlace.id,
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
                    iconStyle={{ color: styleConstants.primaryText }}
                    textStyle={styles.actionSheetText}
                />
            );
        }

        return (
            <Page>
                <LinearGradient
                    colors={[
                        styleConstants.primary,
                        styleConstants.darkPrimary,
                    ]}
                    style={styles.headerContainer}>
                    <TouchableIcon
                        handlePress={() => Actions.pop()}
                        iconName="chevron-left"
                        iconStyle={styles.headerIcon}
                        style={styles.headerIconContainer}
                    />
                    <InputBar
                        value={this.state.searchValue}
                        handleChange={this.updateSearchValue}
                        placeholder="Where to?"
                        placeholderTextColor={styleConstants.transWhite}
                        containerStyle={styles.inputBarContainer}
                        style={styles.inputBar}
                        showDeleteButton
                        deleteButtonStyle={styles.inputBarDeleteButton}
                        deleteButtonIconStyle={styles.inputBarDeleteButtonIcon}
                        autoFocus
                    />
                </LinearGradient>
                <PlaceList
                    data={this.state.places}
                    userLocation={this.props.userLocation}
                    handlePress={this.toggleActionSheet}
                    userPlaces={this.props.userPlaces}
                />
                {actionSheet}
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        places: state.main.appData.app && state.main.appData.app.places,
        userLocation: state.main.appState.userLocation,
        uid: state.main.userAuth.uid,
        userPlaces:
            state.main.appData.users &&
            state.main.appData.users[state.main.userAuth.uid] &&
            state.main.appData.users[state.main.userAuth.uid].visited,
    };
}

const styles = StyleSheet.create({
    headerContainer: {
        alignSelf: "stretch",
        ...styleConstants.largeShadow,
        flexDirection: "row",
    },
    headerIconContainer: {
        justifyContent: "center",
        marginLeft: 8,
        marginRight: -8,
    },
    headerIcon: {
        fontSize: 30,
        color: styleConstants.white,
    },
    inputBarContainer: {
        flex: 1,
        marginVertical: 12,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: styleConstants.transBlack,
        paddingLeft: 16,
        paddingRight: 0,
        borderRadius: 8,
    },
    inputBar: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
        paddingRight: 48,
        height: 52,
    },
    inputBarDeleteButton: {
        backgroundColor: styleConstants.transWhite,
        right: 8,
        top: -4,
    },
    inputBarDeleteButtonIcon: {
        color: styleConstants.primaryText,
    },
    actionSheetText: {
        fontSize: styleConstants.regularFont,
        ...styleConstants.primaryFont,
    },
});

export default connect(mapStateToProps)(Search);
