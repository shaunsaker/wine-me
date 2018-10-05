import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const styles = StyleSheet.create({
  container: {
    paddingVertical: styleConstants.dimensions.spacing.vertical * 2,
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal,
  },
  codePushStatusContainer: {
    marginTop: styleConstants.dimensions.spacing.vertical,
  },
});

export default styles;
