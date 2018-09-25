import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1, // fills the remaining space when parent has flexDirection: 'row'
    height: 44,
  },
  contentContainer: {
    backgroundColor: styleConstants.colors.transBlack,
    paddingVertical: styleConstants.dimensions.spacing.vertical,
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal,
    borderRadius: styleConstants.dimensions.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: styleConstants.fonts.sizes.icon,
    color: styleConstants.colors.white,
    marginRight: styleConstants.dimensions.spacing.horizontal / 2,
  },
  text: {
    ...styleConstants.fonts.types.paragraph,
    color: styleConstants.colors.white,
  },
});

export default styles;
