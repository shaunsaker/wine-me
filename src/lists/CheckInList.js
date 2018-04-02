import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import CheckInCard from "../components/CheckInCard";

export default class CheckInList extends React.Component {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }

    static get propTypes() {
        return {
            data: PropTypes.array,
            users: PropTypes.object,
            handleProfilePress: PropTypes.func,
        };
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={styles.itemContainer}>
                <CheckInCard
                    checkIn={item}
                    user={this.props.users && this.props.users[item.uid]}
                    handleProfilePress={() =>
                        this.props.handleProfilePress(item.uid)
                    }
                />
            </View>
        );
    };

    render() {
        return (
            <FlatList
                keyExtractor={item => item.id}
                data={this.props.data}
                renderItem={this.renderItem}
                style={styles.wrapper}
                contentContainerStyle={styles.container}
            />
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: "stretch",
    },
    container: {
        alignSelf: "stretch",
        minHeight: styleConstants.windowHeight - 56 - 56,
        paddingTop: 0,
        paddingBottom: 56 + 16 + 16,
    },
    itemContainer: {
        marginHorizontal: 16,
    },
});
