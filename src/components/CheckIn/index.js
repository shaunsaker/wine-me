import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CheckInButton from './CheckInButton';

export class CheckIn extends React.Component {
  constructor(props) {
    super(props);

    this.onCheckIn = this.onCheckIn.bind(this);
    this.addCheckIn = this.addCheckIn.bind(this);

    this.state = {};
  }

  static propTypes = {
    dispatch: PropTypes.func,
    userCheckIns: PropTypes.shape({}),
    uid: PropTypes.string,

    place: PropTypes.shape({}), // from place page
  };

  static defaultProps = {};

  onCheckIn() {
    this.addCheckIn();
  }

  addCheckIn() {
    const { place, dispatch, uid } = this.props;
    const document = {
      place_id: place.id,
      uid,
    };

    dispatch({
      type: 'addDocument',
      meta: {
        pathParts: ['check_ins'],
      },
      payload: { document },
    });
  }

  render() {
    const { userCheckIns, place } = this.props;

    // Iterate over the userCheckIns object
    // Return place that matches the current place id
    // with the userCheckIn place_id
    const isCheckedIn = Object.keys(userCheckIns).filter(
      (documentID) => userCheckIns[documentID].place_id === place.id,
    ).length
      ? true
      : null;

    return <CheckInButton handlePress={this.onCheckIn} isCheckedIn={isCheckedIn} />;
  }
}

function mapStateToProps(state) {
  return {
    userCheckIns: state.appData.userCheckIns,
    uid: state.user.uid,
  };
}

export default connect(mapStateToProps)(CheckIn);
