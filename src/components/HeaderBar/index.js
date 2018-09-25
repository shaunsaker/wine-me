import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from './styles';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const HeaderBar = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

HeaderBar.propTypes = propTypes;
HeaderBar.defaultProps = defaultProps;

export default HeaderBar;
