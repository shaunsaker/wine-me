import React from 'react';
import renderer from 'react-test-renderer';

import { LocationHandler } from '..';

describe('LocationHandler', () => {
  const spies = [];
  const dispatch = jest.fn();
  const backgroundState = 'inactive';
  const foregroundState = 'active';

  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(<LocationHandler dispatch={dispatch} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle handleAppStateChange', () => {
      spies[0] = jest.spyOn(LocationHandler.prototype, 'getLocation');
      const component = renderer.create(<LocationHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.handleAppStateChange(backgroundState);
      instance.handleAppStateChange(foregroundState);

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should handle setAppState', () => {
      const component = renderer.create(<LocationHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.setAppState(backgroundState);

      expect(instance.state.appState).toEqual(backgroundState);
    });

    it('should handle getLocation', () => {
      const component = renderer.create(<LocationHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.getLocation();

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });
  });

  describe('lifecycle methods', () => {
    it('should call getLocation on componentDidMount', () => {
      spies[0] = jest.spyOn(LocationHandler.prototype, 'getLocation');

      renderer.create(<LocationHandler dispatch={dispatch} />);

      expect(spies[0]).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    spies.forEach((spy) => {
      if (spy) {
        spy.mockClear();
      }
    });

    jest.clearAllMocks();
  });
});
