import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  ViewPropTypes,
} from 'react-native';

import styleConstants from '../../styleConstants';

const propTypes = {
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  style: ViewPropTypes.style,
  testID: PropTypes.string,
};

const defaultProps = {};

const Touchable = ({ onPress, onLongPress, disabled, children, style, testID }) => {
  let touchableComponent;

  if (Platform.OS === 'android') {
    const androidRippleColor = styleConstants.colors.white;

    touchableComponent = (
      <TouchableNativeFeedback
        onPress={onPress}
        onLongPress={onLongPress}
        background={TouchableNativeFeedback.Ripple(androidRippleColor)}
        disabled={disabled}
        testID={testID}
      >
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  } else {
    touchableComponent = (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        style={style}
        disabled={disabled}
        testID={testID}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return touchableComponent;
};

Touchable.propTypes = propTypes;
Touchable.defaultProps = defaultProps;

export default Touchable;
