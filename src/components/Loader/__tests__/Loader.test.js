import React from 'react';
import renderer from 'react-test-renderer';

import Loader from '..';

describe('Loader', () => {
  const handlePress = jest.fn();

  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(<Loader handlePress={handlePress} />);

      expect(component).toMatchSnapshot();
    });
  });
});
