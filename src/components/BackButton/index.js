import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

import Touchable from '../Touchable';

const propTypes = {
  handlePress: PropTypes.func,
  testID: PropTypes.string,
};

const defaultProps = {};

const BackButton = ({ handlePress, testID }) => {
  return (
    <Touchable onPress={handlePress} style={styles.container} testID={testID}>
      <Icon name="chevron-left" style={styles.icon} />
    </Touchable>
  );
};

BackButton.propTypes = propTypes;
BackButton.defaultProps = defaultProps;

export default BackButton;
