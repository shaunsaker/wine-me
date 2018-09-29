import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

import Touchable from '../Touchable';

const propTypes = {
  handlePress: PropTypes.func,
};

const defaultProps = {};

const BackButton = ({ handlePress }) => {
  return (
    <Touchable onPress={handlePress} style={styles.container}>
      <Icon name="chevron-left" style={styles.icon} />
    </Touchable>
  );
};

BackButton.propTypes = propTypes;
BackButton.defaultProps = defaultProps;

export default BackButton;
