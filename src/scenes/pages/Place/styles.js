import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const ICON_SIZE = 18; // from SectionHeader

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {},
  titleText: {
    ...styleConstants.fonts.types.heading,
    color: styleConstants.colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal,
    marginBottom: styleConstants.dimensions.spacing.vertical,
    marginLeft: ICON_SIZE + styleConstants.dimensions.spacing.horizontal / 2,
  },
  boldText: {
    ...styleConstants.fonts.types.small,
    ...styleConstants.fonts.families.medium,
  },
  text: {
    ...styleConstants.fonts.types.small,
  },
  linkText: {
    ...styleConstants.fonts.mediumFontHelper,
    color: styleConstants.colors.secondary,
    textDecorationLine: 'underline',
  },
  photosBlankStateText: {
    ...styleConstants.fonts.types.small,
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal,
    marginBottom: styleConstants.dimensions.spacing.vertical,
    marginLeft: ICON_SIZE + styleConstants.dimensions.spacing.horizontal / 2,
  },
});

export default styles;
