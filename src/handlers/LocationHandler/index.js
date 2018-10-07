import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppState } from 'react-native';

export class LocationHandler extends React.Component {
  constructor(props) {
    super(props);

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.setAppState = this.setAppState.bind(this);
    this.getLocation = this.getLocation.bind(this);

    this.state = {
      appState: null,
    };
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func,
    };
  }

  componentDidMount() {
    this.getLocation();

    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(nextAppState) {
    const { appState } = this.state;

    // If the app is foregrounded after being backgrounded
    if (nextAppState === 'active' && appState && appState.match(/inactive|background/)) {
      this.getLocation();
    }

    this.setAppState(nextAppState);
  }

  setAppState(appState) {
    this.setState({
      appState,
    });
  }

  getLocation() {
    const { dispatch } = this.props;

    dispatch({
      type: 'checkAndRequestPermission',
      payload: {
        permission: 'location',
      },
      meta: {
        nextAction: {
          type: 'getDeviceLocation',
        },
      },
    });
  }

  render() {
    return null;
  }
}

export default connect()(LocationHandler);
