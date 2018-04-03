import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { Page } from "react-native-simple-components";
import CheckInList from "../lists/CheckInList";

export class CheckIns extends React.Component {
    constructor(props) {
        super(props);

        this.navigate = this.navigate.bind(this);

        this.state = {};
    }

    static get propTypes() {
        return {
            places: PropTypes.object,
            users: PropTypes.object,
            checkIns: PropTypes.object,

            // Passed props
            placeID: PropTypes.string, // if supplied, show item's checkIns
            uid: PropTypes.string, // if supplied, show user's checkIns
        };
    }

    navigate(page, props, goBack) {
        if (goBack) {
            Actions.pop();
        } else {
            Actions[page](props);
        }
    }

    render() {
        // Can be a place or user
        const item = this.props.placeID
            ? this.props.places && this.props.places[this.props.placeID]
            : this.props.uid
                ? this.props.users && this.props.users[this.props.uid]
                : null;

        const itemCheckIns =
            item &&
            utilities
                .convertDictionaryToArray(item.checkIns)
                .map((checkInID, index) => {
                    return { ...this.props.checkIns[checkInID], id: checkInID };
                });

        const titleText = this.props.placeID
            ? `Check-in's at ${item && item.name}`
            : this.props.uid
                ? `Places ${item.name && item.name.split(" ")[0]}'s been to`
                : null;

        return (
            <Page style={styles.container}>
                <HeaderBar
                    statusBarStyle="dark-content"
                    leftIconName="close"
                    handleLeftIconPress={() => this.navigate(null, null, true)}
                    leftIconStyle={styles.headerIcon}
                    style={styles.header}
                />
                <View style={styles.bodyContainer}>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.titleText}>{titleText}</Text>
                    </View>
                    <CheckInList
                        data={itemCheckIns}
                        users={this.props.users}
                        places={this.props.uid && this.props.places}
                        handleProfilePress={uid =>
                            !this.props.uid && // Not if on user profile's check-ins
                            this.navigate("userProfile", {
                                uid,
                            })
                        }
                        handlePlacePress={placeID =>
                            this.props.uid &&
                            this.navigate("place", {
                                placeID,
                            })
                        }
                    />
                </View>
            </Page>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConstants.white,
    },
    header: {
        backgroundColor: styleConstants.white,
    },
    headerIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.primaryText,
    },
    bodyContainer: {
        flex: 1,
        alignSelf: "stretch",
    },
    titleTextContainer: {
        padding: 16,
    },
    titleText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        lineHeight: styleConstants.largeFont * 1.5,
    },
});

function mapStateToProps(state) {
    return {
        places: state.main.appData.app && state.main.appData.app.places,
        users: state.main.appData.users,
        checkIns: state.main.appData.app && state.main.appData.app.checkIns,
    };
}

export default connect(mapStateToProps)(CheckIns);
