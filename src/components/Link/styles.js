import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {},
  text: {
    ...styleConstants.fonts.types.heading,
    color: styleConstants.colors.secondary,
  },
});

export default styles;
