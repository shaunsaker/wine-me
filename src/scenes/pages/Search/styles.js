import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingTop: styleConstants.dimensions.spacing.vertical,
  },
  row: {
    flexDirection: 'row',
  },
  iconContainer: {
    paddingVertical: styleConstants.dimensions.spacing.vertical,
    paddingRight: styleConstants.dimensions.spacing.horizontal,
  },
  icon: {
    fontSize: 28,
    color: styleConstants.colors.white,
    marginHorizontal: -9, // fix icon alignment
  },
  searchInput: {
    flex: 1, // NB
  },
  labelListContainer: {
    paddingTop: styleConstants.dimensions.spacing.vertical,
  },
});

export default styles;
