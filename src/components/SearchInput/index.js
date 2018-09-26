import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../../styleConstants';
import styles from './styles';

import Touchable from '../Touchable';

const propTypes = {
  handlePress: PropTypes.func, // if supplied will render Search text instead of an input
  value: PropTypes.string,
  handleChangeText: PropTypes.func,
};

const defaultProps = {};

const SearchInput = ({ handlePress, value, handleChangeText }) => {
  const textComponent = handlePress ? (
    <Text style={styles.text}>Search</Text>
  ) : (
    <TextInput
      placeholder="Search"
      placeholderTextColor={styleConstants.colors.white}
      value={value}
      onChangeText={handleChangeText}
      style={[styles.input, styles.text]}
    />
  );

  return (
    <Touchable onPress={handlePress} disabled={!handlePress} style={styles.container}>
      <Icon name="search" style={styles.icon} />

      {textComponent}
    </Touchable>
  );
};

SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;

export default SearchInput;
