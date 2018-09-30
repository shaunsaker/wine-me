import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styleConstants from '../../styleConstants';

import styles from './styles';

const propTypes = {};

const defaultProps = {};

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={styleConstants.colors.primary} />
    </View>
  );
};

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
