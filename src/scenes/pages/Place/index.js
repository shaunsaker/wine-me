import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Linking, ScrollView } from 'react-native';

import utils from '../../../utils';
import styles from './styles';
import PLACES from '../../../mockData/PLACES';

import Page from '../../../components/Page';
import HeaderBar from '../../../components/HeaderBar';
import BackButton from '../../../components/BackButton';
import Touchable from '../../../components/Touchable';
import SectionHeader from '../../../components/SectionHeader';

export class Place extends React.Component {
  constructor(props) {
    super(props);

    this.onBack = this.onBack.bind(this);
    this.onOpenInMaps = this.onOpenInMaps.bind(this);
    this.onCall = this.onCall.bind(this);
    this.onOpenWebsite = this.onOpenWebsite.bind(this);
    this.setSystemMessage = this.setSystemMessage.bind(this);
    this.navigate = this.navigate.bind(this);

    this.state = {};
  }

  static propTypes = {
    place: PropTypes.shape({}).isRequired, // from relevant page
    dispatch: PropTypes.func,
  };

  static defaultProps = {};

  onBack() {
    this.navigate(); // pop the scene
  }

  onOpenInMaps() {
    const { place } = this.props;
    const { location } = place;
    const link = utils.app.createMapsLinkFromCoordinates(location);

    this.link(link);
  }

  onCall() {
    const { place } = this.props;
    const { phoneNumber } = place;
    const link = `tel:${phoneNumber}`;

    this.link(link);
  }

  onOpenWebsite() {
    const { place } = this.props;
    const { website } = place;
    const link = website;

    this.link(link);
  }

  link(url) {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          this.setSystemMessage();
        } else {
          return Linking.openURL(url);
        }

        return null;
      })
      .catch((error) => this.setSystemMessage(error.message));
  }

  setSystemMessage(message) {
    const { dispatch } = this.props;

    dispatch({
      type: 'SET_SYSTEM_MESSAGE',
      payload: {
        message,
      },
    });
  }

  navigate(page, props) {
    utils.app.navigate(page, props);
  }

  render() {
    const { place } = this.props;

    const openingHoursComponent = place.openingHours ? (
      <View style={styles.section}>
        <SectionHeader iconName="access-time" text="Opening hours" />

        {place.openingHours.map((item) => {
          return (
            <Text key={item} style={styles.text}>
              {item}
            </Text>
          );
        })}
      </View>
    ) : null;

    return (
      <Page>
        <HeaderBar style={styles.headerBar}>
          <BackButton handlePress={this.onBack} />

          <Text style={styles.titleText}>{place.name}</Text>
        </HeaderBar>

        <ScrollView>
          <Touchable onPress={this.onOpenInMaps} style={styles.section}>
            <SectionHeader iconName="location-on" text="Address" />

            <Text style={[styles.text, styles.linkText]}>{place.address}</Text>
          </Touchable>

          <Touchable onPress={this.onCall} style={styles.section}>
            <SectionHeader iconName="phone" text="Contact number" />

            <Text style={[styles.text, styles.linkText]}>{place.phoneNumber}</Text>
          </Touchable>

          <Touchable onPress={this.onOpenWebsite} style={styles.section}>
            <SectionHeader iconName="web" text="Website" />

            <Text style={[styles.text, styles.linkText]}>{place.website}</Text>
          </Touchable>

          {openingHoursComponent}
        </ScrollView>
      </Page>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Place);
