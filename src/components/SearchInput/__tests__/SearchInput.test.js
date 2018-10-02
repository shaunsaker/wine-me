import React from 'react';
import renderer from 'react-test-renderer';

import SearchInput from '..';

describe('SearchInput', () => {
  const handlePress = jest.fn();

  describe('renders', () => {
    it('renders with the minimum required props', () => {
      const component = renderer.create(<SearchInput />);

      expect(component).toMatchSnapshot();
    });

    it('renders the handlePress state', () => {
      const component = renderer.create(<SearchInput handlePress={handlePress} />);

      expect(component).toMatchSnapshot();
    });
  });
});
