import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import SnackBar from "../widgets/SnackBar";

export class SnackBarHandler extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignSelf: "stretch" }}>
                {this.props.children}
                <SnackBar />
            </View>
        );
    }
}

export default SnackBarHandler;
