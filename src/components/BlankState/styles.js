import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  icon: {
    fontSize: 64,
    color: styleConstants.colors.secondary,
    marginBottom: styleConstants.dimensions.spacing.vertical,
  },
  titleText: {
    ...styleConstants.fonts.types.title,
    marginBottom: styleConstants.dimensions.spacing.vertical,
  },
  descriptionText: { ...styleConstants.fonts.types.paragraph },
});

export default styles;
