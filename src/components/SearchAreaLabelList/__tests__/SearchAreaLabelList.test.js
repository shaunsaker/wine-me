import React from 'react';
import renderer from 'react-test-renderer';

import SearchAreaLabelList from '..';
import SEARCH_AREAS from '../../../mockData/SEARCH_AREAS';

describe('SearchAreaLabelList', () => {
  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<SearchAreaLabelList data={SEARCH_AREAS} />);

      expect(component).toMatchSnapshot();
    });

    // NOTE: We don't test render methods (those are handle in the test(s) above)
  });
});
