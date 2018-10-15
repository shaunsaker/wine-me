import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const styles = StyleSheet.create({
  container: {},
  submitButtonContainer: {
    marginVertical: styleConstants.dimensions.spacing.vertical,
    marginHorizontal: styleConstants.dimensions.spacing.horizontal,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: styleConstants.dimensions.spacing.vertical,
    marginHorizontal: styleConstants.dimensions.spacing.horizontal,
  },
  countText: {
    ...styleConstants.fonts.types.paragraph,
  },
});

export default styles;
