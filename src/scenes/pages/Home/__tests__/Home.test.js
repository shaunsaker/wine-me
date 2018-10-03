import React from 'react';
import renderer from 'react-test-renderer';

import { Home } from '..';
import FEATURED_PLACES from '../../../../mockData/FEATURED_PLACES';
import PLACES from '../../../../mockData/PLACES';
import DEVICE_LOCATION from '../../../../mockData/DEVICE_LOCATION';

jest.mock('../../../../components/PlaceList', () => 'PlaceList');
jest.mock('../../../../components/TabBar', () => 'TabBar');

describe('Home', () => {
  const spies = [];
  const dispatch = jest.fn();

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(
        <Home featuredPlaces={FEATURED_PLACES} places={PLACES} deviceLocation={DEVICE_LOCATION} />,
      );

      expect(component).toMatchSnapshot();
    });

    it('renders the loading state', () => {
      const component = renderer.create(
        <Home featuredPlaces={{}} places={{}} deviceLocation={DEVICE_LOCATION} />,
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle onSearchButtonPress', () => {
      spies[0] = jest.spyOn(Home.prototype, 'navigate');
      const component = renderer.create(
        <Home featuredPlaces={FEATURED_PLACES} places={PLACES} deviceLocation={DEVICE_LOCATION} />,
      );
      const instance = component.getInstance();

      instance.onSearchButtonPress();

      expect(spies[0]).toHaveBeenCalledWith('search');
    });

    it('should handle navigate', () => {
      const component = renderer.create(
        <Home featuredPlaces={FEATURED_PLACES} places={PLACES} deviceLocation={DEVICE_LOCATION} />,
      );
      const instance = component.getInstance();

      instance.navigate();
    });
  });

  describe('actions', () => {
    it('should call onSearchButtonPress on searchInput button press', () => {
      spies[0] = jest.spyOn(Home.prototype, 'onSearchButtonPress');
      const component = renderer.create(
        <Home featuredPlaces={FEATURED_PLACES} places={PLACES} deviceLocation={DEVICE_LOCATION} />,
      );
      const { root } = component;
      const targetComponent = root.findByProps({ testID: 'home.button.searchInput' });

      targetComponent.props.handlePress();

      expect(spies[0]).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    spies.forEach((spy) => {
      if (spy) {
        spy.mockClear();
      }
    });
    dispatch.mockClear();
  });
});
