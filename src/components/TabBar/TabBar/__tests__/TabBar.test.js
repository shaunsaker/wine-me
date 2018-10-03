import React from 'react';
import renderer from 'react-test-renderer';

import TabBar from '..';
import TABS from '../../TABS';

describe('TabBar', () => {
  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(<TabBar tabs={TABS} />);

      expect(component).toMatchSnapshot();
    });

    it('renders the active state', () => {
      const component = renderer.create(<TabBar tabs={TABS} activeTab={TABS[0]} />);

      expect(component).toMatchSnapshot();
    });
  });
});
