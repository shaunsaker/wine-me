import React from "react";
import { ScrollView, View, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { Touchable } from "react-native-simple-components";

export default class PhotoSlider extends React.Component {
    constructor(props) {
        super(props);

        this.setActivePhotoIndex = this.setActivePhotoIndex.bind(this);
        this.scrollTo = this.scrollTo.bind(this);

        this.state = {
            activePhotoIndex: 0,
        };
    }

    static get propTypes() {
        return {
            photos: PropTypes.array, // TODO: of photoURLS or requires
            height: PropTypes.any,
        };
    }

    setActivePhotoIndex(index) {
        this.setState({
            activePhotoIndex: index,
        });

        this.scrollTo(index);
    }

    scrollTo(index) {
        this.refs.scrollView.scrollTo({
            y: 0,
            x: styleConstants.windowWidth * index,
            animated: true,
        });
    }

    render() {
        return (
            <View style={styles.outerWrapper}>
                <ScrollView
                    ref="scrollView"
                    horizontal
                    style={[styles.wrapper, { height: this.props.height }]}
                    contentContainerStyle={styles.container}
                    bounces={false}
                    pagingEnabled>
                    {this.props.photos.map((photoURL, index) => {
                        return (
                            <Image
                                key={`photo${photoURL}`}
                                source={{ uri: photoURL }}
                                style={[
                                    styles.image,
                                    { height: this.props.height },
                                ]}
                            />
                        );
                    })}
                </ScrollView>
                <View style={styles.controlsContainer}>
                    {this.props.photos.map((photoURL, index) => {
                        const activeStyles =
                            this.state.activePhotoIndex === index &&
                            styles.activeControl;

                        return (
                            <Touchable
                                key={`control${photoURL}`}
                                onPress={() => this.setActivePhotoIndex(index)}
                                style={[styles.control, activeStyles]}
                            />
                        );
                    })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: styleConstants.windowWidth,
    },
    container: {},
    image: {
        width: styleConstants.windowWidth,
    },
    controlsContainer: {
        position: "absolute",
        bottom: 16,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        width: styleConstants.windowWidth,
    },
    control: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: styleConstants.transWhite,
        marginHorizontal: 4,
    },
    activeControl: {
        backgroundColor: styleConstants.white,
    },
});
