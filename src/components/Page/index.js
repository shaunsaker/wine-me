import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';

import styles from './styles';

const propTypes = {
  verticalCenter: PropTypes.bool,
  horizontalCenter: PropTypes.bool,
  children: PropTypes.node,
  style: ViewPropTypes.style,
  testID: PropTypes.string,
};

const defaultProps = {};

const Page = ({ verticalCenter, horizontalCenter, children, style, testID }) => {
  const verticalCenterStyles = verticalCenter && {
    justifyContent: 'center',
  };
  const horizontalCenterStyles = horizontalCenter && {
    alignItems: 'center',
  };

  return (
    <View
      style={[styles.container, verticalCenterStyles, horizontalCenterStyles, style]}
      testID={testID}
    >
      {children}
    </View>
  );
};

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
