import React from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Platform,
    Keyboard,
} from "react-native";
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
import Suggestions from "../components/Suggestions";
import PlaceList from "../lists/PlaceList";
import InfoBlock from "../components/InfoBlock";

export class Search extends React.Component {
    constructor(props) {
        super(props);

        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.navigate = this.navigate.bind(this);

        this.state = {
            places: null,
            searchValue: null,
        };
    }

    static get propTypes() {
        return {
            places: PropTypes.object,
            userLocation: PropTypes.object,
            uid: PropTypes.string,
            userCheckIns: PropTypes.array,
            searchAreas: PropTypes.object,
        };
    }

    updateSearchValue(searchValue, areaSearch) {
        let places;

        if (searchValue) {
            places = utilities.convertDictionaryToArray(
                this.props.places,
                true,
            );

            if (areaSearch) {
                Keyboard.dismiss();

                places = places.filter(place => {
                    return (
                        utilities.getDistanceBetweenCoordinateSets(
                            place.location,
                            this.props.searchAreas[searchValue].location,
                        ) <= this.props.searchAreas[searchValue].radius
                    );
                });
            } else {
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
            }

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

    navigate(page, props, goBack) {
        if (goBack) {
            Actions.pop();
        } else {
            Actions[page](props);
        }
    }

    render() {
        const mainContent =
            !this.state.searchValue && !this.state.places ? (
                <InfoBlock
                    title="Search over 525+ places in the Western Cape"
                    description="If you're heading somewhere specific, try an area search by tapping one of the red buttons."
                />
            ) : this.state.places && this.state.places.length ? (
                <PlaceList
                    data={this.state.places}
                    userLocation={this.props.userLocation}
                    handlePress={placeID => this.navigate("place", { placeID })}
                    userCheckIns={this.props.userCheckIns}
                    scrollToTop={this.state.places.length}
                />
            ) : (
                <InfoBlock
                    title="You've clearly had too many."
                    description="We couldn't find any Places matching that name."
                />
            );

        let searchAreas = utilities.convertDictionaryToArrayOfKeys(
            this.props.searchAreas,
        );

        searchAreas = utilities.sortArray(searchAreas);

        return (
            <Page style={styles.container}>
                <View style={styles.headerWrapper}>
                    <View style={styles.headerContainer}>
                        <TouchableIcon
                            handlePress={() => this.navigate(null, null, true)}
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
                    </View>
                    <Suggestions
                        suggestions={searchAreas}
                        handleSelect={area =>
                            this.updateSearchValue(area, true)
                        }
                    />
                </View>
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
        userCheckIns:
            state.main.appData.users &&
            state.main.appData.users[state.main.userAuth.uid] &&
            utilities.convertDictionaryToArray(
                state.main.appData.users[state.main.userAuth.uid].checkIns,
            ),
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
        backgroundColor: styleConstants.darkPrimary,
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
