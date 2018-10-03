import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {},
  contentContainer: {},
  itemContainer: {
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal,
    paddingBottom: styleConstants.dimensions.spacing.vertical,
  },
});

export default styles;
