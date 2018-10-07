import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const ICON_SIZE = 18; // from SectionHeader

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
});

export default styles;
