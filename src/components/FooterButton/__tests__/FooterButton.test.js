import React from 'react';
import renderer from 'react-test-renderer';

import FooterButton from '..';

describe('FooterButton', () => {
  const handlePress = jest.fn();
  const iconName = 'check';
  const text = 'Test';

  describe('renders', () => {
    it('renders', () => {
      const component = renderer.create(
        <FooterButton handlePress={handlePress} iconName={iconName} text={text} />,
      );

      expect(component).toMatchSnapshot();
    });

    it('renders the alternate style', () => {
      const component = renderer.create(
        <FooterButton handlePress={handlePress} iconName={iconName} text={text} alternateStyle />,
      );

      expect(component).toMatchSnapshot();
    });

    it('renders the loading state', () => {
      const component = renderer.create(
        <FooterButton handlePress={handlePress} iconName={iconName} text={text} showLoader />,
      );

      expect(component).toMatchSnapshot();
    });
  });
});
