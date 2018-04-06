import React from "react";
import { ScrollView, View, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

import { Touchable } from "react-native-simple-components";
import CarouselControls from "./CarouselControls";

export default class Carousel extends React.Component {
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
                    pagingEnabled
                    scrollEnabled={false}>
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
                <CarouselControls
                    photos={this.props.photos}
                    activePhotoIndex={this.state.activePhotoIndex}
                    handleSetActivePhotoIndex={this.setActivePhotoIndex}
                />
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
        backgroundColor: styleConstants.darkPrimary,
    },
});
