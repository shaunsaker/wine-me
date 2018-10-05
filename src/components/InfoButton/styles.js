import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    // Add hit space
    paddingVertical: styleConstants.dimensions.spacing.vertical,
    paddingLeft: styleConstants.dimensions.spacing.horizontal,
  },
  icon: {
    fontSize: styleConstants.fonts.sizes.icon,
    color: styleConstants.colors.white,
  },
});

export default styles;
