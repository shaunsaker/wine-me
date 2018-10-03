import React from 'react';
import renderer from 'react-test-renderer';

import SearchAreaLabelList from '..';
import SEARCH_AREAS from '../../../mockData/SEARCH_AREAS';
import utils from '../../../utils';

describe('SearchAreaLabelList', () => {
  const searchAreasArray = utils.objects.convertObjectToArray(SEARCH_AREAS);

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<SearchAreaLabelList data={searchAreasArray} />);

      expect(component).toMatchSnapshot();
    });

    // NOTE: We don't test render methods (those are handle in the test(s) above)
  });
});
