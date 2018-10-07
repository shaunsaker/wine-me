import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import styles from './styles';

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

  static propTypes = {
    userCheckIns: PropTypes.shape({}).isRequired,
    places: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {};

  render() {
    const { userCheckIns, places } = this.props;

    // Iterate over userCheckIns object
    // Return places that match check in place_ids
    const checkedInPlaces = Object.keys(userCheckIns).map((key) => {
      const checkIn = userCheckIns[key];
      const placeID = checkIn.place_id;
      const place = places[placeID];

      return place;
    });

    const placesComponent = checkedInPlaces.length ? (
      <View style={styles.contentContainer}>
        <SectionHeader text="My places" />

        <PlaceList data={checkedInPlaces} />
      </View>
    ) : (
      <BlankState
        iconName="place"
        title="Turn water into wine."
        description="Start visiting wine farms, 'Check in' and they'll show up here."
      />
    );

    return (
      <Page>
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
