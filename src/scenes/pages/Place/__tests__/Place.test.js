import React from 'react';
import renderer from 'react-test-renderer';

import { Place } from '..';
import PLACE from '../../../../mockData/PLACE';
import utils from '../../../../utils';

jest.mock('../../../../components/CheckIn', () => 'CheckIn');

describe('Place', () => {
  const spies = [];
  const dispatch = jest.fn();

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<Place place={PLACE} dispatch={dispatch} />);

      expect(component).toMatchSnapshot();
    });

    it('should render the no photos state', () => {
      const noPhotosPlace = {
        ...PLACE,
        photoReferences: [],
      };
      const component = renderer.create(<Place place={noPhotosPlace} dispatch={dispatch} />);

      expect(component).toMatchSnapshot();
    });

    it('should render the no opening hours state', () => {
      const noOpeningHoursPlace = {
        ...PLACE,
        openingHours: null,
      };
      const component = renderer.create(<Place place={noOpeningHoursPlace} dispatch={dispatch} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle onBack', () => {
      spies[0] = jest.spyOn(Place.prototype, 'navigate');
      const component = renderer.create(<Place place={PLACE} dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.onBack();

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should handle onOpenInMaps', () => {
      spies[0] = jest.spyOn(Place.prototype, 'link');
      const component = renderer.create(<Place place={PLACE} dispatch={dispatch} />);
      const instance = component.getInstance();
      const link = utils.app.createMapsLinkFromCoordinates(PLACE.location);

      instance.onOpenInMaps();

      expect(spies[0]).toHaveBeenCalledWith(link);
    });

    it('should handle onCall', () => {
      spies[0] = jest.spyOn(Place.prototype, 'link');
      const component = renderer.create(<Place place={PLACE} dispatch={dispatch} />);
      const instance = component.getInstance();
      const link = `tel:${PLACE.phoneNumber}`;

      instance.onCall();

      expect(spies[0]).toHaveBeenCalledWith(link);
    });

    it('should handle onOpenWebsite', () => {
      spies[0] = jest.spyOn(Place.prototype, 'link');
      const component = renderer.create(<Place place={PLACE} dispatch={dispatch} />);
      const instance = component.getInstance();
      const link = PLACE.website;

      instance.onOpenWebsite();

      expect(spies[0]).toHaveBeenCalledWith(link);
    });

    it('should handle link', () => {
      const component = renderer.create(<Place place={PLACE} dispatch={dispatch} />);
      const instance = component.getInstance();
      const link = PLACE.website;

      instance.link(link);
    });

    it('should handle setSystemMessage', () => {
      const component = renderer.create(<Place place={PLACE} dispatch={dispatch} />);
      const instance = component.getInstance();
      const message = 'Test';

      instance.setSystemMessage(message);

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });

    it('should handle navigate', () => {
      const component = renderer.create(<Place place={PLACE} dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.navigate();
    });
  });

  describe('actions', () => {
    it('should call onBack on back button press', () => {
      spies[0] = jest.spyOn(Place.prototype, 'onBack');
      const component = renderer.create(<Place place={PLACE} dispatch={dispatch} />);
      const { root } = component;
      const targetComponent = root.findByProps({ testID: 'place.button.back' });

      targetComponent.props.handlePress();

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should call onOpenInMaps on maps button press', () => {
      spies[0] = jest.spyOn(Place.prototype, 'onOpenInMaps');
      const component = renderer.create(<Place place={PLACE} dispatch={dispatch} />);
      const { root } = component;
      const targetComponent = root.findByProps({ testID: 'place.button.maps' });

      targetComponent.props.onPress();

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should call onCall on call button press', () => {
      spies[0] = jest.spyOn(Place.prototype, 'onCall');
      const component = renderer.create(<Place place={PLACE} dispatch={dispatch} />);
      const { root } = component;
      const targetComponent = root.findByProps({ testID: 'place.button.call' });

      targetComponent.props.onPress();

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should call onOpenWebsite on website button press', () => {
      spies[0] = jest.spyOn(Place.prototype, 'onOpenWebsite');
      const component = renderer.create(<Place place={PLACE} dispatch={dispatch} />);
      const { root } = component;
      const targetComponent = root.findByProps({ testID: 'place.button.website' });

      targetComponent.props.onPress();

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
