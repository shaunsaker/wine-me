import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import InfoBlockComponent from "./InfoBlockComponent";

export default function BlankState(props) {
    /*
    static get propTypes() {
        return {
            title: PropTypes.string,
            description: PropTypes.string,
        };
    }
*/

    return (
        <View style={styles.blankStateContainer}>
            <InfoBlockComponent
                title={props.title}
                description={props.description}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    blankStateContainer: {
        alignSelf: "stretch",
        padding: 16,
    },
});
