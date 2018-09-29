import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import styles from './styles';
import PLACES from '../../../mockData/PLACES';

import Page from '../../../components/Page';
import SectionHeader from '../../../components/SectionHeader';
import BlankState from '../../../components/BlankState';
import PlaceList from '../../../components/PlaceList';
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
        <SectionHeader text="My places" />

        <View style={styles.container}>
          <BlankState iconName="place" title="Some clever title" description="Dum dum dum" />
        </View>

        <TabBar />
      </Page>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Profile);
