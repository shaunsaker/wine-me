import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    marginVertical: styleConstants.dimensions.spacing.vertical,
    marginHorizontal: styleConstants.dimensions.spacing.horizontal,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: styleConstants.dimensions.spacing.horizontal / 2,
    fontSize: 18,
    color: styleConstants.colors.primaryText,
  },
  text: {
    ...styleConstants.fonts.types.heading,
  },
});

export default styles;
