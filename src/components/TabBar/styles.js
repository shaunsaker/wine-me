import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: styleConstants.colors.white,
    ...styleConstants.shadows.regular,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: styleConstants.dimensions.spacing.vertical / 2,
  },
  activeTabContainer: {},
  icon: {
    fontSize: styleConstants.fonts.sizes.icon,
  },
  text: {
    ...styleConstants.fonts.types.small,
    ...styleConstants.fonts.mediumFontHelper,
  },
  activeText: {
    color: styleConstants.colors.primary,
  },
});

export default styles;
