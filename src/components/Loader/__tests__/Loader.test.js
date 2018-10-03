import React from 'react';
import renderer from 'react-test-renderer';

import Loader from '..';

describe('Loader', () => {
  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(<Loader />);

      expect(component).toMatchSnapshot();
    });
  });
});
