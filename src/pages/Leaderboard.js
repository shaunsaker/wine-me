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
import UserNameModal from "../modals/UserNameModal";
import CustomIcon from "../assets/icons";
import Icon from "react-native-vector-icons/MaterialIcons";

export class Leaderboard extends React.Component {
    constructor(props) {
        super(props);

        this.toggleUserNameModal = this.toggleUserNameModal.bind(this);
        this.scrollToUser = this.scrollToUser.bind(this);

        this.state = {
            showUserNameModal: false,
            scrollToUser: null,
        };
    }

    static get propTypes() {
        return {
            users: PropTypes.object,
            uid: PropTypes.string,
        };
    }

    componentDidMount() {
        if (
            !(
                this.props.users[this.props.uid] &&
                this.props.users[this.props.uid].userName
            )
        ) {
            // No userName
            this.toggleUserNameModal();
        }
    }

    toggleUserNameModal() {
        this.setState({
            showUserNameModal: !this.state.showUserNameModal,
        });
    }

    scrollToUser() {
        this.setState({
            scrollToUser: Date.now(),
        });
    }

    render() {
        // TODO: If on mount, no userName, display userName modal to enter name

        let users = utilities.convertDictionaryToArray(this.props.users, true);

        // Only display users with usernames
        users = users.filter(item => {
            return item.userName;
        });

        const userName = null;
        // this.props.users[this.props.uid] &&
        // this.props.users[this.props.uid].userName;

        const userNameModal = this.state.showUserNameModal && <UserNameModal />;

        return (
            <Page style={styles.container}>
                <HeaderBar
                    leftIconName="chevron-left"
                    leftIconStyle={styles.headerIcon}
                    handleLeftIconPress={() => Actions.pop()}
                    style={styles.header}
                    statusBarStyle="dark-content"
                    textRight
                    text={userName ? "Hello, " + userName : "temp: no username"}
                    textStyle={styles.headerText}
                    handleTextPress={userName && this.scrollToUser}
                />
                <InfoBlock
                    title="WineMe Leaderboard"
                    description="Claim your name and start visiting wine farms. Each visit is equal to 5 corks! Your total cork tally will end up here."
                    iconName="stars"
                    style={styles.infoBlock}
                />
                <LeaderboardList
                    data={users}
                    uid={this.props.uid}
                    scrollToUser={this.state.scrollToUser}
                />
                {userNameModal}
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
    infoBlock: {
        paddingTop: 0,
    },
});

export default connect(mapStateToProps)(Leaderboard);
