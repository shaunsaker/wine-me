import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CloudData from "../cloudData/index";

export class DataHandler extends React.Component {
    static get propTypes() {
        return {
            authenticated: PropTypes.bool,
            uid: PropTypes.string,
            userLocation: PropTypes.object,
        };
    }

    componentDidUpdate(prevProps) {
        // Once authenticated, handle data
        if (this.props.authenticated && !prevProps.authenticated) {
            CloudData.listenForData("users/" + this.props.uid, data => {
                this.props.dispatch({
                    type: "SET_USER_DATA",
                    uid: this.props.uid,
                    data,
                });
            });
        }

        if (this.props.userLocation && !prevProps.userLocation) {
            // Listen for live changes to db
            CloudData.listenForData("app", data => {
                this.props.dispatch({
                    type: "SET_APP_DATA",
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
        uid: state.main.userAuth.uid,
        userLocation: state.main.appState.userLocation,
    };
}

export default connect(mapStateToProps)(DataHandler);
