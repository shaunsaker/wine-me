import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

import Touchable from '../Touchable';

const propTypes = {
  handlePress: PropTypes.func,
  iconName: PropTypes.string,
  text: PropTypes.string,
};

const defaultProps = {};

const FooterButton = ({ handlePress, iconName, text }) => {
  return (
    <Touchable onPress={handlePress} style={styles.container}>
      <Icon name={iconName} style={styles.icon} />

      <Text style={styles.text}>{text}</Text>
    </Touchable>
  );
};

FooterButton.propTypes = propTypes;
FooterButton.defaultProps = defaultProps;

export default FooterButton;
