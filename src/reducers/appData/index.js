import initialState from './initialState';
import utils from '../../utils';

export default function appDataReducer(state = initialState, action = {}) {
  let newState;

  switch (action.type) {
    case 'SET_PLACES':
      newState = utils.objects.cloneObject(state);

      // Iterate over the collection, setting each document
      // as an object on newState indexed by documentID
      action.payload.data.forEach((document) => {
        const key = document.id;

        newState.places[key] = document;
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
      action.payload.data.forEach((document) => {
        const key = document.id;

        newState.searchAreas[key] = document;
      });

      return newState;

    case 'SET_USER_CHECK_INS':
      newState = utils.objects.cloneObject(state);

      // Iterate over the collection, setting each document
      // as an object on newState indexed by documentID
      action.payload.data.forEach((document) => {
        const key = document.id;

        newState.userCheckIns[key] = document;
      });

      return newState;

    case 'SET_CATEGORIES':
      newState = utils.objects.cloneObject(state);

      // Iterate over the collection, setting each document
      // as an object on newState indexed by documentID
      action.payload.data.forEach((document) => {
        const key = document.id;

        newState.categories[key] = document;
      });

      return newState;

    default:
      return state;
  }
}
