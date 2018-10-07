import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const propTypes = {};

const defaultProps = {};

const PlaceCardCheckedInIcon = () => {
  return (
    <View style={styles.container}>
      <Icon name="check" style={styles.icon} />
    </View>
  );
};

PlaceCardCheckedInIcon.propTypes = propTypes;
PlaceCardCheckedInIcon.defaultProps = defaultProps;

export default PlaceCardCheckedInIcon;
