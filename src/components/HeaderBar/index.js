import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';

import styles from './styles';

const propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

const defaultProps = {};

const HeaderBar = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

HeaderBar.propTypes = propTypes;
HeaderBar.defaultProps = defaultProps;

export default HeaderBar;
