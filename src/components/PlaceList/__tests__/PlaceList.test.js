import React from 'react';
import renderer from 'react-test-renderer';

import PlaceList from '..';
import PLACES from '../../../mockData/PLACES';

jest.mock('../PlaceCard', () => 'PlaceCard');

describe('PlaceList', () => {
  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<PlaceList data={PLACES} />);

      expect(component).toMatchSnapshot();
    });

    // NOTE: We don't test render methods (those are handle in the test(s) above)
  });
});
