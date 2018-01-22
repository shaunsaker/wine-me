import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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
} from "react-native-simple-components";
import LinearGradient from "react-native-linear-gradient";
import PlaceList from "../lists/PlaceList";

export class Search extends React.Component {
    constructor(props) {
        super(props);

        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.showActionSheet = this.showActionSheet.bind(this);

        this.state = {
            places: null,
            searchValue: "",
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
                return (
                    place.name
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) > -1
                );
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

    showActionSheet(place) {
        this.props.dispatch({
            type: "TOGGLE_ACTION_SHEET",
            place,
        });
    }

    render() {
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
                    handlePress={this.showActionSheet}
                    userPlaces={this.props.userPlaces}
                />
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
});

export default connect(mapStateToProps)(Search);
