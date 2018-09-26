import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import utils from '../../../utils';

import Page from '../../../components/Page';
import HeaderBar from '../../../components/HeaderBar';
import SearchInput from '../../../components/SearchInput';
import TabBar from '../../../components/TabBar';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.onSearchButtonPress = this.onSearchButtonPress.bind(this);
    this.onSearchButtonPress = this.onSearchButtonPress.bind(this);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  onSearchButtonPress() {
    this.navigate('search');
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

        <View style={{ flex: 1 }} />

        <TabBar />
      </Page>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Home);
