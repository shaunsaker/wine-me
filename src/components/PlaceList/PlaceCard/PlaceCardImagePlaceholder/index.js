import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const propTypes = {};

const defaultProps = {};

const PlaceCardImagePlaceholder = () => {
  return (
    <View style={styles.container}>
      <Icon name="info" style={styles.icon} />
    </View>
  );
};

PlaceCardImagePlaceholder.propTypes = propTypes;
PlaceCardImagePlaceholder.defaultProps = defaultProps;

export default PlaceCardImagePlaceholder;
