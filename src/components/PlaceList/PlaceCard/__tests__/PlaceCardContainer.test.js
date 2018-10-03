import React from 'react';
import renderer from 'react-test-renderer';

import { PlaceCardContainer } from '..';
import PLACE from '../../../../mockData/PLACE';
import DEVICE_LOCATION from '../../../../mockData/DEVICE_LOCATION';

describe('PlaceCard', () => {
  const spies = [];

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(
        <PlaceCardContainer place={PLACE} deviceLocation={DEVICE_LOCATION} />,
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle onPress', () => {
      spies[0] = jest.spyOn(PlaceCardContainer.prototype, 'navigate');
      const component = renderer.create(
        <PlaceCardContainer place={PLACE} deviceLocation={DEVICE_LOCATION} />,
      );
      const instance = component.getInstance();

      instance.onPress();

      expect(spies[0]).toHaveBeenCalledWith('place', { place: PLACE });
    });

    it('should handle navigate', () => {
      const component = renderer.create(
        <PlaceCardContainer place={PLACE} deviceLocation={DEVICE_LOCATION} />,
      );
      const instance = component.getInstance();

      instance.navigate();
    });
  });

  describe('actions', () => {
    it('should call onPress on press', () => {
      spies[0] = jest.spyOn(PlaceCardContainer.prototype, 'onPress');
      const component = renderer.create(
        <PlaceCardContainer place={PLACE} deviceLocation={DEVICE_LOCATION} />,
      );
      const { root } = component;
      const targetComponent = root.findByProps({ testID: 'placeCardContainer' });

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
  });
});
