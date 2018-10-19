import React from 'react';
import renderer from 'react-test-renderer';

import { CheckIn } from '..';
import CHECK_INS from '../../../mockData/CHECK_INS';
import PLACE from '../../../mockData/PLACE';
import USER from '../../../mockData/USER';

describe('CheckIn', () => {
  const spies = [];
  const dispatch = jest.fn();
  const { uid } = USER;

  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(
        <CheckIn place={PLACE} userCheckIns={CHECK_INS} uid={uid} dispatch={dispatch} />,
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle isCheckedIn', () => {
      const component = renderer.create(
        <CheckIn place={PLACE} userCheckIns={CHECK_INS} uid={uid} dispatch={dispatch} />,
      );
      const instance = component.getInstance();

      expect(instance.isCheckedIn(CHECK_INS, PLACE)).toEqual(true);
      expect(instance.isCheckedIn({}, PLACE)).toEqual(null);
    });

    it('should handle onCheckIn', () => {
      spies[0] = jest.spyOn(CheckIn.prototype, 'setIsLoading');
      spies[1] = jest.spyOn(CheckIn.prototype, 'addCheckIn');
      const component = renderer.create(
        <CheckIn place={PLACE} userCheckIns={CHECK_INS} uid={uid} dispatch={dispatch} />,
      );
      const instance = component.getInstance();

      instance.onCheckIn();

      expect(spies[0]).toHaveBeenCalledWith(true);
      expect(spies[1]).toHaveBeenCalled();
    });

    it('should handle setIsLoading', () => {
      const component = renderer.create(
        <CheckIn place={PLACE} userCheckIns={CHECK_INS} uid={uid} dispatch={dispatch} />,
      );
      const instance = component.getInstance();

      instance.setIsLoading(true);

      expect(instance.state.isLoading).toEqual(true);
    });

    it('should handle addCheckIn', () => {
      const component = renderer.create(
        <CheckIn place={PLACE} userCheckIns={CHECK_INS} uid={uid} dispatch={dispatch} />,
      );
      const instance = component.getInstance();

      instance.addCheckIn();

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });

    it('should handle onCheckInSuccess', () => {
      spies[0] = jest.spyOn(CheckIn.prototype, 'setIsLoading');
      spies[1] = jest.spyOn(CheckIn.prototype, 'navigate');
      const component = renderer.create(
        <CheckIn place={PLACE} userCheckIns={CHECK_INS} uid={uid} dispatch={dispatch} />,
      );
      const instance = component.getInstance();

      instance.onCheckInSuccess();

      expect(spies[0]).toHaveBeenCalled();
      expect(spies[1]).toHaveBeenCalledWith('placeQuestionsModal', { place: PLACE });
    });
  });

  describe('lifecycle methods', () => {
    it('should call setIsLoading on new check in', () => {
      spies[0] = jest.spyOn(CheckIn.prototype, 'onCheckInSuccess');
      const component = renderer.create(
        <CheckIn place={PLACE} userCheckIns={{}} uid={uid} dispatch={dispatch} />,
      );

      component.update(
        <CheckIn place={PLACE} userCheckIns={CHECK_INS} uid={uid} dispatch={dispatch} />,
      );

      expect(spies[0]).toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call onCheckIn on CheckInButton press', () => {
      spies[0] = jest.spyOn(CheckIn.prototype, 'onCheckIn');
      const component = renderer.create(
        <CheckIn place={PLACE} userCheckIns={CHECK_INS} uid={uid} dispatch={dispatch} />,
      );
      const { root } = component;
      const button = root.findByProps({ testID: 'footerButton' });

      button.props.onPress();

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
