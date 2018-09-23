import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PLACE from '../../../mockData/place';

import Page from '../../../components/Page';
import PlaceCard from '../../../components/PlaceCard';

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
        <PlaceCard place={PLACE} />
      </Page>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Home);
