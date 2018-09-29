import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    paddingVertical: styleConstants.dimensions.spacing.vertical,
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal,
    backgroundColor: styleConstants.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    ...styleConstants.shadows.small,
  },
  icon: {
    fontSize: styleConstants.fonts.sizes.icon,
    color: styleConstants.colors.white,
    marginRight: styleConstants.dimensions.spacing.horizontal / 2,
  },
  text: {
    ...styleConstants.fonts.types.heading,
    color: styleConstants.colors.white,
    flex: 1,
    textAlign: 'center',
    marginRight: styleConstants.fonts.sizes.icon + styleConstants.dimensions.spacing.horizontal / 2, // align to center
  },
});

export default styles;
