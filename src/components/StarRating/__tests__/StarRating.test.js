import React from 'react';
import renderer from 'react-test-renderer';

import StarRating from '..';

describe('StarRating', () => {
  const spies = [];
  const handlePress = jest.fn();
  const rating = 3;
  const selectedIndex = 2;

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<StarRating />);

      expect(component).toMatchSnapshot();
    });

    it('renders with all props', () => {
      const component = renderer.create(<StarRating rating={rating} handlePress={handlePress} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle onPress', () => {
      const component = renderer.create(<StarRating rating={rating} handlePress={handlePress} />);
      const instance = component.getInstance();

      instance.onPress(selectedIndex);

      expect(handlePress).toHaveBeenCalledWith(selectedIndex + 1);
    });
  });

  describe('actions', () => {
    it('should call onPress on button press', () => {
      spies[0] = jest.spyOn(StarRating.prototype, 'onPress');
      const component = renderer.create(<StarRating rating={rating} handlePress={handlePress} />);
      const { root } = component;
      const targetComponent = root.findByProps({ testID: `starRating.button.${selectedIndex}` });

      targetComponent.props.onPress();

      expect(spies[0]).toHaveBeenCalledWith(selectedIndex);
    });
  });
});
