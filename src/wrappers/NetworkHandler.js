import React from "react";
import { NetInfo } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Analytics from "../analytics";

export class NetworkHandler extends React.Component {
    constructor(props) {
        super(props);

        this.startLatencyTimer = this.startLatencyTimer.bind(this);
        this.clearLatencyTimer = this.clearLatencyTimer.bind(this);
        this.goOffline = this.goOffline.bind(this);
        this.goOnline = this.goOnline.bind(this);

        this.timer;
        this.latencyTimeout = 5;

        this.state = {
            time: 0,
        };
    }

    static get propTypes() {
        return {
            appStart: PropTypes.bool,
            loading: PropTypes.bool,
            networkType: PropTypes.string,
            isOnline: PropTypes.bool,
        };
    }

    componentDidMount() {
        NetInfo.addEventListener(
            "connectionChange",
            this.handleConnectionChange,
        );

        this.startLatencyTimer();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.loading &&
            !prevProps.loading &&
            this.props.networkType !== "none"
        ) {
            // New loading event started
            this.startLatencyTimer();
        } else if (!this.props.loading && prevProps.loading) {
            // Loading event ended
            this.clearLatencyTimer();
        }

        // Check to see if time > config.latencyTimeout, ie. slow connection
        if (this.state.time && this.state.time > this.latencyTimeout) {
            this.goOffline();
        }

        // TODO: Check to see if network has stabilised
    }

    componentWillUnmount() {
        NetInfo.removeEventListener(
            "connectionChange",
            this.handleConnectionChange,
        );
    }

    handleConnectionChange = connectionInfo => {
        this.props.dispatch({
            type: "SET_NETWORK_TYPE",
            networkType: connectionInfo.type,
        });
    };

    startLatencyTimer() {
        this.timer = null;

        this.timer = setInterval(() => {
            this.setState({
                time: (this.state.time += 1),
            });
        }, 1000);
    }

    clearLatencyTimer() {
        clearInterval(this.timer);

        this.setState({
            time: 0,
        });
    }

    goOffline() {
        Analytics.logEvent("network_offline");

        this.props.dispatch({
            type: "SET_ERROR",
            errorType: "NETWORK",
            message: "Slow network detected. Switching to offline mode.",
        });

        // Set firebase to offline mode
        firebase.database().goOffline();

        this.props.dispatch({
            type: "SET_IS_ONLINE",
            isOnline: false,
        });

        this.clearLatencyTimer();
    }

    goOnline() {
        Analytics.logEvent("network_stabilised");

        this.props.dispatch({
            type: "SET_ERROR",
            errorType: "NETWORK",
            message: "Network has stabilised. Switching to online mode.",
        });

        // Set firebase to offline mode
        firebase.database().goOnline();

        this.props.dispatch({
            type: "SET_IS_ONLINE",
            isOnline: true,
        });
    }

    render() {
        return this.props.children;
    }
}

function mapStateToProps(state) {
    return {
        appStart: state.main.appState.appStart,
        loading: state.main.appState.loading,
        networkType: state.main.appState.networkType,
        isOnline: state.main.appState.isOnline,
    };
}

export default connect(mapStateToProps)(NetworkHandler);
