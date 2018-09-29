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
  activeTabContainer: {
    borderBottomWidth: 3,
    borderBottomColor: styleConstants.colors.secondary,
  },
  icon: {
    fontSize: styleConstants.fonts.sizes.icon,
  },
  text: {
    ...styleConstants.fonts.types.small,
  },
  activeText: {
    color: styleConstants.colors.secondary,
    ...styleConstants.fonts.mediumFontHelper,
  },
});

export default styles;
