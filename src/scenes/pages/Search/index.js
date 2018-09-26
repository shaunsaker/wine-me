import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import utils from '../../../utils';
import styles from './styles';
import PLACES from '../../../mockData/PLACES';

import Page from '../../../components/Page';
import HeaderBar from '../../../components/HeaderBar';
import Touchable from '../../../components/Touchable';
import InputContainer from '../../../components/InputContainer';
import SearchInput from '../../../components/SearchInput';
import PlaceList from '../../../components/PlaceList';

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
          <Touchable onPress={this.onBack} style={styles.iconContainer}>
            <Icon name="chevron-left" style={styles.icon} />
          </Touchable>

          <SearchInput value={searchTerm} handleChangeText={this.onChangeText} />
        </HeaderBar>

        <InputContainer
          containerStyle={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <PlaceList data={PLACES} handlePress={this.onPlacePress} />
        </InputContainer>
      </Page>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Search);
