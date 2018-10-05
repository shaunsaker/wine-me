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
  selectedSearchAreaLabelContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: styleConstants.dimensions.spacing.horizontal,
    justifyContent: 'center',
  },
  labelListContainer: {
    paddingTop: styleConstants.dimensions.spacing.vertical,
  },
  placeListContainer: {
    paddingTop: styleConstants.dimensions.spacing.vertical,
  },
});

export default styles;
