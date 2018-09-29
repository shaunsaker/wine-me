import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import styles from './styles';
import PLACES from '../../../mockData/PLACES';

import Page from '../../../components/Page';
import HeaderBar from '../../../components/HeaderBar';
import BackButton from '../../../components/BackButton';
import SectionHeader from '../../../components/SectionHeader';

export class Place extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {
    place: PropTypes.shape({}), // from relevant page
  };

  static defaultProps = {};

  render() {
    return (
      <Page>
        <HeaderBar style={styles.headerBar}>
          <BackButton />

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
