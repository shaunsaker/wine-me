import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';

import Lightbox from '..';

// Fixes _bezier is not a function bug
jest.useFakeTimers();

describe('Lightbox', () => {
  const spies = [];
  const title = 'Test';
  const handleClose = jest.fn();
  const children = <View />;

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<Lightbox />);

      expect(component).toMatchSnapshot();
    });

    it('renders with all props', () => {
      const component = renderer.create(
        <Lightbox title={title} handleClose={handleClose}>
          {children}
        </Lightbox>,
      );

      expect(component).toMatchSnapshot();
    });

    it('renders disableClose state', () => {
      const component = renderer.create(
        <Lightbox title={title} handleClose={handleClose} disableClose>
          {children}
        </Lightbox>,
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle animateOut', () => {
      const component = renderer.create(
        <Lightbox title={title} handleClose={handleClose}>
          {children}
        </Lightbox>,
      );
      const instance = component.getInstance();

      instance.animateOut();

      expect(instance.state.shouldAnimateOut).toBe(true);
    });

    describe('should handle onBack', () => {
      it('when handleClose is provided', () => {
        const component = renderer.create(
          <Lightbox title={title} handleClose={handleClose}>
            {children}
          </Lightbox>,
        );
        const instance = component.getInstance();

        instance.onBack();

        expect(handleClose).toHaveBeenCalled();
      });

      it('when handleClose is not provided', () => {
        const component = renderer.create(<Lightbox title={title}>{children}</Lightbox>);
        const instance = component.getInstance();

        instance.onBack();

        expect(handleClose).not.toHaveBeenCalled();
      });

      afterEach(() => {
        handleClose.mockClear();
      });
    });
  });

  describe('actions', () => {
    spies[0] = jest.spyOn(Lightbox.prototype, 'animateOut');
    const component = renderer.create(<Lightbox title={title}>{children}</Lightbox>);
    const { root } = component;
    const closeButton = root.findByProps({ testID: 'lightbox.button.close' });

    closeButton.props.onPress();

    expect(spies[0]).toHaveBeenCalled();
  });

  afterEach(() => {
    spies.forEach((spy) => {
      if (spy) {
        spy.mockClear();
      }
    });
  });
});
