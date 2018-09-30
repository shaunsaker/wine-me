import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import utils from '../../../utils';
import config from '../../../config';

import PlaceCard from './PlaceCard';

export class PlaceCardContainer extends React.Component {
  constructor(props) {
    super(props);

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
    handlePress: PropTypes.func,

    // From store
    deviceLocation: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  };

  static defaultProps = {};

  render() {
    const { place, deviceLocation, handlePress } = this.props;

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

    return (
      <PlaceCard imageSource={imageSource} title={title} label={label} handlePress={handlePress} />
    );
  }
}

function mapStateToProps(state) {
  return {
    deviceLocation: state.appState.deviceLocation,
  };
}

export default connect(mapStateToProps)(PlaceCardContainer);
