import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: styleConstants.colors.darkPrimary,
    ...styleConstants.shadows.regular,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: styleConstants.dimensions.spacing.vertical / 2,
  },
  activeTabContainer: {
    borderBottomWidth: 2,
    borderBottomColor: styleConstants.colors.white,
  },
  icon: {
    fontSize: styleConstants.fonts.sizes.icon,
    color: styleConstants.colors.white,
  },
  text: {
    ...styleConstants.fonts.types.small,
    color: styleConstants.colors.transWhite,
    ...styleConstants.fonts.mediumFontHelper,
  },
  activeText: {
    color: styleConstants.colors.white,
  },
});

export default styles;
