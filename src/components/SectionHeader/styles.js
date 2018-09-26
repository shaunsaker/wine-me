import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: {
    marginVertical: styleConstants.dimensions.spacing.vertical,
    marginHorizontal: styleConstants.dimensions.spacing.horizontal,
  },
  text: {
    ...styleConstants.fonts.types.heading,
  },
});

export default styles;
