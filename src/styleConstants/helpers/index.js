import { Platform } from 'react-native';

import dimensions from '../dimensions';

const helpers = {};

helpers.isIphoneX = Platform.OS === 'ios' && dimensions.window.height === 812;

export default helpers;
