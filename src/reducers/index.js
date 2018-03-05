import utilities from '../utilities';
import initialState from './initialState';

export default function (state = initialState, action) {
    switch (action.type) {
        /* AUTH */
        case 'SIGN_IN_USER':
            new_state = utilities.cloneObject(state);
            new_state.userAuth.authenticated = true;
            new_state.userAuth.anonymous = action.anonymous;

            new_state.userAuth.uid = action.uid;
            new_state.userData.profile.userEmail = action.userEmail;
            new_state.userData.profile.userName = action.userName;
            new_state.userData.profile.userPhotoURL = action.userPhotoURL;

            return new_state;

        case 'SIGN_OUT_USER':
            new_state = utilities.cloneObject(state);
            new_state.userAuth = initialState.userAuth;
            new_state.userData = initialState.userData;

            return new_state;

        /*
			SUCCESS/ERROR MESSAGES
        */
        case 'SET_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.appState.error = {
                ...action,
            };

            return new_state;

        case 'RESET_ERROR':
            new_state = utilities.cloneObject(state);
            new_state.appState.error = initialState.appState.error;

            return new_state;

        /* APP STATE */
        case 'SET_APP_START':
            new_state = utilities.cloneObject(state);
            new_state.appState.appStart = !new_state.appState.appStart;
            return new_state;

        case 'TOGGLE_LOADING':
            new_state = utilities.cloneObject(state);
            new_state.appState.loading = !new_state.appState.loading;
            return new_state;

        case 'SET_USER_LOCATION':
            new_state = utilities.cloneObject(state);
            new_state.appState.userLocation = action.userLocation;
            return new_state;

        case 'SET_NETWORK_TYPE':
            new_state = utilities.cloneObject(state);
            new_state.appState.networkType = action.networkType;
            return new_state;

        case 'TOGGLE_SIDE_MENU':
            new_state = utilities.cloneObject(state);
            new_state.appState.showSideMenu = !new_state.appState.showSideMenu;
            return new_state;

        /* APP DATA */
        case 'SET_APP_VERSION':
            new_state = utilities.cloneObject(state);
            new_state.appData.appVersion = action.data;
            return new_state;

        case 'SET_DATA':
            new_state = utilities.cloneObject(state);
            new_state.appData[action.node] = action.data;
            new_state.appState.loading = false;
            new_state.appState.refreshing = false;

            if (action.node === 'app' && new_state.appState.userLocation) {
                // If we have the user's location, get relative distance and append
                let places = new_state.appData.app.places;

                for (let placeID in places) {
                    const relativeDistance = Math.round(
                        utilities.getDistanceBetweenCoordinateSets(
                            new_state.appState.userLocation,
                            places[placeID].location,
                        ),
                    );

                    places[placeID]['relativeDistance'] = relativeDistance;
                }

                new_state.appData.app.places = places;
            }

            return new_state;

        // In case user location was retrieved after receiving app data
        case 'SET_PLACES_RELATIVE_DISTANCES':
            new_state = utilities.cloneObject(state);

            // Get relative distance and append
            let places = new_state.appData.app.places;

            for (let placeID in places) {
                const relativeDistance = Math.round(
                    utilities.getDistanceBetweenCoordinateSets(
                        new_state.appState.userLocation,
                        places[placeID].location,
                    ),
                );

                places[placeID]['relativeDistance'] = relativeDistance;
            }

            new_state.appData.app.places = places;

            return new_state;

        default:
            return state;
    }
}
