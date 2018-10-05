import React from 'react';
import renderer from 'react-test-renderer';

import { InfoModal } from '..';

jest.mock('../../../../components/CodePushStatus', () => 'CodePushStatus');

// Fixes _bezier is not a function bug
jest.useFakeTimers();

describe('InfoModal', () => {
  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<InfoModal />);

      expect(component).toMatchSnapshot();
    });
  });
});
