import React from 'react';
import renderer from 'react-test-renderer';

import InfoButton from '..';

describe('InfoButton', () => {
  const handlePress = jest.fn();

  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(<InfoButton handlePress={handlePress} />);

      expect(component).toMatchSnapshot();
    });
  });
});
