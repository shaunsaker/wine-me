import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

export default function CarouselControls(props) {
    /*
    static get propTypes() {
        return {
            photos: PropTypes.array,
            activePhotoIndex: PropTypes.number,
            handleSetActivePhotoIndex: PropTypes.func,
        };
    }
*/

    return (
        <View style={styles.controlsContainer}>
            {props.photos.map((photoURL, index) => {
                const activeStyles =
                    props.activePhotoIndex === index && styles.activeControl;

                return (
                    <Touchable
                        key={`control${photoURL}`}
                        onPress={() => props.handleSetActivePhotoIndex(index)}
                        style={[styles.control, activeStyles]}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
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
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: styleConstants.transWhite,
        marginHorizontal: 4,
    },
    activeControl: {
        backgroundColor: styleConstants.white,
    },
});
