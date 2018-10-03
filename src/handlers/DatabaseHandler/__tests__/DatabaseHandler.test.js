import React from 'react';
import renderer from 'react-test-renderer';

import { DatabaseHandler } from '..';

describe('DatabaseHandler', () => {
  const spies = [];
  const dispatch = jest.fn();

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<DatabaseHandler dispatch={dispatch} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle handleSyncData', () => {
      spies[0] = jest.spyOn(DatabaseHandler.prototype, 'syncPlaces');
      spies[1] = jest.spyOn(DatabaseHandler.prototype, 'syncFeaturedPlaces');
      spies[2] = jest.spyOn(DatabaseHandler.prototype, 'syncSearchAreas');
      spies[3] = jest.spyOn(DatabaseHandler.prototype, 'syncCheckIns');
      const component = renderer.create(<DatabaseHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.handleSyncData();

      expect(spies[0]).toHaveBeenCalled();
      expect(spies[1]).toHaveBeenCalled();
      expect(spies[2]).toHaveBeenCalled();
      expect(spies[3]).toHaveBeenCalled();
    });

    it('should handle syncPlaces', () => {
      const component = renderer.create(<DatabaseHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.syncPlaces();

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });

    it('should handle syncFeaturedPlaces', () => {
      const component = renderer.create(<DatabaseHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.syncFeaturedPlaces();

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });

    it('should handle syncSearchAreas', () => {
      const component = renderer.create(<DatabaseHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.syncSearchAreas();

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });

    it('should handle syncCheckIns', () => {
      const component = renderer.create(<DatabaseHandler dispatch={dispatch} />);
      const instance = component.getInstance();

      instance.syncCheckIns();

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toMatchSnapshot();
    });
  });

  describe('lifecycle methods', () => {
    it('should call handleSyncData if authenticated in componentDidMount', () => {
      spies[0] = jest.spyOn(DatabaseHandler.prototype, 'handleSyncData');
      renderer.create(<DatabaseHandler dispatch={dispatch} authenticated />);

      expect(spies[0]).toHaveBeenCalled();
    });

    it('should call handleSyncData on new authenticated in componentDidUpdate', () => {
      spies[0] = jest.spyOn(DatabaseHandler.prototype, 'handleSyncData');
      const component = renderer.create(<DatabaseHandler dispatch={dispatch} />);

      component.update(<DatabaseHandler dispatch={dispatch} authenticated />);

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