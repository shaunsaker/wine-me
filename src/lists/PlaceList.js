import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import PlaceCard from "../components/PlaceCard";

export default class PlaceList extends React.Component {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }

    static get propTypes() {
        return {
            data: PropTypes.array,
            handlePress: PropTypes.func,
            userPlaces: PropTypes.array,
        };
    }

    renderItem = ({ item, index }) => {
        const isVisited =
            this.props.userPlaces &&
            utilities.isValueInArray(item.id, this.props.userPlaces);

        return (
            <PlaceCard
                place={item}
                handlePress={() => this.props.handlePress(item)}
                isVisited={isVisited}
            />
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
                extraDate={this.props.userLocation}
            />
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: "stretch",
    },
    container: {
        paddingTop: 16,
        paddingBottom: 56 + 16,
    },
});
