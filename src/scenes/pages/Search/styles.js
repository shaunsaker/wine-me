import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1, // NB
  },
  labelListContainer: {
    paddingTop: styleConstants.dimensions.spacing.vertical,
  },
});

export default styles;
