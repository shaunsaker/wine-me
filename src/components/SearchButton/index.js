import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Touchable from '../Touchable';

import styles from './styles';

const propTypes = {
  handlePress: PropTypes.func,
};

const defaultProps = {};

const SearchButton = ({ handlePress }) => {
  return (
    <Touchable onPress={handlePress} style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon name="search" style={styles.icon} />

        <Text style={styles.text}>Search</Text>
      </View>
    </Touchable>
  );
};

SearchButton.propTypes = propTypes;
SearchButton.defaultProps = defaultProps;

export default SearchButton;
