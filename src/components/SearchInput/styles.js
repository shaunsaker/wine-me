import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: styleConstants.colors.transBlack,
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal,
    borderRadius: styleConstants.dimensions.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
  },
  icon: {
    fontSize: styleConstants.fonts.sizes.icon,
    color: styleConstants.colors.white,
    marginRight: styleConstants.dimensions.spacing.horizontal / 2,
  },
  input: {
    flex: 1,
  },
  text: {
    ...styleConstants.fonts.types.paragraph,
    color: styleConstants.colors.white,
  },
});

export default styles;
