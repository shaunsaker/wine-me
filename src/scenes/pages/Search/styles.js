import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const styles = StyleSheet.create({
  container: {},
  contentContainer: {},
  iconContainer: {
    paddingVertical: styleConstants.dimensions.spacing.vertical,
    paddingRight: styleConstants.dimensions.spacing.horizontal,
  },
  icon: {
    fontSize: 28,
    color: styleConstants.colors.white,
    marginHorizontal: -9, // fix icon alignment
  },
});

export default styles;
