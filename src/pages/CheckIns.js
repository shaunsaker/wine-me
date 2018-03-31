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

            // Passed props
            placeID: PropTypes.string,
        };
    }

    static defaultProps = {
        placeID: "ChIJzxOZlRfKzR0RLPvYwtEU8w4",
    };

    navigate(page, props, goBack) {
        if (goBack) {
            Actions.pop();
        } else {
            Actions[page](props);
        }
    }

    render() {
        const place =
            this.props.places && this.props.places[this.props.placeID];

        const placeCheckIns =
            place && utilities.convertDictionaryToArray(place.checkIns, true);

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
                        <Text
                            style={styles.titleText}>{`Check-in's at ${place &&
                            place.name}`}</Text>
                    </View>
                    <CheckInList
                        data={placeCheckIns}
                        users={this.props.users}
                        handleProfilePress={null} // TODO: Link user to profile
                    />
                </View>
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        places: state.main.appData.app && state.main.appData.app.places,
        users: state.main.appData.users,
    };
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

export default connect(mapStateToProps)(CheckIns);
