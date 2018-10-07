import React from 'react';
import renderer from 'react-test-renderer';

import Touchable from '..';

describe('Touchable', () => {
  describe('renders', () => {
    it('renders with the minimum required props', () => {
      const component = renderer.create(<Touchable />);

      expect(component).toMatchSnapshot();
    });

    it('renders with the minimum required props', () => {
      const component = renderer.create(<Touchable disabled />);

      expect(component).toMatchSnapshot();
    });

    it('renders with the noFeedback state', () => {
      const component = renderer.create(<Touchable noFeedback />);

      expect(component).toMatchSnapshot();
    });
  });
});
