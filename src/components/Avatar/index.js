import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

import RemoteImage from '../RemoteImage';

const propTypes = {
  uri: PropTypes.string, // remote URI
};

const defaultProps = {};

const Avatar = ({ uri }) => {
  const imageComponent = uri ? (
    <RemoteImage source={{ uri }} style={styles.container} />
  ) : (
    <View style={styles.container}>
      <Icon name="person" style={styles.icon} />
    </View>
  );

  return imageComponent;
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
