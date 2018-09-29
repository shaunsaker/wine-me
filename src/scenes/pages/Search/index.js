import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Keyboard, View } from 'react-native';

import utils from '../../../utils';
import styles from './styles';
import PLACES from '../../../mockData/PLACES';

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

  static propTypes = {};

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
    this.navigate('place', place);
  }

  navigate(page, props) {
    utils.app.navigate();
  }

  render() {
    const { searchTerm } = this.state;

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
            <LabelList
              handlePress={this.onLocationLabelPress}
              data={[{ text: 'Bot River', id: 'abc' }, { text: 'Franshoek', id: 'cde' }]}
            />
          </View>
        </HeaderBar>

        <InputContainer
          containerStyle={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <BlankState iconName="search" title="Some clever title" description="Search places by" />
        </InputContainer>
      </Page>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Search);
