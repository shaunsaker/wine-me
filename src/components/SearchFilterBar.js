import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { AnimateTranslateY } from "react-native-simple-animators";
import { Button, ButtonLink, CheckBox } from "react-native-simple-components";
import RadioButton from "./RadioButton";

export default class SearchFilterBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggleSelect = this.toggleSelect.bind(this);

        this.state = {
            filter: null,
        };
    }

    static get propTypes() {
        return {
            filters: PropTypes.array,
            handleSubmit: PropTypes.func,
        };
    }

    toggleSelect(filter) {
        this.setState({
            filter,
        });
    }

    render() {
        return (
            <AnimateTranslateY
                initialValue={-90}
                finalValue={0}
                shouldAnimateIn
                style={styles.container}>
                <ScrollView style={styles.labelsContainer}>
                    {this.props.filters.map((filter, index) => {
                        return (
                            <View style={styles.label} key={filter}>
                                <Text style={styles.labelText}>{filter}</Text>
                                <RadioButton
                                    isSelected={this.state.filter === filter}
                                    style={styles.radioButton}
                                    circleStyle={styles.radioButtonCircle}
                                    handlePress={() =>
                                        this.toggleSelect(filter)
                                    }
                                />
                            </View>
                        );
                    })}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Button
                        text="Go"
                        textStyle={styles.buttonText}
                        style={styles.button}
                        handlePress={() =>
                            this.props.handleSubmit(this.state.filter)
                        }
                    />
                </View>
            </AnimateTranslateY>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        backgroundColor: styleConstants.white,
        padding: 16,
        borderTopColor: styleConstants.dividerColor,
    },
    labelsContainer: {},
    label: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    labelText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
    },
    buttonContainer: {},
    button: {
        backgroundColor: styleConstants.lightSecondary,
        borderRadius: 8,
        alignSelf: "flex-start",
        height: "auto",
        paddingVertical: 8,
    },
    buttonText: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.white,
        ...styleConstants.primaryFont,
    },
    radioButton: {
        borderColor: styleConstants.primaryText,
    },
    radioButtonCircle: {
        backgroundColor: styleConstants.lightSecondary,
    },
});
