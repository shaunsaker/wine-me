import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styleConstants from '../../styleConstants';

import styles from './styles';

import Touchable from '../Touchable';
import RemoteImage from '../RemoteImage';
import Label from '../Label';

const propTypes = {
  imageSource: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({ uri: PropTypes.string })]),
  title: PropTypes.string,
  label: PropTypes.string,
  handlePress: PropTypes.func,
};

const defaultProps = {};

/*
  This presentational component's responsibility is to render:

  - A touchable container
  - An image
  - A title and a label wrapped in a linear gradient for better text contrast
*/

const PlaceCard = ({ imageSource, title, label, handlePress }) => {
  const labelComponent = label ? <Label text={label} /> : null;

  return (
    <Touchable onPress={handlePress} style={styles.container}>
      <View style={styles.imageContainer}>
        <RemoteImage
          source={imageSource}
          borderRadius={styleConstants.dimensions.borderRadius}
          style={styles.image}
          iconStyle={styles.imageIcon}
          loaderColor={styleConstants.colors.primary}
        />
      </View>
      <LinearGradient
        colors={['transparent', styleConstants.colors.transBlack]}
        style={styles.textContainer}
      >
        <Text style={styles.titleText}>{title}</Text>

        {labelComponent}
      </LinearGradient>
    </Touchable>
  );
};

PlaceCard.propTypes = propTypes;
PlaceCard.defaultProps = defaultProps;

export default PlaceCard;
