import React from 'react';
import renderer from 'react-test-renderer';

import LargeButton from '..';

describe('LargeButton', () => {
  const text = 'Test';

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<LargeButton />);

      expect(component).toMatchSnapshot();
    });

    it('renders the primary state', () => {
      const component = renderer.create(<LargeButton text={text} primary />);

      expect(component).toMatchSnapshot();
    });

    it('renders the secondary state', () => {
      const component = renderer.create(<LargeButton text={text} secondary />);

      expect(component).toMatchSnapshot();
    });

    it('renders the warning state', () => {
      const component = renderer.create(<LargeButton text={text} warning />);

      expect(component).toMatchSnapshot();
    });

    it('renders the disabled state', () => {
      const component = renderer.create(<LargeButton text={text} disabled />);

      expect(component).toMatchSnapshot();
    });

    it('renders the blueText state', () => {
      const component = renderer.create(<LargeButton text={text} blueText />);

      expect(component).toMatchSnapshot();
    });

    it('renders the loading state', () => {
      const component = renderer.create(<LargeButton text={text} showLoader />);

      expect(component).toMatchSnapshot();
    });

    it('renders a custom icon', () => {
      const component = renderer.create(<LargeButton text={text} rightIconName="check" />);

      expect(component).toMatchSnapshot();
    });
  });
});
