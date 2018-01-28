import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CloudData from "../cloudData/index";

export class DataHandler extends React.Component {
    static get propTypes() {
        return {
            authenticated: PropTypes.bool,
            userLocation: PropTypes.object,
        };
    }

    componentDidUpdate(prevProps) {
        // Once authenticated, handle data
        if (this.props.authenticated && !prevProps.authenticated) {
            CloudData.listenForData("users", data => {
                this.props.dispatch({
                    type: "SET_DATA",
                    node: "users",
                    data,
                });
            });
        }

        if (this.props.userLocation && !prevProps.userLocation) {
            // Listen for live changes to db
            CloudData.listenForData("app", data => {
                this.props.dispatch({
                    type: "SET_DATA",
                    node: "app",
                    data,
                });
            });
        }
    }

    render() {
        return this.props.children;
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.main.userAuth.authenticated,
        userLocation: state.main.appState.userLocation,
    };
}

export default connect(mapStateToProps)(DataHandler);
