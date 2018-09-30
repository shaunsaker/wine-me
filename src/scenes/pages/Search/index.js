import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Keyboard, View } from 'react-native';

import utils from '../../../utils';
import styles from './styles';

import Page from '../../../components/Page';
import HeaderBar from '../../../components/HeaderBar';
import BackButton from '../../../components/BackButton';
import InputContainer from '../../../components/InputContainer';
import SearchInput from '../../../components/SearchInput';
import LabelList from '../../../components/LabelList';
import PlaceList from '../../../components/PlaceList';
import BlankState from '../../../components/BlankState';

export class Search extends React.Component {
  constructor(props) {
    super(props);

    this.onBack = this.onBack.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.dismissKeyboard = this.dismissKeyboard.bind(this);
    this.onPlacePress = this.onPlacePress.bind(this);
    this.navigate = this.navigate.bind(this);

    this.state = {
      searchTerm: null,
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

  setSearchTerm(searchTerm) {
    this.setState({ searchTerm });
  }

  onSubmit() {
    this.dismissKeyboard();
  }

  dismissKeyboard() {
    Keyboard.dismiss();
  }

  onPlacePress(place) {
    this.navigate('place', { place });
  }

  navigate(page, props) {
    utils.app.navigate(page, props);
  }

  render() {
    const { searchTerm } = this.state;
    const { searchAreas, places } = this.props;

    // Convert searchAreas object to array
    // Return names as text field
    // Sort by name (a to z)
    const searchAreasArray = utils.arrays.sortArrayOfObjectsByKey(
      utils.objects.convertObjectToArray(searchAreas).map((searchArea) => {
        return {
          text: searchArea.name,
          id: searchArea.id,
        };
      }),
      'text',
    );

    // If there is a search term that is at least 2 characters long
    // Convert places object to array
    // Filter on searchTerm (lower cased)
    const searchResults =
      searchTerm &&
      searchTerm.length > 1 &&
      utils.objects.convertObjectToArray(places).filter((place) => {
        return place.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });

    const searchResultsComponent = searchResults ? (
      <View style={styles.placeListContainer}>
        <PlaceList data={searchResults} handlePress={this.onPlacePress} />
      </View>
    ) : (
      <BlankState
        iconName="search"
        title="Search over 525+ places in the Western Cape"
        description="If you're heading somewhere specific, try an area search by tapping on of the red buttons."
      />
    );

    // TODO: Handle search area

    return (
      <Page>
        <HeaderBar>
          <View style={styles.row}>
            <BackButton handlePress={this.onBack} />

            <SearchInput
              value={searchTerm}
              handleChangeText={this.onChangeText}
              style={styles.searchInput}
            />
          </View>

          <View style={styles.labelListContainer}>
            <LabelList handlePress={this.onLocationLabelPress} data={searchAreasArray} />
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
