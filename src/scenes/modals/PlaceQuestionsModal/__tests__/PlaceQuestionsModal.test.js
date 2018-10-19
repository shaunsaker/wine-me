import React from 'react';
import renderer from 'react-test-renderer';

import { PlaceQuestionsModal } from '..';
import PLACE from '../../../../mockData/PLACE';
import CATEGORIES from '../../../../mockData/CATEGORIES';

jest.mock('../../../../components/PlaceQuestionsList', () => 'PlaceQuestionsList');

// Fixes _bezier is not a function bug
jest.useFakeTimers();

describe('PlaceQuestionsModal', () => {
  const spies = [];
  const dispatch = jest.fn();
  const categoryID = 'wine';
  const rules = CATEGORIES[categoryID].validation;
  const validValue = rules.max - 1;
  const nextSlideIndex = 1;
  const systemMessage = 'Thanks for the feedback.';

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(
        <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    describe('should handle onSetValue', () => {
      it('with a valid value', () => {
        spies[0] = jest.spyOn(PlaceQuestionsModal.prototype, 'setValue');
        const component = renderer.create(
          <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
        );
        const instance = component.getInstance();

        instance.onSetValue(categoryID, validValue);

        expect(spies[0]).toHaveBeenCalledWith(categoryID, validValue);
      });

      it('with an invalid value', () => {
        spies[0] = jest.spyOn(PlaceQuestionsModal.prototype, 'setValue');
        const component = renderer.create(
          <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
        );
        const instance = component.getInstance();

        instance.onSetValue(categoryID, rules.max + 1);

        expect(spies[0]).not.toHaveBeenCalled();
      });
    });

    describe('should handle validateValue', () => {
      it('when value is NaN', () => {
        const component = renderer.create(
          <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
        );
        const instance = component.getInstance();
        const isValid = instance.validateValue(NaN, rules);

        expect(isValid).toEqual(false);
      });

      it('when the value is not of number type', () => {
        const component = renderer.create(
          <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
        );
        const instance = component.getInstance();
        const isValid = instance.validateValue('string', rules);

        expect(isValid).toEqual(false);
      });

      it('when the value lower than min', () => {
        const component = renderer.create(
          <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
        );
        const instance = component.getInstance();
        const isValid = instance.validateValue(rules.min - 1, rules);

        expect(isValid).toEqual(false);
      });

      it('when the value is higher than max', () => {
        const component = renderer.create(
          <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
        );
        const instance = component.getInstance();
        const isValid = instance.validateValue(rules.max + 1, rules);

        expect(isValid).toEqual(false);
      });
    });

    it('should handle setValue', () => {
      const component = renderer.create(
        <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
      );
      const instance = component.getInstance();
      const categoryName = CATEGORIES[categoryID].name;

      instance.setValue(categoryID, validValue);

      expect(instance.state[categoryName]).toEqual(validValue);
    });

    describe('should handle onSubmit', () => {
      it('when it is the last slide', () => {
        spies[0] = jest.spyOn(PlaceQuestionsModal.prototype, 'dismissKeyboard');
        spies[1] = jest.spyOn(PlaceQuestionsModal.prototype, 'saveUserFeedback');
        spies[2] = jest.spyOn(PlaceQuestionsModal.prototype, 'setSystemMessage');
        spies[3] = jest.spyOn(PlaceQuestionsModal.prototype, 'navigate');
        spies[4] = jest.spyOn(PlaceQuestionsModal.prototype, 'setSlideIndex');
        const component = renderer.create(
          <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
        );
        const instance = component.getInstance();

        // SETUP
        const numberOfCategories = Object.keys(CATEGORIES).length;
        const lastSlide = numberOfCategories - 1;
        instance.setSlideIndex(lastSlide);
        spies[4].mockClear();

        instance.onSubmit();

        expect(spies[0]).toHaveBeenCalled();
        expect(spies[1]).toHaveBeenCalled();
        expect(spies[2]).toHaveBeenCalledWith(systemMessage);
        expect(spies[3]).toHaveBeenCalled();
        expect(spies[4]).not.toHaveBeenCalled();
      });

      it('when it is not the last slide', () => {
        spies[0] = jest.spyOn(PlaceQuestionsModal.prototype, 'dismissKeyboard');
        spies[1] = jest.spyOn(PlaceQuestionsModal.prototype, 'saveUserFeedback');
        spies[2] = jest.spyOn(PlaceQuestionsModal.prototype, 'setSystemMessage');
        spies[3] = jest.spyOn(PlaceQuestionsModal.prototype, 'navigate');
        spies[4] = jest.spyOn(PlaceQuestionsModal.prototype, 'setSlideIndex');
        const component = renderer.create(
          <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
        );
        const instance = component.getInstance();

        instance.onSubmit();

        expect(spies[0]).toHaveBeenCalled();
        expect(spies[1]).toHaveBeenCalled();
        expect(spies[2]).not.toHaveBeenCalled();
        expect(spies[3]).not.toHaveBeenCalled();
        expect(spies[4]).toHaveBeenCalledWith(nextSlideIndex);
      });
    });

    it('should handle onSkip', () => {
      spies[0] = jest.spyOn(PlaceQuestionsModal.prototype, 'setSlideIndex');
      const component = renderer.create(
        <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
      );
      const instance = component.getInstance();

      instance.onSkip();

      expect(spies[0]).toHaveBeenCalledWith(nextSlideIndex);
    });

    it('should handle saveUserFeedback', () => {
      const component = renderer.create(
        <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
      );
      const instance = component.getInstance();

      // SETUP
      instance.setValue(categoryID, validValue);

      instance.saveUserFeedback();

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });

    it('should handle dismissKeyboard', () => {
      const component = renderer.create(
        <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
      );
      const instance = component.getInstance();

      instance.dismissKeyboard();
    });

    it('should handle setSlideIndex', () => {
      const component = renderer.create(
        <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
      );
      const instance = component.getInstance();

      instance.setSlideIndex(nextSlideIndex);

      expect(instance.state.slideIndex).toEqual(nextSlideIndex);
    });

    it('should handle setSystemMessage', () => {
      const component = renderer.create(
        <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
      );
      const instance = component.getInstance();

      instance.setSystemMessage(systemMessage);

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });

    it('should handle navigate', () => {
      const component = renderer.create(
        <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
      );
      const instance = component.getInstance();

      instance.navigate();
    });
  });

  describe('actions', () => {
    it('should call onSkip on Link button press', () => {
      spies[0] = jest.spyOn(PlaceQuestionsModal.prototype, 'onSkip');
      const component = renderer.create(
        <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
      );
      const { root } = component;
      const targetComponent = root.findByProps({ testID: 'placeQuestionsModal.button.skip' });

      targetComponent.props.handlePress();

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should call onSubmit on Submit button press', () => {
      spies[0] = jest.spyOn(PlaceQuestionsModal.prototype, 'onSubmit');
      const component = renderer.create(
        <PlaceQuestionsModal place={PLACE} categories={CATEGORIES} dispatch={dispatch} />,
      );
      const { root } = component;
      const targetComponent = root.findByProps({ testID: 'placeQuestionsModal.button.submit' });

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
