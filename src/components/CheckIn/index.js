import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CheckInButton from './CheckInButton';

export class CheckIn extends React.Component {
  constructor(props) {
    super(props);

    this.isCheckedIn = this.isCheckedIn.bind(this);
    this.onCheckIn = this.onCheckIn.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
    this.addCheckIn = this.addCheckIn.bind(this);

    this.state = {
      isLoading: false,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userCheckIns: PropTypes.shape({}).isRequired,
    uid: PropTypes.string,

    place: PropTypes.shape({}).isRequired, // from place page
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    const { userCheckIns, place } = this.props;

    // If there is a new check in that matches the place.id
    if (this.isCheckedIn(userCheckIns, place) && !this.isCheckedIn(prevProps.userCheckIns, place)) {
      this.setIsLoading(false);
    }
  }

  isCheckedIn(checkIns, place) {
    // Iterate over the userCheckIns object
    // Return place that matches the current place id
    // with the userCheckIn place_id
    const isCheckedIn = Object.keys(checkIns).filter(
      (documentID) => checkIns[documentID].place_id === place.id,
    ).length
      ? true
      : null;

    return isCheckedIn;
  }

  onCheckIn() {
    this.setIsLoading(true);
    this.addCheckIn();
  }

  setIsLoading(isLoading) {
    this.setState({
      isLoading,
    });
  }

  addCheckIn() {
    const { place, dispatch, uid } = this.props;
    const document = {
      place_id: place.id,
      uid,
      date: Date.now(),
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
    const { isLoading } = this.state;
    const { userCheckIns, place } = this.props;
    const isCheckedIn = this.isCheckedIn(userCheckIns, place);

    return (
      <CheckInButton handlePress={this.onCheckIn} isCheckedIn={isCheckedIn} isLoading={isLoading} />
    );
  }
}

function mapStateToProps(state) {
  return {
    userCheckIns: state.appData.userCheckIns,
    uid: state.user.uid,
  };
}

export default connect(mapStateToProps)(CheckIn);
