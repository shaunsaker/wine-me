import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const styles = StyleSheet.create({
  container: {
    paddingVertical: styleConstants.dimensions.spacing.vertical,
    paddingHorizontal: styleConstants.dimensions.spacing.horizontal,
  },
  questionText: {
    ...styleConstants.fonts.types.title,
    textAlign: 'center',
    marginBottom: styleConstants.dimensions.spacing.vertical * 2,
  },
  starRatingContainer: {
    alignItems: 'center',
  },
  textInputContainer: {},
  buttonsContainer: {
    marginBottom: styleConstants.dimensions.spacing.vertical * -1, // remove last button margin
  },
  buttonContainer: {
    marginBottom: styleConstants.dimensions.spacing.vertical,
  },
});

export default styles;
