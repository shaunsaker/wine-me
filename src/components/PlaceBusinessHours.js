import React from "react";
import { View, StyleSheet, Easing } from "react-native";
import PropTypes from "prop-types";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { AnimateHeight, AnimateRotate } from "react-native-simple-animators";
import InfoRow from "./InfoRow";
import Icon from "react-native-vector-icons/MaterialIcons";

const ITEM_HEIGHT = 57;

export default class PlaceBusinessHours extends React.Component {
    constructor(props) {
        super(props);

        this.setBusinessHours = this.setBusinessHours.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);

        this.days = [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ];

        this.state = {
            collapse: true,
            businessHours: null,
        };
    }

    static get propTypes() {
        return {
            businessHours: PropTypes.array,
        };
    }

    componentDidMount() {
        this.setBusinessHours();
    }

    setBusinessHours() {
        let businessHours = this.props.businessHours;
        const date = new Date();
        const dayIndex = date.getDay() - 1; // Sunday is usually first

        // Prepare
        businessHours = businessHours.map((item, index) => {
            const day = item.split(":")[0];
            const time = item.split(day + ": ")[1];
            let relativeIndex = index - dayIndex;
            if (relativeIndex < 0) {
                relativeIndex += 7;
            }

            return {
                item,
                relativeIndex,
            };
        });

        // Sort
        businessHours = utilities.sortArrayOfObjectsByKey(
            businessHours,
            "relativeIndex",
        );

        this.setState({ businessHours });
    }

    toggleCollapse() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    render() {
        return (
            <View>
                <View style={styles.headerContainer}>
                    <InfoRow
                        iconName="alarm"
                        text="Business hours"
                        isHeader
                        handlePress={this.toggleCollapse}
                        hideRightIcon
                    />
                    <AnimateRotate
                        initialValue={0}
                        finalValue={180}
                        shouldAnimateIn={!this.state.collapse}
                        shouldAnimateOut={this.state.collapse}
                        style={styles.headerIconContainer}>
                        <Icon name="chevron-left" style={styles.headerIcon} />
                    </AnimateRotate>
                </View>
                <AnimateHeight
                    initialValue={0}
                    finalValue={ITEM_HEIGHT * 7}
                    shouldAnimateIn={!this.state.collapse}
                    shouldAnimateOut={this.state.collapse}
                    style={{ overflow: "hidden" }}>
                    {this.state.businessHours &&
                        this.state.businessHours.map((item, index) => {
                            return (
                                <InfoRow
                                    key={item.item}
                                    text={item.item}
                                    isBusinessHours
                                    isHighlighted={index === 0}
                                    itemHeight={ITEM_HEIGHT}
                                />
                            );
                        })}
                </AnimateHeight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {},
    headerIconContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        justifyContent: "center",
        marginRight: 16,
    },
    headerIcon: {
        fontSize: 30,
        color: styleConstants.primaryText,
        transform: [{ rotate: "-90deg" }],
    },
});
