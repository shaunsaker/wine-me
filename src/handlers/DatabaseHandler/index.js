import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class DatabaseHandler extends React.Component {
  constructor(props) {
    super(props);

    this.handleSyncData = this.handleSyncData.bind(this);
    this.syncPlaces = this.syncPlaces.bind(this);
    this.syncCategories = this.syncCategories.bind(this);
    this.syncFeaturedPlaces = this.syncFeaturedPlaces.bind(this);
    this.syncSearchAreas = this.syncSearchAreas.bind(this);
    this.syncUserCheckIns = this.syncUserCheckIns.bind(this);
    this.syncUserSettings = this.syncUserSettings.bind(this);
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      authenticated: PropTypes.bool,
      uid: PropTypes.string,
    };
  }

  componentDidMount() {
    const { authenticated } = this.props;

    if (authenticated) {
      this.handleSyncData();
    }
  }

  componentDidUpdate(prevProps) {
    const { authenticated } = this.props;

    if (authenticated && !prevProps.authenticated) {
      this.handleSyncData();
    }
  }

  handleSyncData() {
    this.syncCategories();
    this.syncFeaturedPlaces();
    this.syncPlaces();
    this.syncSearchAreas();
    this.syncUserCheckIns();
    this.syncUserSettings();
  }

  syncCategories() {
    const { dispatch } = this.props;

    dispatch({
      type: 'sync',
      meta: {
        pathParts: ['categories'],
        nextAction: {
          type: 'SET_CATEGORIES',
        },
      },
    });
  }

  syncFeaturedPlaces() {
    const { dispatch } = this.props;

    dispatch({
      type: 'sync',
      meta: {
        pathParts: ['featured_places'],
        nextAction: {
          type: 'SET_FEATURED_PLACES',
          payload: {
            ref: 'featuredPlaces',
          },
        },
      },
    });
  }

  syncPlaces() {
    const { dispatch } = this.props;

    dispatch({
      type: 'sync',
      meta: {
        pathParts: ['places'],
        nextAction: {
          type: 'SET_PLACES',
        },
      },
    });
  }

  syncSearchAreas() {
    const { dispatch } = this.props;

    dispatch({
      type: 'sync',
      meta: {
        pathParts: ['search_areas'],
        nextAction: {
          type: 'SET_SEARCH_AREAS',
        },
      },
    });
  }

  syncUserCheckIns() {
    const { dispatch, uid } = this.props;

    dispatch({
      type: 'sync',
      meta: {
        pathParts: ['check_ins'],
        query: ['uid', '==', uid],
        nextAction: {
          type: 'SET_USER_CHECK_INS',
        },
      },
    });
  }

  syncUserSettings() {
    const { dispatch, uid } = this.props;

    dispatch({
      type: 'sync',
      meta: {
        pathParts: ['user_settings'],
        query: ['uid', '==', uid],
        nextAction: {
          type: 'SET_USER_SETTINGS',
        },
      },
    });
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.user.authenticated,
    uid: state.user.uid,
  };
}

export default connect(mapStateToProps)(DatabaseHandler);
