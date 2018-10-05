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

const InfoButton = ({ handlePress, testID }) => {
  return (
    <Touchable onPress={handlePress} style={styles.container} testID={testID}>
      <Icon name="info-outline" style={styles.icon} />
    </Touchable>
  );
};

InfoButton.propTypes = propTypes;
InfoButton.defaultProps = defaultProps;

export default InfoButton;
