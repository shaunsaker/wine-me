import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const SIZE = 75;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE,
    backgroundColor: styleConstants.colors.white,
    ...styleConstants.shadows.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: SIZE / 2,
    color: styleConstants.colors.secondary,
  },
});

export default styles;
