import React from 'react';
import renderer from 'react-test-renderer';

import BackButton from '..';

describe('BackButton', () => {
  const handlePress = jest.fn();

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<BackButton />);

      expect(component).toMatchSnapshot();
    });

    it('renders with all props props', () => {
      const component = renderer.create(<BackButton handlePress={handlePress} />);

      expect(component).toMatchSnapshot();
    });
  });
});
