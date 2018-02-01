import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { Label } from "react-native-simple-components";

export default function Suggestions(props) {
    // static get propTypes() {
    //     return {
    //         suggestions: PropTypes.array,
    //         handleSelect: PropTypes.func,
    //     };
    // }

    return (
        <ScrollView
            style={styles.wrapper}
            contentContainerStyle={styles.container}
            horizontal
            keyboardShouldPersistTaps="handled">
            {props.suggestions &&
                props.suggestions.map((suggestion, index) => {
                    return (
                        <Label
                            text={suggestion}
                            textStyle={styles.labelText}
                            style={styles.label}
                            key={suggestion}
                            handlePress={() => props.handleSelect(suggestion)}
                        />
                    );
                })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    wrapper: {},
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 16,
    },
    label: {
        marginBottom: 16,
        marginRight: 16,
        borderRadius: 8,
        backgroundColor: styleConstants.lightSecondary,
    },
    labelText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
});
