import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { Page, HeaderBar, TouchableIcon } from "react-native-simple-components";
import InfoBlock from "../components/InfoBlock";
import LeaderboardList from "../lists/LeaderboardList";

export class Leaderboard extends React.Component {
    constructor(props) {
        super(props);

        this.scrollToUser = this.scrollToUser.bind(this);

        this.state = {
            scrollToUser: null,
        };
    }

    static get propTypes() {
        return {
            users: PropTypes.object,
            uid: PropTypes.string,
        };
    }

    scrollToUser() {
        this.setState({
            scrollToUser: Date.now(),
        });
    }

    render() {
        // TODO: If on mount, no userName, display userName page to enter name

        let users = utilities.convertDictionaryToArray(this.props.users, true);

        // Only display users with usernames
        users = users.filter(item => {
            return item.userName;
        });

        const userName = null;
        // this.props.users[this.props.uid] &&
        // this.props.users[this.props.uid].userName;

        return (
            <Page style={styles.container}>
                <HeaderBar
                    leftIconName="chevron-left"
                    leftIconStyle={styles.headerIcon}
                    handleLeftIconPress={() => Actions.pop()}
                    style={styles.header}
                    statusBarStyle="dark-content"
                    textRight
                    text={userName ? "Hello, " + userName : "Claim your name"}
                    textStyle={styles.headerText}
                    handleTextPress={userName && this.scrollToUser}
                />
                <View
                    style={{
                        alignSelf: "stretch",
                        padding: 16,
                        paddingTop: 0,
                    }}>
                    <InfoBlock
                        title="WineMe Leaderboard"
                        description="Claim your name and start visiting wine farms. Each visit is equal to 5 corks! Your total cork tally will end up here."
                    />
                </View>
                <LeaderboardList
                    data={users}
                    uid={this.props.uid}
                    scrollToUser={this.state.scrollToUser}
                />
            </Page>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.main.appData.users,
        uid: state.main.userAuth.uid,
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConstants.white,
    },
    header: {},
    headerIcon: {
        fontSize: 30,
        color: styleConstants.primaryText,
        marginLeft: -8,
    },
    headerText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        textDecorationLine: "underline",
    },
});

export default connect(mapStateToProps)(Leaderboard);
