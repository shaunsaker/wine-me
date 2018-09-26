import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextInput, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import utils from '../../../utils';
import styles from './styles';

import Page from '../../../components/Page';
import HeaderBar from '../../../components/HeaderBar';
import Touchable from '../../../components/Touchable';
import SearchInput from '../../../components/SearchInput';

export class Search extends React.Component {
  constructor(props) {
    super(props);

    this.onBack = this.onBack.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.dismissKeyboard = this.dismissKeyboard.bind(this);
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

  navigate(page, props) {
    utils.app.navigate();
  }

  render() {
    const { searchTerm } = this.state;
    // TODO: Custom TextInput with all the bells and whistles

    return (
      <Page>
        <HeaderBar>
          <Touchable onPress={this.onBack} style={styles.iconContainer}>
            <Icon name="chevron-left" style={styles.icon} />
          </Touchable>

          <SearchInput value={searchTerm} handleChangeText={this.onChangeText} />
        </HeaderBar>
      </Page>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Search);
