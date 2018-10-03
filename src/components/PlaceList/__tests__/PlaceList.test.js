import React from 'react';
import renderer from 'react-test-renderer';

import PlaceList from '..';
import PLACES from '../../../mockData/PLACES';
import utils from '../../../utils';

jest.mock('../PlaceCard', () => 'PlaceCard');

describe('PlaceList', () => {
  const placesArray = utils.objects.convertObjectToArray(PLACES);

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<PlaceList data={placesArray} />);

      expect(component).toMatchSnapshot();
    });

    // NOTE: We don't test render methods (those are handle in the test(s) above)
  });
});
