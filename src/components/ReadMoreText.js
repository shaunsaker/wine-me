import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { Touchable } from "react-native-simple-components";

export default class ReadMoreText extends React.Component {
    constructor(props) {
        super(props);

        this.toggleShowMore = this.toggleShowMore.bind(this);

        this.state = {
            showMore: false,
        };
    }

    static get propTypes() {
        return {
            text: PropTypes.string,
        };
    }

    toggleShowMore() {
        this.setState({
            showMore: !this.state.showMore,
        });
    }

    render() {
        return (
            <Touchable onPress={this.toggleShowMore} disableFeedback>
                <Text
                    numberOfLines={this.state.showMore ? null : 4}
                    style={styles.text}>
                    {this.props.text}
                </Text>
            </Touchable>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        lineHeight: styleConstants.smallFont * 1.5,
    },
});
