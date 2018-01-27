import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { InfoBlock } from "react-native-simple-components";

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
        <InfoBlock
            title={props.title}
            titleTextStyle={styles.titleText}
            description={props.description}
            descriptionTextStyle={styles.descriptionText}
        />
    );
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: styleConstants.largeFont,
        color: styleConstants.secondary,
        ...styleConstants.boldFont,
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        marginTop: 0,
    },
});
