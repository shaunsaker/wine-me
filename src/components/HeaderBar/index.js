import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { StatusBar } from 'react-native-simple-components';

import styleConstants from '../../styleConstants';

import styles from './styles';

import Logo from '../Logo';

const propTypes = {};

const defaultProps = {};

const HeaderBar = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={styleConstants.colors.darkPrimary} barStyle="light-content" />

      <Logo />
    </View>
  );
};

HeaderBar.propTypes = propTypes;
HeaderBar.defaultProps = defaultProps;

export default HeaderBar;
