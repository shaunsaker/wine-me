import React from 'react';
import renderer from 'react-test-renderer';

import Link from '..';

describe('Link', () => {
  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<Link />);

      expect(component).toMatchSnapshot();
    });
  });
});
