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
            places: PropTypes.object, // if supplied, will render place names
            handleProfilePress: PropTypes.func,
            handlePlacePress: PropTypes.func,
        };
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={styles.itemContainer}>
                <ReviewCard
                    review={item}
                    reviewer={this.props.users[item.uid]}
                    place={this.props.places && this.props.places[item.placeID]}
                    handleProfilePress={() =>
                        this.props.handleProfilePress &&
                        this.props.handleProfilePress(item.uid)
                    }
                    handlePlacePress={() =>
                        this.props.handlePlacePress &&
                        this.props.handlePlacePress(item.placeID)
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
