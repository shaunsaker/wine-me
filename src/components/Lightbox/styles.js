import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: styleConstants.colors.transBlack,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: styleConstants.dimensions.spacing.horizontal * 2,
  },
  card: {
    alignSelf: 'stretch',
    maxWidth: 680,
    backgroundColor: styleConstants.colors.dividerColor,
    borderRadius: styleConstants.dimensions.borderRadius,
    overflow: 'hidden',
  },
  headerContainer: {
    paddingVertical: styleConstants.dimensions.spacing.vertical,
    backgroundColor: styleConstants.colors.white,
    ...styleConstants.shadows.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    ...styleConstants.fonts.types.heading,
  },
  iconContainer: {
    position: 'absolute',
    padding: styleConstants.dimensions.spacing.horizontal / 2,
    right: 0,
  },
  icon: {
    fontSize: styleConstants.fonts.sizes.icon,
    color: styleConstants.colors.primaryText,
  },
});

export default styles;
