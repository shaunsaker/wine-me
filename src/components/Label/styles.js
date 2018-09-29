import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: styleConstants.colors.secondary,
    paddingVertical: styleConstants.dimensions.spacing.vertical / 2,
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal / 2,
    ...styleConstants.shadows.small,
    borderRadius: styleConstants.dimensions.borderRadius,
  },
  text: {
    ...styleConstants.fonts.types.extraSmall,
    color: styleConstants.colors.white,
  },
});

export default styles;
