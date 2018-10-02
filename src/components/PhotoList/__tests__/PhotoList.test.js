import React from 'react';
import renderer from 'react-test-renderer';

import PhotoList from '..';
import PLACE from '../../../mockData/PLACE';
import utils from '../../../utils';

describe('PhotoList', () => {
  const photos = PLACE.photoReferences.map((photoReference) => {
    return {
      uri: utils.app.getGooglePlacesPhotoURI(photoReference),
    };
  });

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<PhotoList data={photos} />);

      expect(component).toMatchSnapshot();
    });
  });

  // NOTE: We don't test render methods (those are handle in the test(s) above)
});
