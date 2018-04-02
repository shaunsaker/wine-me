import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import ReviewCard from "../components/ReviewCard";

export default class ReviewList extends React.Component {
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
                <ReviewCard
                    review={item}
                    reviewer={this.props.users[item.reviewerID]}
                    handleProfilePress={() =>
                        this.props.handleProfilePress(item.reviewerID)
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
