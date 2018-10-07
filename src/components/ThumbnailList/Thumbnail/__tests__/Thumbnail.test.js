import React from 'react';
import renderer from 'react-test-renderer';

import Thumbnail from '..';

describe('Thumbnail', () => {
  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<Thumbnail />);

      expect(component).toMatchSnapshot();
    });
  });
});
