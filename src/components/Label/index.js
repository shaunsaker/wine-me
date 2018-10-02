import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import styles from './styles';

import Touchable from '../Touchable';

const propTypes = {
  handlePress: PropTypes.func,
  text: PropTypes.string,
  testID: PropTypes.string,
};

const defaultProps = {};

const Label = ({ handlePress, text, testID }) => {
  return (
    <Touchable
      onPress={handlePress}
      disabled={!handlePress}
      style={styles.container}
      testID={testID}
    >
      <Text style={styles.text}>{text}</Text>
    </Touchable>
  );
};

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

export default Label;
