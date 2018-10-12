import React from 'react';
import renderer from 'react-test-renderer';

import InputContainer from '..';

describe('InputContainer', () => {
  describe('renders', () => {
    it('renders with minimum required props', () => {
      expect(renderer.create(<InputContainer />)).toMatchSnapshot();
    });
  });
});
