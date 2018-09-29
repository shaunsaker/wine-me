import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import utils from '../../../utils';
import styles from './styles';
import PLACES from '../../../mockData/PLACES';

import Page from '../../../components/Page';
import HeaderBar from '../../../components/HeaderBar';
import BackButton from '../../../components/BackButton';
import SectionHeader from '../../../components/SectionHeader';

export class Place extends React.Component {
  constructor(props) {
    super(props);

    this.onBack = this.onBack.bind(this);
    this.navigate = this.navigate.bind(this);

    this.state = {};
  }

  static propTypes = {
    place: PropTypes.shape({}), // from relevant page
  };

  static defaultProps = {};

  onBack() {
    this.navigate(); // pop the scene
  }

  navigate(page, props) {
    utils.app.navigate(page, props);
  }

  render() {
    return (
      <Page>
        <HeaderBar style={styles.headerBar}>
          <BackButton handlePress={this.onBack} />

          <Text style={styles.titleText}>Place title</Text>
        </HeaderBar>

        <SectionHeader text="Section heading" />
      </Page>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Place);
