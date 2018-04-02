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
        this.hasUserCheckedIn = this.hasUserCheckedIn.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    static get propTypes() {
        return {
            data: PropTypes.array,
            handlePress: PropTypes.func,
            userCheckIns: PropTypes.object,
            checkIns: PropTypes.object,
            scrollToTop: PropTypes.any, // on change, scrollToTop
            userLocation: PropTypes.object,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.scrollToTop !== prevProps.scrollToTop) {
            this.scrollToTop();
        }
    }

    renderItem = ({ item, index }) => {
        const hasUserCheckedIn = this.hasUserCheckedIn(item.id);

        return (
            <PlaceCard
                place={item}
                handlePress={() => this.props.handlePress(item.id)}
                hasUserCheckedIn={hasUserCheckedIn}
                userLocation={this.props.userLocation}
            />
        );
    };

    hasUserCheckedIn(placeID) {
        let hasUserCheckedIn;
        const userCheckIns = utilities.convertDictionaryToArray(
            this.props.userCheckIns,
        );

        for (let i = 0; i < userCheckIns.length; i++) {
            const checkInID = userCheckIns[i];
            if (this.props.checkIns[checkInID].placeID === placeID) {
                hasUserCheckedIn = true;
                break;
            }
        }

        return hasUserCheckedIn;
    }

    scrollToTop() {
        this.refs.flatList.scrollToOffset({ x: 0, y: 0 });
    }

    render() {
        return (
            <FlatList
                ref="flatList"
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
        backgroundColor: styleConstants.white,
    },
    container: {
        paddingTop: 16,
        paddingBottom: 56 + 16,
    },
});
