import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
};

const defaultProps = {};

const SectionHeader = ({ iconName, text }) => {
  const iconComponent = iconName ? <Icon name={iconName} style={styles.icon} /> : null;

  return (
    <View style={styles.container}>
      {iconComponent}

      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

SectionHeader.propTypes = propTypes;
SectionHeader.defaultProps = defaultProps;

export default SectionHeader;
