import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";

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
            userLocation: PropTypes.object,
            handlePress: PropTypes.func,
            handleLongPress: PropTypes.func,
        };
    }

    renderItem = ({ item, index }) => {
        return (
            <PlaceCard
                place={item}
                userLocation={this.props.userLocation}
                handlePress={null}
                handleLongPress={null}
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
