import React from 'react';
import renderer from 'react-test-renderer';

import PlaceCardCheckedInIcon from '..';

describe('PlaceCardCheckedInIcon', () => {
  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(<PlaceCardCheckedInIcon />);

      expect(component).toMatchSnapshot();
    });
  });
});
