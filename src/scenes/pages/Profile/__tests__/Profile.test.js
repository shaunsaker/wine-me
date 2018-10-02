import React from 'react';
import renderer from 'react-test-renderer';

import { Profile } from '..';
import CHECK_INS from '../../../../mockData/CHECK_INS';
import PLACES from '../../../../mockData/PLACES';

jest.mock('../../../../components/PlaceList', () => 'PlaceList');
jest.mock('../../../../components/TabBar', () => 'TabBar');

describe('Profile', () => {
  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<Profile userCheckIns={CHECK_INS} places={PLACES} />);

      expect(component).toMatchSnapshot();
    });

    it('renders the blank state', () => {
      const component = renderer.create(<Profile userCheckIns={{}} places={PLACES} />);

      expect(component).toMatchSnapshot();
    });
  });
});
