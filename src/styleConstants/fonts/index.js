import { Platform } from 'react-native';

import colors from '../colors';

const fonts = {};

// Font families
fonts.families = {};

// Font sizes
fonts.sizes = {
  large: 24,
  regular: 17,
  small: 15,
  verySmall: 11,
  icon: 24,
};

// Medium font helper
fonts.mediumFontHelper = {
  fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : fonts.families.primary,
  fontWeight: Platform.OS === 'ios' ? '700' : null,
};

// Font types
fonts.types = {
  title: {
    ...fonts.mediumFontHelper,
    fontSize: fonts.sizes.large,
    color: colors.primaryText,
  },
  heading: {
    ...fonts.mediumFontHelper,
    fontSize: fonts.sizes.regular,
    color: colors.primaryText,
  },
  paragraph: {
    fontSize: fonts.sizes.regular,
    color: colors.primaryText,
  },
  small: {
    fontSize: fonts.sizes.small,
    color: colors.primaryText,
  },
};

export default fonts;
