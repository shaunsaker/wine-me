import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, ViewPropTypes } from 'react-native';

const propTypes = {
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  disabled: PropTypes.bool,
  noFeedback: PropTypes.bool,
  children: PropTypes.node,
  style: ViewPropTypes.style,
  testID: PropTypes.string,
};

const defaultProps = {};

const Touchable = ({ onPress, onLongPress, disabled, noFeedback, children, style, testID }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={style}
      disabled={disabled}
      testID={testID}
      activeOpacity={noFeedback ? 1 : 0.67}
    >
      {children}
    </TouchableOpacity>
  );
};

Touchable.propTypes = propTypes;
Touchable.defaultProps = defaultProps;

export default Touchable;
