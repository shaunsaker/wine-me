import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import utils from '../../../utils';
import styles from './styles';

import Page from '../../../components/Page';
import HeaderBar from '../../../components/HeaderBar';
import SearchInput from '../../../components/SearchInput';
import SectionHeader from '../../../components/SectionHeader';
import Loader from '../../../components/Loader';
import PlaceList from '../../../components/PlaceList';
import TabBar from '../../../components/TabBar';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.onSearchButtonPress = this.onSearchButtonPress.bind(this);
    this.onPlacePress = this.onPlacePress.bind(this);
    this.navigate = this.navigate.bind(this);

    this.state = {};
  }

  static propTypes = {
    featuredPlaces: PropTypes.shape({ place_id: PropTypes.string }),
    places: PropTypes.shape({ location: PropTypes.shape({}) }),
    deviceLocation: PropTypes.shape({ latitude: PropTypes.number, longitude: PropTypes.number }),
  };

  static defaultProps = {};

  onSearchButtonPress() {
    this.navigate('search');
  }

  onPlacePress(place) {
    this.navigate('place', { place });
  }

  navigate(page, props) {
    utils.app.navigate(page, props);
  }

  render() {
    const { featuredPlaces, places, deviceLocation } = this.props;

    // Iterate over featuredPlaces object to get place_id
    // and return the place from places using the place_id
    const featuredPlacesArray = Object.keys(featuredPlaces).map((documentID) => {
      const placeID = featuredPlaces[documentID].place_id;
      const place = places[placeID];

      return place;
    });

    // Create places array from places object
    // Create a relative distance key based on coords
    // Sort it by distance (low to high)
    // Limit places to 10 (NOTE: This greatly improves perf)
    const placesArray = utils.arrays
      .sortArrayOfObjectsByKey(
        utils.objects.convertObjectToArray(places).map((place) => {
          const newPlace = { ...place };
          const deviceCoords = {
            lat: deviceLocation.latitude,
            lng: deviceLocation.longitude,
          };
          newPlace.relativeDistance = utils.app.getDistanceBetweenCoordinates(
            place.location,
            deviceCoords,
          );

          return newPlace;
        }),
        'relativeDistance',
      )
      .slice(0, 10);

    const featuredPlacesComponent = featuredPlacesArray.length ? (
      <PlaceList data={featuredPlacesArray} handlePress={this.onPlacePress} />
    ) : (
      <Loader />
    );

    const placesComponent = placesArray.length ? (
      <PlaceList data={placesArray} handlePress={this.onPlacePress} />
    ) : (
      <Loader />
    );

    return (
      <Page>
        <HeaderBar>
          <SearchInput handlePress={this.onSearchButtonPress} />
        </HeaderBar>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <SectionHeader text="Featured" />

          {featuredPlacesComponent}

          <SectionHeader text="Closest to me" />

          {placesComponent}
        </ScrollView>

        <TabBar />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    featuredPlaces: state.appData.featuredPlaces,
    places: state.appData.places,
    deviceLocation: state.appState.deviceLocation,
  };
}

export default connect(mapStateToProps)(Home);
