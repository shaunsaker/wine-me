import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class DataHandler extends React.Component {
  constructor(props) {
    super(props);

    this.handleSyncData = this.handleSyncData.bind(this);
    this.syncPlaces = this.syncPlaces.bind(this);
    this.syncFeaturedPlaces = this.syncFeaturedPlaces.bind(this);
    this.syncSearchAreas = this.syncSearchAreas.bind(this);
    this.syncUserData = this.syncUserData.bind(this);
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func,
      authenticated: PropTypes.bool,
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
    this.syncPlaces();
    this.syncFeaturedPlaces();
    this.syncSearchAreas();
    this.syncUserData();
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

  syncUserData() {
    const { dispatch, uid } = this.props;

    console.log('TODO: GETTING USER DATA');

    // dispatch({
    //   type: 'sync',
    //   meta: {
    //     pathParts: ['users'],
    //     nextAction: {
    //       type: 'SET_FEATURED_PLACES',
    //     },
    //   },
    // });
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.user.authenticated,
  };
}

export default connect(mapStateToProps)(DataHandler);
