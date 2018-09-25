import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const styles = StyleSheet.create({
  iconContainer: {
    paddingVertical: styleConstants.dimensions.spacing.vertical,
    paddingRight: styleConstants.dimensions.spacing.horizontal,
  },
  icon: {
    fontSize: 28,
    color: styleConstants.colors.white,
  },
  input: {
    flex: 1, // fill the remaining space
    ...styleConstants.fonts.types.paragraph,
    color: styleConstants.colors.white,
  },
});

export default styles;
