import React from "react";
import { Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import styleConstants from "../assets/styleConstants";

export default function UserProfilePhoto(props) {
    /*
    static get propTypes() {
        return {
            photoURL: PropTypes.string,
            size: PropTypes.number,
        };
    }
*/

    const photoURL = props.photoURL
        ? { url: props.photoURL }
        : require("../assets/images/128.jpg"); // TODO: Placeholder image

    return (
        <Image
            source={photoURL}
            style={[
                styles.photo,
                {
                    width: props.size,
                    height: props.size,
                    borderRadius: props.size / 2,
                },
            ]}
        />
    );
}

const styles = StyleSheet.create({
    photo: {
        overflow: "hidden", // ios
    },
});
