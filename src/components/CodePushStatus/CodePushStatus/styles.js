import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const ICON_SIZE = 20;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    ...styleConstants.fonts.types.small,
    marginRight: ICON_SIZE + styleConstants.dimensions.spacing.horizontal / 2, // equal icon margin
  },
  loader: {
    marginRight: styleConstants.dimensions.spacing.horizontal / 2,
  },
  icon: {
    fontSize: ICON_SIZE,
    color: styleConstants.colors.success,
    marginRight: styleConstants.dimensions.spacing.horizontal / 2,
  },
  warningIcon: {
    fontSize: ICON_SIZE,
    color: styleConstants.colors.danger,
    marginRight: styleConstants.dimensions.spacing.horizontal / 2,
  },
});

export default styles;
