import React from 'react';
import renderer from 'react-test-renderer';

import { TabBarContainer } from '..';
import TABS from '../TABS';

describe('TabBarContainer', () => {
  const spies = [];
  const dispatch = jest.fn();
  const tab = TABS[0];

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<TabBarContainer />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should handle isCurrentScene', () => {
      const component = renderer.create(<TabBarContainer scene={tab.sceneKey} />);
      const instance = component.getInstance();

      expect(instance.isCurrentScene(tab.sceneKey)).toEqual(true);
      expect(instance.isCurrentScene({ sceneKey: '_profile' })).toEqual(false);
    });

    it('should handle onTabPress', () => {
      spies[0] = jest.spyOn(TabBarContainer.prototype, 'navigate');
      const component = renderer.create(<TabBarContainer scene={tab.sceneKey} />);
      const instance = component.getInstance();

      instance.onTabPress(tab);

      expect(spies[0]).toHaveBeenCalledWith(tab.sceneKey);
    });

    it('should handle navigate', () => {
      const component = renderer.create(<TabBarContainer scene={tab.sceneKey} />);
      const instance = component.getInstance();

      instance.navigate();
    });
  });

  describe('actions', () => {
    // NOTE: We can trust RN to handle press actions in this case
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
