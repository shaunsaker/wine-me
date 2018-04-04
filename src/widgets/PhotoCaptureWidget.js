import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import config from "../config";
import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";

import IconButton from "../components/IconButton";

// Captures, resizes, uploads an image to storage and saves the URL to the DB at specified node
export class PhotoCaptureWidget extends React.Component {
    constructor(props) {
        super(props);

        this.openImagePicker = this.openImagePicker.bind(this);
        this.resizeImage = this.resizeImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.toggleLoading = this.toggleLoading.bind(this);
        this.setMessage = this.setMessage.bind(this);

        this.state = {
            loading: false,
        };
    }

    static get propTypes() {
        return {
            // Passed props
            photoURL: PropTypes.string, // the URL of the photo (used to listen for change)
            photoStorageNode: PropTypes.string, // storage node
            photoURLNode: PropTypes.string, // database node
            style: PropTypes.any,
        };
    }

    componentDidUpdate(prevProps) {
        // If new photoURL or if photoURL's different => Success
        if (
            (this.props.photoURL && !prevProps.photoURL) ||
            this.props.photoURL !== prevProps.photoURL
        ) {
            this.toggleLoading();

            this.setMessage("Upload success");
        }
    }

    openImagePicker() {
        this.toggleLoading();

        const options = {
            title: "Choose an option",
            storageOptions: {
                skipBackup: true,
                path: "images",
            },
        };

        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                this.toggleLoading();
            } else if (response.error) {
                this.toggleLoading();

                this.setMessage(response.error);
            } else {
                this.resizeImage(response.uri);
            }
        });
    }

    resizeImage(photoURI) {
        ImageResizer.createResizedImage(
            photoURI,
            config.resizedImages.maxWidth,
            config.resizedImages.maxHeight,
            config.resizedImages.format,
            config.resizedImages.quality,
            0, // rotation
            null, // outputPath - null means it will be stored in the cache folder
        )
            .then(response => {
                this.uploadImage(response.path);
            })
            .catch(error => {
                this.toggleLoading();

                this.setMessage(error.message);
            });
    }

    uploadImage(path) {
        this.props.dispatch({
            type: "uploadFile",
            node: this.props.photoStorageNode,
            path,
            nextAction: {
                type: "setData",
                node: this.props.photoURLNode,
                useData: true, // will attach the response returned from uploadFile as data
            },
        });
    }

    toggleLoading() {
        this.setState({
            loading: !this.state.loading,
        });
    }

    setMessage(message) {
        this.props.dispatch({
            type: "SET_ERROR",
            errorType: "PHOTO",
            message,
        });
    }

    render() {
        return (
            <IconButton
                handlePress={!this.state.loading ? this.openImagePicker : null}
                iconName={!this.state.loading && "add-a-photo"}
                iconComponent={
                    this.state.loading && (
                        <ActivityIndicator
                            size="small"
                            color={styleConstants.white}
                        />
                    )
                }
                style={this.props.style}
            />
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(PhotoCaptureWidget);

const styles = StyleSheet.create({});
