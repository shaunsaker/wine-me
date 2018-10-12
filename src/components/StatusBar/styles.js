import { StyleSheet } from 'react-native';

import styleConstants from '../../styleConstants';

const STATUS_BAR_HEIGHT = 22;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  statusBar: {
    height: styleConstants.helpers.isIphoneX ? STATUS_BAR_HEIGHT + 24 : STATUS_BAR_HEIGHT,
  },
});

export default styles;
