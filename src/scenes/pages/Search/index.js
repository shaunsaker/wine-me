import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Keyboard, View } from 'react-native';
import Animator from 'react-native-simple-animators';

import utils from '../../../utils';
import styles from './styles';

import Page from '../../../components/Page';
import HeaderBar from '../../../components/HeaderBar';
import BackButton from '../../../components/BackButton';
import InputContainer from '../../../components/InputContainer';
import SearchInput from '../../../components/SearchInput';
import SearchAreaLabelList from '../../../components/SearchAreaLabelList';
import Label from '../../../components/Label';
import PlaceList from '../../../components/PlaceList';
import BlankState from '../../../components/BlankState';

export class Search extends React.Component {
  constructor(props) {
    super(props);

    this.onBack = this.onBack.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSearchAreaLabelPress = this.onSearchAreaLabelPress.bind(this);
    this.onSelectedSearchAreaLabelPress = this.onSelectedSearchAreaLabelPress.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.dismissKeyboard = this.dismissKeyboard.bind(this);
    this.setSearchArea = this.setSearchArea.bind(this);
    this.onPlacePress = this.onPlacePress.bind(this);
    this.navigate = this.navigate.bind(this);

    this.state = {
      searchTerm: null,
      searchArea: null,
    };
  }

  static propTypes = {
    searchAreas: PropTypes.shape({}),
    places: PropTypes.shape({}),
  };

  static defaultProps = {};

  onBack() {
    this.navigate(); // pop the scene
  }

  onChangeText(text) {
    this.setSearchTerm(text);
  }

  onSubmit() {
    this.dismissKeyboard();
  }

  onSearchAreaLabelPress(searchArea) {
    this.setSearchArea(searchArea);
  }

  onSelectedSearchAreaLabelPress() {
    this.setSearchArea();
  }

  setSearchTerm(searchTerm) {
    this.setState({ searchTerm });
  }

  dismissKeyboard() {
    Keyboard.dismiss();
  }

  setSearchArea(searchArea) {
    this.setState({
      searchArea,
    });
  }

  onPlacePress(place) {
    this.navigate('place', { place });
  }

  navigate(page, props) {
    utils.app.navigate(page, props);
  }

  render() {
    const { searchTerm, searchArea } = this.state;
    const { searchAreas, places } = this.props;

    // Convert searchAreas object to array
    // Sort by name (a to z)
    // Filter out the currently selected searchArea, if any
    const searchAreasArray = utils.arrays
      .sortArrayOfObjectsByKey(utils.objects.convertObjectToArray(searchAreas), 'name')
      .filter((item) => (searchArea ? item.name !== searchArea.name : item));

    let searchResults = [];

    // Convert places object to array
    // If a search area has been selected
    // Create a relative distance key based on coords
    // Filter on relativeDistance < searchArea.radius
    // Sort it by relativeDistance (low to high)
    if (searchArea) {
      searchResults = utils.arrays.sortArrayOfObjectsByKey(
        utils.objects
          .convertObjectToArray(places)
          .map((place) => {
            const newPlace = { ...place };
            newPlace.relativeDistance = utils.app.getDistanceBetweenCoordinates(
              place.location,
              searchArea.location,
            );

            return newPlace;
          })
          .filter((item) => item.relativeDistance <= searchArea.radius),
        'relativeDistance',
      );
    }

    // If there is a search term that is at least 2 characters long
    // Filter on searchTerm (lower cased)
    if (searchTerm && searchTerm.length > 1) {
      // If searchArea has not been selected
      // Set searchResults to places so that we can
      // filter on searchTerm
      if (!searchArea) {
        searchResults = utils.objects.convertObjectToArray(places);
      }

      searchResults = searchResults.filter((place) => {
        return place.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    }

    const selectedSearchAreaComponent = searchArea ? (
      <Animator
        type="translateY"
        initialValue={24}
        finalValue={0}
        shouldAnimateIn
        style={styles.selectedSearchAreaLabelContainer}
      >
        <Label text={searchArea.name} handlePress={this.onSelectedSearchAreaLabelPress} />
      </Animator>
    ) : null;

    const searchResultsComponent =
      searchTerm && searchResults ? (
        searchResults.length ? (
          <View style={styles.placeListContainer}>
            <PlaceList data={searchResults} handlePress={this.onPlacePress} />
          </View>
        ) : (
          <BlankState
            iconName="search"
            title="No results found"
            description="We couldn't find any results for your search. Try searching for something else."
          />
        )
      ) : (
        <BlankState
          iconName="search"
          title="Search over 525+ places in the Western Cape"
          description="If you're heading somewhere specific, try an area search by tapping on of the red buttons."
        />
      );

    return (
      <Page>
        <HeaderBar>
          <View style={styles.row}>
            <BackButton handlePress={this.onBack} />

            <SearchInput
              value={searchTerm}
              handleChangeText={this.onChangeText}
              autoFocus
              style={styles.searchInput}
            />

            {selectedSearchAreaComponent}
          </View>

          <View style={styles.labelListContainer}>
            <SearchAreaLabelList
              data={searchAreasArray}
              handlePress={this.onSearchAreaLabelPress}
            />
          </View>
        </HeaderBar>

        <InputContainer
          containerStyle={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {searchResultsComponent}
        </InputContainer>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchAreas: state.appData.searchAreas,
    places: state.appData.places,
  };
}

export default connect(mapStateToProps)(Search);
