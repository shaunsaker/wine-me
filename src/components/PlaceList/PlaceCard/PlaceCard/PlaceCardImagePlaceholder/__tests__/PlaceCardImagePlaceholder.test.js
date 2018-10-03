import React from 'react';
import renderer from 'react-test-renderer';

import PlaceCardImagePlaceholder from '..';

describe('PlaceCardImagePlaceholder', () => {
  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(<PlaceCardImagePlaceholder />);

      expect(component).toMatchSnapshot();
    });
  });
});
