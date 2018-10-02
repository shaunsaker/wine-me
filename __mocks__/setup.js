// Mock useNativeDriver
jest.mock('NativeAnimatedHelper');

jest.mock('react-native-router-flux', () => {
  return {
    Actions: {
      pop: jest.fn(),
      replace: jest.fn(),
      reset: jest.fn(),
      refresh: jest.fn(),

      // Custom
      place: jest.fn(),
    },
    ActionConst: {
      FOCUS: 'FOCUS',
    },
  };
});
