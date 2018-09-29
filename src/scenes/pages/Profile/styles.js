import { StyleSheet } from 'react-native';

import styleConstants from '../../../styleConstants';

const styles = StyleSheet.create({
  avatarContainer: {
    marginBottom: styleConstants.dimensions.spacing.vertical,
  },
  nameText: {
    ...styleConstants.fonts.types.title,
    color: styleConstants.colors.white,
  },
  contentContainer: {
    flex: 1,
  },
});

export default styles;
