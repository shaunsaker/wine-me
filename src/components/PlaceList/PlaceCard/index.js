import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import utils from '../../../utils';
import config from '../../../config';

import PlaceCard from './PlaceCard';

export class PlaceCardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
    this.navigate = this.navigate.bind(this);

    this.state = {};
  }

  static propTypes = {
    place: PropTypes.shape({
      name: PropTypes.string,
      location: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
      photoReferences: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,

    // From store
    deviceLocation: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }).isRequired,
    userCheckIns: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {};

  onPress() {
    const { place } = this.props;

    this.navigate('place', { place });
  }

  navigate(page, props) {
    utils.app.navigate(page, props);
  }

  render() {
    const { place, deviceLocation, userCheckIns } = this.props;

    // Get the google places photo uri from the photo reference
    const photoReference = place.photoReferences && place.photoReferences[0];
    const uri =
      photoReference &&
      utils.app.getGooglePlacesPhotoURI(
        photoReference,
        config.googlePlaces.maxImageHeight,
        config.googlePlaces.apiKey,
      );
    const imageSource = uri && {
      uri,
    };
    const title = place.name;

    // Get the relative distance between the place and the device location (if it's available)
    let parsedDeviceLocation;
    let relativeDistance;
    let label;

    if (deviceLocation.latitude) {
      parsedDeviceLocation = {
        lat: deviceLocation.latitude,
        lng: deviceLocation.longitude,
      };
      relativeDistance = Math.round(
        utils.app.getDistanceBetweenCoordinates(place.location, parsedDeviceLocation),
      );

      label = `${relativeDistance} km from you`;
    }

    // Check if the user has checked into the place
    const hasCheckedIn = utils.objects
      .convertObjectToArray(userCheckIns)
      .filter((checkIn) => checkIn.place_id === place.id).length
      ? true
      : null;

    return (
      <PlaceCard
        imageSource={imageSource}
        title={title}
        label={label}
        handlePress={this.onPress}
        hasCheckedIn={hasCheckedIn}
        testID="placeCardContainer"
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    deviceLocation: state.appState.deviceLocation,
    userCheckIns: state.appData.userCheckIns,
  };
}

export default connect(mapStateToProps)(PlaceCardContainer);
