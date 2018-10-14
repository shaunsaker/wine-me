import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

// @WADE: error and success styles are commented out. If input validation is not needed, let me know because it will be better to remove the logic for that as opposed to just removing the styles

const styles = StyleSheet.create({
  input: {
    backgroundColor: styleConstants.colors.white,
    fontSize: styleConstants.fonts.sizes.regular,
    color: styleConstants.colors.primary,
    marginBottom: 5, // @WADE: rather let the parents control this components layout and give the parent the marginBottom
    textAlign: 'center',
    borderWidth: 1,
    borderColor: styleConstants.colors.dividerColor,
    borderRadius: 5,
    padding: 15,
    textAlignVertical: 'center',
  },
  error: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    color: styleConstants.colors.danger,
    borderColor: 'rgba(255, 0, 0, 0.5)',
  },
  success: {
    // color: styleConstants.colors.success,
    // backgroundColor: styleConstants.colors.success,
  },
});

export default styles;
