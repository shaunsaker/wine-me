import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const ICON_SIZE = 18; // from SectionHeader
const IMAGE_SIZE = 120;

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingLeft:
      styleConstants.dimensions.spacing.horizontal +
      ICON_SIZE +
      styleConstants.dimensions.spacing.horizontal / 2,
  },
  itemContainer: {
    paddingRight: styleConstants.dimensions.spacing.horizontal,
    paddingBottom: styleConstants.dimensions.spacing.vertical,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: styleConstants.dimensions.borderRadius,
    overflow: 'hidden',
  },
});

export default styles;
