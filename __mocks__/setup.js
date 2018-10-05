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
      home: jest.fn(),
      _home: jest.fn(),
      place: jest.fn(),
      search: jest.fn(),
      infoModal: jest.fn(),
    },
    ActionConst: {
      FOCUS: 'FOCUS',
    },
  };
});

jest.mock('react-native-code-push', () => {
  return {
    InstallMode: {
      ON_NEXT_RESUME: jest.fn(),
    },
    sync: jest.fn(),
  };
});
