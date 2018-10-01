import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styleConstants from '../../styleConstants';
import styles from './styles';

const propTypes = {};

const defaultProps = {};

const PageLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={styleConstants.colors.white} />
    </View>
  );
};

PageLoader.propTypes = propTypes;
PageLoader.defaultProps = defaultProps;

export default PageLoader;
