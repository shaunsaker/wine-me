import React from 'react';
import renderer from 'react-test-renderer';

import BlankState from '..';

describe('BlankState', () => {
  const iconName = 'check';
  const title = 'Test';
  const description = 'Some more';

  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(
        <BlankState iconName={iconName} title={title} description={description} />,
      );

      expect(component).toMatchSnapshot();
    });
  });
});
