import React from 'react';
import renderer from 'react-test-renderer';

import StatusBar from '..';

describe('StatusBar', () => {
  describe('renders', () => {
    it('renders with minimum required props', () => {
      expect(renderer.create(<StatusBar />)).toMatchSnapshot();
    });
  });
});
