import React from 'react';
import renderer from 'react-test-renderer';

import { Error } from '..';

describe('Error', () => {
  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<Error />);

      expect(component).toMatchSnapshot();
    });
  });
});
