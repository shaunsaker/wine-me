import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

import styleConstants from '../../styleConstants';
import styles from './styles';

/*
  NOTE: This needs to be a functional component so that we can pass a ref prop
*/
export default class TextInputComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    hasError: PropTypes.bool,
    hasSuccess: PropTypes.bool,
    keyboardType: PropTypes.string,
    handleSubmit: PropTypes.func,
    returnKeyType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    testID: PropTypes.string,
    inputRef: PropTypes.func,
    multiline: PropTypes.bool,
    style: TextInput.propTypes.style,
  };

  static defaultProps = {};

  render() {
    const {
      placeholder,
      value,
      handleChange,
      hasError,
      hasSuccess,
      keyboardType,
      handleSubmit,
      returnKeyType,
      secureTextEntry,
      testID,
      inputRef,
      multiline,
      style,
    } = this.props;

    return (
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={styleConstants.colors.secondaryText}
        value={value}
        onChangeText={handleChange}
        style={[styles.input, hasError && styles.error, hasSuccess && styles.success, style]}
        keyboardType={keyboardType}
        onSubmitEditing={handleSubmit}
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        testID={testID}
        ref={inputRef}
        multiline={multiline}
        underlineColorAndroid="transparent"
      />
    );
  }
}
