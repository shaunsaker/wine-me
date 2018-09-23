import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import PLACE from '../../../mockData/PLACE';

import Page from '../../../components/Page';
import HeaderBar from '../../../components/HeaderBar';
import PlaceCard from '../../../components/PlaceCard';
import TabBar from '../../../components/TabBar';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Page>
        <HeaderBar />

        <View style={{ flex: 1, marginTop: 200 }}>
          <PlaceCard place={PLACE} />
        </View>

        <TabBar />
      </Page>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Home);
