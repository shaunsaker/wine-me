import React from "react";
import {
    View,
    FlatList,
    ScrollView,
    Text,
    Image,
    StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";

import config from "../config";
import styleConstants from "../assets/styleConstants";

import { Touchable } from "react-native-simple-components";

export default class LeaderboardList extends React.Component {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.scrollToUser = this.scrollToUser.bind(this);

        this.itemHeight = 56;
    }

    static get propTypes() {
        return {
            uid: PropTypes.string,
            data: PropTypes.array,
            scrollToUser: PropTypes.oneOfType([
                PropTypes.bool,
                PropTypes.number,
            ]),
        };
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.scrollToUser &&
            this.props.scrollToUser !== prevProps.scrollToUser
        ) {
            // Scroll to the user without delay if event sent here
            this.scrollToUser(true);
        }
    }

    scrollToUser(noDelay) {
        for (let i = 0; i < this.props.data.length; i++) {
            if (this.props.data[i].id === this.props.uid) {
                if (noDelay) {
                    this.refs.flatList.scrollToIndex({
                        index: i,
                        viewPosition: 0.5,
                    });
                } else {
                    setTimeout(() => {
                        this.refs.flatList.scrollToIndex({
                            index: i,
                            viewPosition: 0.5,
                        });
                    }, 1000);
                }

                break;
            }
        }
    }

    renderItem = ({ item, index }) => {
        const evenRow = index % 2 && styles.evenRow;

        const highlightedRow =
            item.id === this.props.uid && styles.highlightedRow;

        const highlightedText = highlightedRow && styles.highlightedText;

        const corks = item.visited.length * config.corks.visited;

        return (
            <View style={[styles.row, evenRow, highlightedRow]}>
                <Text
                    style={[
                        styles.text,
                        styles.numberText,
                        styles.firstColumn,
                        highlightedText,
                    ]}>
                    {index + 1}
                </Text>
                <View style={styles.secondColumn}>
                    <Text
                        numberOfLines={1}
                        style={[styles.text, highlightedText]}>
                        {item.userName}
                    </Text>
                </View>
                <Text
                    numberOfLines={1}
                    style={[styles.text, styles.thirdColumn, highlightedText]}>
                    {corks}
                </Text>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.outerWrapper}>
                <View style={styles.headerRow}>
                    <Text style={[styles.headerText, styles.firstColumn]}>
                        #
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={[styles.headerText, styles.secondColumn]}>
                        Name
                    </Text>
                    <Text style={[styles.headerText, styles.thirdColumn]}>
                        Corks
                    </Text>
                </View>
                <FlatList
                    ref="flatList"
                    keyExtractor={item => item.id}
                    data={this.props.data}
                    renderItem={this.renderItem}
                    style={styles.wrapper}
                    contentContainerStyle={styles.container}
                    getItemLayout={(data, index) => ({
                        length: this.itemHeight,
                        offset: this.itemHeight * index,
                        index,
                    })}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerWrapper: {
        alignSelf: "stretch",
        flex: 1,
        padding: 16,
        paddingTop: 0,
    },
    wrapper: {},
    container: {},
    headerRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: styleConstants.dividerColor,
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    headerText: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.secondaryText,
        ...styleConstants.primaryFont,
    },
    row: {
        flexDirection: "row",
        paddingHorizontal: 8,
        height: 56,
    },
    evenRow: {
        backgroundColor: styleConstants.dividerColor,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5",
    },
    highlightedRow: {
        backgroundColor: styleConstants.lightSecondary,
        borderBottomWidth: 1,
        borderBottomColor: "#efe3ca",
    },
    highlightedText: {
        color: styleConstants.white,
    },
    firstColumn: {
        flex: 0.2,
        marginRight: 4,
    },
    secondColumn: {
        flex: 1,
        marginRight: 4,
    },
    thirdColumn: {
        flex: 0.22,
        marginRight: 4,
    },
    text: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primaryText,
        ...styleConstants.primaryFont,
        paddingVertical: 8,
        marginVertical: 8,
    },
    numberText: {
        color: styleConstants.primaryText,
    },
});
