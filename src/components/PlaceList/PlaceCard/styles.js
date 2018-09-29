import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: styleConstants.colors.white,
    ...styleConstants.shadows.small,
  },
  imageContainer: {},
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'flex-start',
    paddingVertical: styleConstants.dimensions.spacing.vertical,
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal,
    paddingTop: 30, // for linear gradient
    borderBottomLeftRadius: styleConstants.dimensions.borderRadius,
    borderBottomRightRadius: styleConstants.dimensions.borderRadius,
  },
  titleText: {
    ...styleConstants.fonts.types.heading,
    color: styleConstants.colors.white,
    marginBottom: 10,
  },
});

export default styles;
