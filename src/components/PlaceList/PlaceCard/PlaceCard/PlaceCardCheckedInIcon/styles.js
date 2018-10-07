import { StyleSheet } from 'react-native';

import styleConstants from '../../../../../styleConstants';

const SIZE = 30;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: styleConstants.colors.white,
    ...styleConstants.shadows.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: styleConstants.fonts.sizes.icon,
    color: styleConstants.colors.success,
  },
});

export default styles;
