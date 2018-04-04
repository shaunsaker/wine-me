import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styleConstants from "../assets/styleConstants";

import { Input } from "react-native-simple-components";
import IconButton from "../components/IconButton";

export class EditFieldWidget extends React.Component {
    constructor(props) {
        super(props);

        this.updateValue = this.updateValue.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);

        this.state = {
            active: false,
            value: null,
            loading: false,
        };
    }

    static get propTypes() {
        return {
            value: PropTypes.string,
            fieldNode: PropTypes.string, // database node
            textStyle: PropTypes.any,
            style: PropTypes.any,
        };
    }

    componentDidMount() {
        this.updateValue(this.props.value);
    }

    componentDidUpdate(prevProps) {
        // On save success
        if (
            this.props.value &&
            prevProps.value &&
            this.props.value !== prevProps.value
        ) {
            this.toggleLoading();

            // TODO: this is not working
            this.props.dispatch({
                type: "SET_ERROR",
                errorType: "PROFILE",
                message: "Update success",
            });
        }
    }

    updateValue(value) {
        this.setState({
            value,
        });
    }

    submit() {
        this.toggleLoading();

        this.props.dispatch({
            type: "setData",
            node: this.props.fieldNode,
            data: this.state.value.trim(),
        });
    }

    cancel() {
        this.toggleActive();

        this.updateValue(this.props.value);
    }

    toggleLoading() {
        this.setState({
            loading: !this.state.loading,
        });
    }

    toggleActive() {
        // Focus input
        if (!this.state.active) {
            this.refs.input.focus();
        }

        this.setState({
            active: !this.state.active,
        });
    }

    render() {
        const iconButtonsComponent = this.state.loading ? (
            <ActivityIndicator size="small" color={styleConstants.white} />
        ) : this.state.active ? (
            <View style={styles.iconButtonsContainer}>
                <IconButton
                    handlePress={this.submit}
                    iconName="check"
                    style={styles.button}
                />
                <IconButton
                    handlePress={this.cancel}
                    iconName="close"
                    style={[styles.button, styles.closeButton]}
                />
            </View>
        ) : (
            <IconButton
                handlePress={this.toggleActive}
                iconName="mode-edit"
                style={styles.button}
            />
        );

        return (
            <View style={[styles.container, this.props.style]}>
                <TextInput
                    ref="input"
                    value={this.state.value}
                    onChangeText={this.updateValue}
                    style={[styles.input, this.props.textStyle]}
                    onFocus={!this.state.active ? this.toggleActive : null}
                    underlineColorAndroid="transparent"
                />
                {iconButtonsComponent}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        flex: 1,
        marginRight: 8,
    },
    iconButtonsContainer: {
        flexDirection: "row",
    },
    button: {},
    closeButton: {
        marginLeft: 8,
        backgroundColor: styleConstants.secondaryText,
    },
    input: {
        flex: 1,
    },
});

export default connect(mapStateToProps)(EditFieldWidget);
