import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import styles from './styles';

import Touchable from '../Touchable';

const propTypes = {
  handlePress: PropTypes.func,
  testID: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
};

const defaultProps = {};

const Link = ({ handlePress, testID, text, disabled }) => {
  return (
    <Touchable onPress={handlePress} style={styles.container} disabled={disabled} testID={testID}>
      <Text style={styles.text}>{text}</Text>
    </Touchable>
  );
};

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
