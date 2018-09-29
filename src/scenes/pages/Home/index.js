import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import utils from '../../../utils';
import styles from './styles';
import PLACES from '../../../mockData/PLACES';

import Page from '../../../components/Page';
import HeaderBar from '../../../components/HeaderBar';
import SearchInput from '../../../components/SearchInput';
import SectionHeader from '../../../components/SectionHeader';
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

  static propTypes = {};

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
    return (
      <Page>
        <HeaderBar>
          <SearchInput handlePress={this.onSearchButtonPress} />
        </HeaderBar>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <SectionHeader text="Featured" />

          <PlaceList data={PLACES} handlePress={this.onPlacePress} />

          <SectionHeader text="Closest to me" />

          <PlaceList data={PLACES} handlePress={this.onPlacePress} />
        </ScrollView>

        <TabBar />
      </Page>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Home);
