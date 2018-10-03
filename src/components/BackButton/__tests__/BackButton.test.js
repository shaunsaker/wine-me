import React from 'react';
import renderer from 'react-test-renderer';

import BackButton from '..';

describe('BackButton', () => {
  const handlePress = jest.fn();

  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(<BackButton handlePress={handlePress} />);

      expect(component).toMatchSnapshot();
    });
  });
});
