import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import styles from './styles';

import Page from '../../../components/Page';
import HeaderBar from '../../../components/HeaderBar';
import Avatar from '../../../components/Avatar';
import SectionHeader from '../../../components/SectionHeader';
import BlankState from '../../../components/BlankState';
import PlaceList from '../../../components/PlaceList';
import TabBar from '../../../components/TabBar';

export class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {
    userCheckIns: PropTypes.shape({}),
    places: PropTypes.shape({}),
  };

  static defaultProps = {};

  render() {
    const { userCheckIns, places } = this.props;

    // Iterate over userCheckIns object
    // Return places that match check in place_ids
    const checkedInPlaces = Object.keys(userCheckIns).map((checkIn) => places[checkIn.place_id]);

    const placesComponent = checkedInPlaces.length ? (
      <View style={styles.contentContainer}>
        <SectionHeader text="My places" />

        <PlaceList data={checkedInPlaces} handlePress={this.onPlacePress} />
      </View>
    ) : (
      <BlankState
        iconName="place"
        title="Turn water into wine."
        description="Start visiting wine farms, mark them as visited and they'll show up here."
      />
    );

    return (
      <Page>
        <HeaderBar style={styles.headerBar}>
          <View style={styles.avatarContainer}>
            <Avatar />
          </View>

          <Text style={styles.nameText}>Shaun Saker</Text>
        </HeaderBar>

        {placesComponent}

        <TabBar />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    userCheckIns: state.appData.userCheckIns,
    places: state.appData.places,
  };
}

export default connect(mapStateToProps)(Profile);
