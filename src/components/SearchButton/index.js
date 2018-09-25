import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Touchable from '../Touchable';

import styles from './styles';

const propTypes = {
  handlePress: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {};

/*
  This component's responsibility is to:

  - Render a button with text or children
*/
const SearchButton = ({ handlePress, children }) => {
  const textComponent = children || <Text style={styles.text}>Search</Text>;

  return (
    <Touchable onPress={handlePress} disabled={children && true} style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon name="search" style={styles.icon} />

        {textComponent}
      </View>
    </Touchable>
  );
};

SearchButton.propTypes = propTypes;
SearchButton.defaultProps = defaultProps;

export default SearchButton;
