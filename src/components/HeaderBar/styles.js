import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingTop: styleConstants.helpers.isIphoneX ? 24 : styleConstants.dimensions.spacing.vertical,
    paddingBottom: styleConstants.dimensions.spacing.vertical,
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal,
    backgroundColor: styleConstants.colors.primary,
  },
});

export default styles;
