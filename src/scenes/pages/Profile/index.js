import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import Page from '../../../components/Page';
import TabBar from '../../../components/TabBar';

export class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Page>
        <View style={{ flex: 1 }} />

        <TabBar />
      </Page>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Profile);
