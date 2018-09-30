import initialState from './initialState';
import utils from '../../utils';

export default function appDataReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'SET_PLACES':
      newState = utils.objects.cloneObject(state);

      // Iterate over the collection, setting each document
      // as an object on newState indexed by documentID
      action.payload.data.forEach((place) => {
        const key = place.id;

        newState.places[key] = place;
      });

      return newState;

    case 'SET_FEATURED_PLACES':
      newState = utils.objects.cloneObject(state);

      // Iterate over the collection, setting each document
      // as an object on newState indexed by documentID
      action.payload.data.forEach((document) => {
        const key = document.id;

        newState.featuredPlaces[key] = document;
      });

      return newState;

    case 'SET_SEARCH_AREAS':
      newState = utils.objects.cloneObject(state);

      // Iterate over the collection, setting each document
      // as an object on newState indexed by documentID
      action.payload.data.forEach((searchArea) => {
        const key = searchArea.id;

        newState.searchAreas[key] = searchArea;
      });

      return newState;

    default:
      return state;
  }
}
