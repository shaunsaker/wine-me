import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';

import styles from './styles';

const propTypes = {};

const defaultProps = {};

const Logo = () => {
  // TODO

  return (
    <View style={styles.container}>
      <Image style={styles.image} />
    </View>
  );
};

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
