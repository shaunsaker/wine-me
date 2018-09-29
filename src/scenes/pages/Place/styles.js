import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    ...styleConstants.fonts.types.heading,
    color: styleConstants.colors.white,
  },
});

export default styles;
