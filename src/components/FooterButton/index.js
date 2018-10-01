import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styleConstants from '../../styleConstants';
import styles from './styles';

import Touchable from '../Touchable';

const propTypes = {
  handlePress: PropTypes.func,
  iconName: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  alternateStyle: PropTypes.bool,
  showLoader: PropTypes.bool,
};

const defaultProps = {};

const FooterButton = ({ handlePress, iconName, text, disabled, alternateStyle, showLoader }) => {
  const mainComponent = showLoader ? (
    <ActivityIndicator size="small" color={styleConstants.colors.white} />
  ) : (
    <View style={styles.contentContainer}>
      <Icon name={iconName} style={[styles.icon, alternateStyle && styles.alternateText]} />

      <Text style={[styles.text, alternateStyle && styles.alternateText]}>{text}</Text>
    </View>
  );

  return (
    <Touchable
      onPress={handlePress}
      style={[styles.container, alternateStyle && styles.alternateContainer]}
      disabled={disabled}
    >
      {mainComponent}
    </Touchable>
  );
};

FooterButton.propTypes = propTypes;
FooterButton.defaultProps = defaultProps;

export default FooterButton;
