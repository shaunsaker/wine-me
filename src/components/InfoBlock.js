import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

export default function InfoBlockComponent(props) {
    /*
    static get propTypes() {
        return {
          title: PropTypes.string.,
          description: PropTypes.string,
        };
    }
*/

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{props.title}</Text>
            <Text style={styles.descriptionText}>{props.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.primaryText,
        ...styleConstants.boldFont,
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
    },
});
