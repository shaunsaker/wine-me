import utilities from "../utilities";
import initialState from "./initialState";

export default function(state = initialState, action) {
    switch (action.type) {
        /* AUTH */
        case "SIGN_IN_USER":
            new_state = utilities.cloneObject(state);
            new_state.userAuth.authenticated = true;
            new_state.userAuth.anonymous = action.anonymous;

            new_state.userAuth.uid = action.uid;
            new_state.userData.profile.userEmail = action.userEmail;
            new_state.userData.profile.userName = action.userName;
            new_state.userData.profile.userPhotoURL = action.userPhotoURL;

            return new_state;

        case "SIGN_OUT_USER":
            new_state = utilities.cloneObject(state);
            new_state.userAuth = initialState.userAuth;
            new_state.userData = initialState.userData;

            return new_state;

        /*
			SUCCESS/ERROR MESSAGES
        */
        case "SET_ERROR":
            new_state = utilities.cloneObject(state);
            new_state.appState.error = {
                ...action,
            };

            return new_state;

        case "RESET_ERROR":
            new_state = utilities.cloneObject(state);
            new_state.appState.error = initialState.appState.error;

            return new_state;

        /* APP STATE */
        case "SET_APP_START":
            new_state = utilities.cloneObject(state);
            new_state.appState.appStart = !new_state.appState.appStart;
            return new_state;

        case "TOGGLE_LOADING":
            new_state = utilities.cloneObject(state);
            new_state.appState.loading = !new_state.appState.loading;
            return new_state;

        case "SET_USER_LOCATION":
            new_state = utilities.cloneObject(state);
            new_state.appState.userLocation = action.userLocation;
            return new_state;

        case "SET_NETWORK_TYPE":
            new_state = utilities.cloneObject(state);
            new_state.appState.networkType = action.networkType;
            return new_state;

        case "TOGGLE_SIDE_MENU":
            new_state = utilities.cloneObject(state);
            new_state.appState.showSideMenu = !new_state.appState.showSideMenu;
            return new_state;

        /* APP DATA */
        case "SET_APP_VERSION":
            new_state = utilities.cloneObject(state);
            new_state.appData.appVersion = action.data;
            return new_state;

        case "SET_DATA":
            new_state = utilities.cloneObject(state);
            new_state.appData[action.node] = action.data;
            new_state.appState.loading = false;

            return new_state;

        default:
            return state;
    }
}
