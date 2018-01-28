import React from "react";
import { View, ScrollView, Text, StyleSheet, Platform } from "react-native";
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
import SearchFilterBar from "../components/SearchFilterBar";
import PlaceList from "../lists/PlaceList";
import BlankState from "../components/BlankState";

export class Search extends React.Component {
    constructor(props) {
        super(props);

        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.showActionSheet = this.showActionSheet.bind(this);
        this.toggleFilterBar = this.toggleFilterBar.bind(this);
        this.showAreaResults = this.showAreaResults.bind(this);

        this.state = {
            places: null,
            searchValue: "",
            searchByAreaValue: null,
            showFilterBar: false,
        };
    }

    static get propTypes() {
        return {
            places: PropTypes.object,
            userLocation: PropTypes.object,
            uid: PropTypes.string,
            userPlaces: PropTypes.array,
            searchAreas: PropTypes.object,
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

    toggleFilterBar() {
        this.setState({
            showFilterBar: !this.state.showFilterBar,
        });
    }

    showAreaResults(area) {
        // TODO: search by area and value

        this.toggleFilterBar();

        // Calculate the relative distance between coords and place
        // Return those that are below radius (eg. 50km)

        const coords = this.props.searchAreas[area].location;

        let places = utilities.convertDictionaryToArray(
            this.props.places,
            true,
        );

        let searchPlaces = places.filter((place, index) => {
            return (
                utilities.getDistanceBetweenCoordinateSets(
                    coords,
                    place.location,
                ) <= 10
            );
        });

        console.log(searchPlaces.length);

        this.setState({
            places: searchPlaces,
        });
    }

    render() {
        const mainContent =
            !this.state.searchValue && !this.state.places ? (
                <BlankState
                    title="Search over 568+ places"
                    description="*Western Cape only"
                />
            ) : this.state.places && this.state.places.length ? (
                <PlaceList
                    data={this.state.places}
                    userLocation={this.props.userLocation}
                    handlePress={this.showActionSheet}
                    userPlaces={this.props.userPlaces}
                />
            ) : (
                <BlankState
                    title="You've clearly had too many."
                    description="We couldn't find any Places matching that name."
                />
            );

        let searchAreas, filterBar;

        if (this.state.showFilterBar) {
            searchAreas = utilities.convertDictionaryToArrayOfKeys(
                this.props.searchAreas,
            );

            searchAreas = utilities.sortArray(searchAreas);

            filterBar = (
                <SearchFilterBar
                    filters={searchAreas}
                    handleSubmit={this.showAreaResults}
                />
            );
        }

        return (
            <Page style={styles.container}>
                <LinearGradient
                    colors={[
                        styleConstants.primary,
                        styleConstants.darkPrimary,
                    ]}
                    style={styles.headerWrapper}>
                    <View style={styles.headerContainer}>
                        <TouchableIcon
                            handlePress={() => Actions.pop()}
                            iconName="chevron-left"
                            iconStyle={styles.headerIcon}
                            style={styles.headerLeftIconContainer}
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
                            deleteButtonIconStyle={
                                styles.inputBarDeleteButtonIcon
                            }
                            autoFocus
                        />
                        <TouchableIcon
                            handlePress={this.toggleFilterBar}
                            iconName="sort"
                            iconStyle={styles.headerIcon}
                            style={styles.headerRightIconContainer}
                        />
                    </View>
                    {filterBar}
                </LinearGradient>
                {mainContent}
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
        searchAreas:
            state.main.appData.app && state.main.appData.app.searchAreas,
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConstants.white,
    },
    headerWrapper: {
        alignSelf: "stretch",
        ...styleConstants.largeShadow,
        paddingTop: Platform.OS === "ios" ? 22 : 0,
        borderWidth: 0,
        backgroundColor: styleConstants.white,
    },
    headerContainer: {
        flexDirection: "row",
    },
    headerLeftIconContainer: {
        justifyContent: "center",
        marginLeft: 8,
        marginRight: -8,
    },
    headerRightIconContainer: {
        justifyContent: "center",
        marginRight: 16,
        marginLeft: -8,
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
