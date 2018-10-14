import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: styleConstants.colors.white,
    paddingVertical: styleConstants.dimensions.spacing.vertical,
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal,
    borderRadius: styleConstants.dimensions.borderRadius,
    ...styleConstants.shadows.small,
  },
  primaryContainer: {
    backgroundColor: styleConstants.colors.accent,
  },
  text: {
    ...styleConstants.fonts.types.heading,
  },
  primaryText: {
    color: styleConstants.colors.white,
  },
  disabledText: {
    color: styleConstants.colors.disabledText,
  },
});

export default styles;
