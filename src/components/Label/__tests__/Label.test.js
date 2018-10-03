import React from 'react';
import renderer from 'react-test-renderer';

import Label from '..';

describe('Label', () => {
  const handlePress = jest.fn();
  const text = 'Test';

  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(<Label handlePress={handlePress} text={text} />);

      expect(component).toMatchSnapshot();
    });
  });
});
