import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const propTypes = {
  iconName: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

const defaultProps = {};

const BlankState = ({ iconName, title, description }) => {
  return (
    <View style={styles.container}>
      <Icon name={iconName} style={styles.icon} />

      <Text style={styles.titleText}>{title}</Text>

      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

BlankState.propTypes = propTypes;
BlankState.defaultProps = defaultProps;

export default BlankState;
