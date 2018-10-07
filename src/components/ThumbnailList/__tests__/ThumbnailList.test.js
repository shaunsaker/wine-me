import React from 'react';
import renderer from 'react-test-renderer';

import ThumbnailList from '..';
import PLACE from '../../../mockData/PLACE';
import utils from '../../../utils';

describe('ThumbnailList', () => {
  const photos = PLACE.photoReferences.map((photoReference) => {
    return {
      uri: utils.app.getGooglePlacesPhotoURI(photoReference),
    };
  });

  describe('renders', () => {
    it('renders with minimum required props', () => {
      const component = renderer.create(<ThumbnailList data={photos} />);

      expect(component).toMatchSnapshot();
    });
  });
});
