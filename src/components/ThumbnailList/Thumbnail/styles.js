import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const IMAGE_SIZE = 120;

const styles = StyleSheet.create({
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: styleConstants.dimensions.borderRadius,
    overflow: 'hidden',
  },
});

export default styles;
