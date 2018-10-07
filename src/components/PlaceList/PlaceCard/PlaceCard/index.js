import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styleConstants from '../../../../styleConstants';
import styles from './styles';

import Touchable from '../../../Touchable';
import RemoteImage from '../../../RemoteImage';
import PlaceCardImagePlaceholder from './PlaceCardImagePlaceholder';
import Label from '../../../Label';
import PlaceCardCheckedInIcon from './PlaceCardCheckedInIcon';

const propTypes = {
  imageSource: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({ uri: PropTypes.string })]),
  title: PropTypes.string,
  label: PropTypes.string,
  handlePress: PropTypes.func,
  hasCheckedIn: PropTypes.bool,
  testID: PropTypes.string,
};

const defaultProps = {};

/*
  This presentational component's responsibility is to render:

  - A touchable container
  - An image
  - A title and a label wrapped in a linear gradient for better text contrast
  - A check icon if the user has already checked in
*/

const PlaceCard = ({ imageSource, title, label, handlePress, hasCheckedIn, testID }) => {
  const imageComponent = imageSource ? (
    <RemoteImage source={imageSource} />
  ) : (
    <PlaceCardImagePlaceholder />
  );

  const labelComponent = label ? <Label text={label} /> : null;

  const checkedInComponent = hasCheckedIn ? (
    <View style={styles.checkedInIconContainer}>
      <PlaceCardCheckedInIcon />
    </View>
  ) : null;

  return (
    <Touchable onPress={handlePress} style={styles.container} testID={testID} noFeedback>
      {imageComponent}

      <LinearGradient
        colors={['transparent', styleConstants.colors.transBlack]}
        style={styles.textContainer}
      >
        <Text style={styles.titleText}>{title}</Text>

        {labelComponent}
      </LinearGradient>

      {checkedInComponent}
    </Touchable>
  );
};

PlaceCard.propTypes = propTypes;
PlaceCard.defaultProps = defaultProps;

export default PlaceCard;
