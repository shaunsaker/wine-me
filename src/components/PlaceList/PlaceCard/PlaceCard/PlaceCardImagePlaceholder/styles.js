import { StyleSheet } from 'react-native';

import styleConstants from '../../../../../styleConstants';

const styles = StyleSheet.create({
  container: {
    // from RemoteImage
    flex: 1,
    height: 200,
    backgroundColor: styleConstants.colors.primary,
    borderRadius: styleConstants.dimensions.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 36,
    color: styleConstants.colors.white,
  },
});

export default styles;
