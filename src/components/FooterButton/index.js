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
  disabled: PropTypes.bool,
  alternateStyle: PropTypes.bool,
};

const defaultProps = {};

const FooterButton = ({ handlePress, iconName, text, disabled, alternateStyle }) => {
  return (
    <Touchable
      onPress={handlePress}
      style={[styles.container, alternateStyle && styles.alternateContainer]}
      disabled={disabled}
    >
      <Icon name={iconName} style={[styles.icon, alternateStyle && styles.alternateText]} />

      <Text style={[styles.text, alternateStyle && styles.alternateText]}>{text}</Text>
    </Touchable>
  );
};

FooterButton.propTypes = propTypes;
FooterButton.defaultProps = defaultProps;

export default FooterButton;
